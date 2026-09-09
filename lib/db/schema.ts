// Database schema for EventFlow
// - events: the events attendees browse on the Events page
// - feedback: the reviews/submissions created on the Feedback page
import { mysqlTable, index, int, varchar, text, float, boolean, datetime, timestamp, mysqlEnum } from "drizzle-orm/mysql-core";

// Events table — one row per event shown on the Events page
export const events = mysqlTable(
  "events",
  {
    id: int("id").autoincrement().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description").notNull(),
    category: mysqlEnum("category", ["Technology & AI", "Web Development", "Design & UX", "Startups & Biz"]).notNull(),
    status: mysqlEnum("status", ["Upcoming", "Past", "Feedback Open"]).notNull().default("Upcoming"),
    format: mysqlEnum("format", ["Online", "In-Person", "Hybrid"]).notNull().default("In-Person"),
    venue: varchar("venue", { length: 255 }).notNull(),
    city: varchar("city", { length: 120 }).notNull(),
    eventDate: datetime("event_date").notNull(),
    coverImage: varchar("cover_image", { length: 500 }).notNull(),
    rating: float("rating").notNull().default(0),
    reviewCount: int("review_count").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("events_category_idx").on(table.category),
    index("events_status_idx").on(table.status),
  ]
);

// Feedback table — one row per submission from the Feedback form
export const feedback = mysqlTable(
  "feedback",
  {
    id: int("id").autoincrement().primaryKey(),
    eventId: int("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    attendeeName: varchar("attendee_name", { length: 120 }).notNull(),
    attendeeRole: varchar("attendee_role", { length: 120 }),
    overallRating: int("overall_rating").notNull().default(5),
    contentQuality: int("content_quality").notNull().default(5),
    speakerPerformance: int("speaker_performance").notNull().default(5),
    venueLogistics: int("venue_logistics").notNull().default(5),
    likedMost: text("liked_most"),
    couldImprove: text("could_improve"),
    wouldRecommend: boolean("would_recommend").notNull().default(true),
    notes: text("notes"),
    sentiment: mysqlEnum("sentiment", ["positive", "neutral", "negative"]).notNull().default("positive"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("feedback_event_id_idx").on(table.eventId),
    index("feedback_created_at_idx").on(table.createdAt),
  ]
);

// Types that drizzle infers from the schema — handy for typed orpc responses
export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
export type Feedback = typeof feedback.$inferSelect;
export type NewFeedback = typeof feedback.$inferInsert;