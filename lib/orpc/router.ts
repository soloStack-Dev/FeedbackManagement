// orpc router — every server-side procedure for the app.
// Procedures (paths shown in the client call):
//   .event.list           → all events (Events page + home hero/stats)
//   .event.detail         → single event by id (future detail page, already typed)
//   .feedback.list        → recent feedback rows (home live pulse + analytics)
//   .feedback.listByEvent → feedback for one event (event card rating bars)
//   .feedback.create      → INSERT feedback + bump event rating/reviewCount (Feedback page)
import { os } from "@orpc/server";
import { z } from "zod";
import { db, events, feedback } from "../db/index";
import { avg, count, desc, eq } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Input/output schemas (zod v4). These double as http-body validation for the
// RPC handler, so the client and server always agree on the shapes.
// ---------------------------------------------------------------------------
// Enum literal helpers so the client-side types match drizzle's mysqlEnum unions
// (category/status/format/sentiment must be the same literals as the schema).
const categoryEnum = z.enum(["Technology & AI", "Web Development", "Design & UX", "Startups & Biz"]);
const statusEnum = z.enum(["Upcoming", "Past", "Feedback Open"]);
const formatEnum = z.enum(["Online", "In-Person", "Hybrid"]);
const sentimentEnum = z.enum(["positive", "neutral", "negative"]);

const eventSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  category: categoryEnum,
  status: statusEnum,
  format: formatEnum,
  venue: z.string(),
  city: z.string(),
  eventDate: z.coerce.date(),
  coverImage: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
  createdAt: z.coerce.date(),
});

const feedbackSchema = z.object({
  id: z.number(),
  eventId: z.number(),
  attendeeName: z.string(),
  attendeeRole: z.string().nullable().optional(),
  overallRating: z.number(),
  contentQuality: z.number(),
  speakerPerformance: z.number(),
  venueLogistics: z.number(),
  likedMost: z.string().nullable().optional(),
  couldImprove: z.string().nullable().optional(),
  wouldRecommend: z.boolean(),
  notes: z.string().nullable().optional(),
  sentiment: sentimentEnum,
  createdAt: z.coerce.date(),
});

// Body submitted by the Feedback form. Optional text fields tolerate empty
// strings: any blank/whitespace-only value normalizes to `undefined` here so a
// bare "" from any client never fails min(1) and blocks the whole submission.
const optText = () =>
  z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
    z.string().trim().min(1).optional()
  );

const createFeedbackInput = z.object({
  eventId: z.number(),
  attendeeName: z.string().trim().min(1, "Name is required"),
  attendeeRole: optText(),
  overallRating: z.number().int().min(1).max(5),
  contentQuality: z.number().int().min(1).max(5),
  speakerPerformance: z.number().int().min(1).max(5),
  venueLogistics: z.number().int().min(1).max(5),
  likedMost: optText(),
  couldImprove: optText(),
  wouldRecommend: z.boolean(),
  notes: optText(),
});

export const ORPCError = { NOT_FOUND: "NOT_FOUND" } as const;

// ---------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------
export const appRouter = {
  event: {
    list: os
      .output(z.array(eventSchema))
      .handler(async () => {
        // Orders newest first; reviewCount is maintained by feedback.create.
        const rows = await db.select().from(events).orderBy(desc(events.eventDate));
        return rows.map((r) => ({ ...r, eventDate: new Date(r.eventDate) })) as never;
      }),

    detail: os
      .input(z.object({ id: z.number() }))
      .output(eventSchema)
      .handler(async ({ input }) => {
        const rows = await db.select().from(events).where(eq(events.id, input.id)).limit(1);
        const row = rows[0];
        if (!row) throw new Error("NOT_FOUND: no event with that id");
        return { ...row, eventDate: new Date(row.eventDate) } as never;
      }),
  },

  feedback: {
    list: os
      .output(z.array(feedbackSchema))
      .handler(async () => {
        // Used by the home "live pulse" ticker — newest submissions first.
        const rows = await db.select().from(feedback).orderBy(desc(feedback.createdAt)).limit(20);
        return rows.map((r) => ({ ...r, createdAt: new Date(r.createdAt) })) as never;
      }),

    listByEvent: os
      .input(z.object({ eventId: z.number() }))
      .output(z.array(feedbackSchema))
      .handler(async ({ input }) => {
        const rows = await db
          .select()
          .from(feedback)
          .where(eq(feedback.eventId, input.eventId))
          .orderBy(desc(feedback.createdAt));
        return rows.map((r) => ({ ...r, createdAt: new Date(r.createdAt) })) as never;
      }),

    create: os
      .input(createFeedbackInput)
      .output(feedbackSchema)
      .handler(async ({ input }) => {
        // Cheap rule-of-thumb sentiment from the category scores.
        const avgScore = (input.contentQuality + input.speakerPerformance + input.venueLogistics) / 3;
        const sentiment = input.overallRating >= 4 || avgScore >= 4 ? "positive" : avgScore >= 3 ? "neutral" : "negative";

        const [inserted] = await db
          .insert(feedback)
          .values({ ...input, attendeeRole: input.attendeeRole ?? null, sentiment })
          .$returningId();

        // Keep the parent event's aggregates in sync so the Events page is
        // immediately correct for every subscriber (long-term persistence).
        const agg = await db
          .select({ avgRating: avg(feedback.overallRating), total: count(feedback.id) })
          .from(feedback)
          .where(eq(feedback.eventId, input.eventId));

        await db
          .update(events)
          .set({
            rating: Number(Number(agg[0]?.avgRating ?? 0).toFixed(1)),
            reviewCount: Number(agg[0]?.total ?? 0),
          })
          .where(eq(events.id, input.eventId));

        const rows = await db.select().from(feedback).where(eq(feedback.id, inserted.id)).limit(1);
        return { ...rows[0], createdAt: new Date(rows[0].createdAt) } as never;
      }),
  },
};

export type AppRouter = typeof appRouter;