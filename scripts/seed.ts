// Seed script â€” populates events + sample feedback so the UI has data to render.
// Run once: `bun run scripts/seed.ts` (tsx is a devDependency).
import { db, events, feedback } from "../lib/db/index";
import { eq, sql } from "drizzle-orm";

// MySQL DATETIME needs "YYYY-MM-DD HH:MM:SS" â€” convert ISO "T"/"Z" form.
const D = (v: string) => v.replace("T", " ").replace("Z", "");

// The 6 cover images shipped in asserts/event-page-asserts/
const IMG = "/event-images";

const sampleEvents = [
  {
    title: "Tech Innovation Summit 2026",
    slug: "tech-innovation-summit-2026",
    description:
      "A flagship gathering of engineers, product leaders, and founders exploring the next wave of AI-powered software â€” from LLM tooling to edge inference.",
    category: "Technology & AI",
    status: "Upcoming",
    format: "In-Person",
    venue: "Convention Center",
    city: "San Francisco, CA",
    eventDate: D("2026-10-14T09:00:00Z"),
    coverImage: `${IMG}/Technology-event.png`,
    rating: 4.9,
    reviewCount: 214,
  },
  {
    title: "DevPulse Global",
    slug: "devpulse-global",
    description:
      "A global developer conference with inspiring workshop tracks, hands-on labs, and deep dives into modern web, backend, and platform engineering.",
    category: "Web Development",
    status: "Feedback Open",
    format: "Hybrid",
    venue: "Marina Bay Expo",
    city: "Singapore",
    eventDate: D("2026-09-12T08:30:00Z"),
    coverImage: `${IMG}/web-development-event.png`,
    rating: 4.8,
    reviewCount: 412,
  },
  {
    title: "Nordic UX Week",
    slug: "nordic-ux-week",
    description:
      "Five days of hands-on critique labs, design systems deep-dives, and accessibility workshops with the people shaping the future of UX in the Nordics.",
    category: "Design & UX",
    status: "Past",
    format: "In-Person",
    venue: "Scandic Opera",
    city: "Copenhagen",
    eventDate: D("2026-05-04T09:00:00Z"),
    coverImage: `${IMG}/Creative-Design-Conference-event.png`,
    rating: 4.8,
    reviewCount: 189,
  },
  {
    title: "Startup Entrepreneurship Forum",
    slug: "startup-entrepreneurship-forum",
    description:
      "Investors, operators, and founders share the playbooks behind fast, durable startup growth â€” fundraising, GTM, and team building in one room.",
    category: "Startups & Biz",
    status: "Upcoming",
    format: "In-Person",
    venue: "WeWork Tower",
    city: "New York, NY",
    eventDate: D("2026-11-20T10:00:00Z"),
    coverImage: `${IMG}/Startup-Entrepreneurship-event.png`,
    rating: 4.7,
    reviewCount: 96,
  },
  {
    title: "AI & ML Practitioners Meetup",
    slug: "ai-ml-practitioners-meetup",
    description:
      "A community-driven meetup for ML engineers and data scientists â€” model eval, RAG patterns, and production LLM observability, demoed live.",
    category: "Technology & AI",
    status: "Feedback Open",
    format: "Online",
    venue: "Virtual Stage",
    city: "Remote",
    eventDate: D("2026-08-28T17:00:00Z"),
    coverImage: `${IMG}/AI-event.png`,
    rating: 5.0,
    reviewCount: 73,
  },
  {
    title: "Developer Community Meetup",
    slug: "developer-community-meetup",
    description:
      "Open-source maintainers and local devs hanging out: lightning talks, pairing sessions, and honest debate about where the ecosystem is heading.",
    category: "Web Development",
    status: "Past",
    format: "In-Person",
    venue: "The Hive Campus",
    city: "Austin, TX",
    eventDate: D("2026-06-16T18:00:00Z"),
    coverImage: `${IMG}/Developer-Community-Meetup.png`,
    rating: 4.6,
    reviewCount: 58,
  },
];

const sampleFeedback = [
  {
    eventId: 1,
    attendeeName: "Elena Rostova",
    attendeeRole: "Lead Designer @ ArcScale",
    overallRating: 5,
    contentQuality: 5,
    speakerPerformance: 5,
    venueLogistics: 4,
    likedMost:
      "The keynotes were outstanding â€” clear, dense, and immediately actionable. The workshop tracks let you go from theory to a running demo in an hour.",
    couldImprove:
      "Lunch queues got long around 12:30. A second catering line would help the mid-day rush.",
    wouldRecommend: true,
    notes: "",
    sentiment: "positive",
  },
  {
    eventId: 1,
    attendeeName: "Marcus Bell",
    attendeeRole: "Staff Engineer @ Northwind",
    overallRating: 4,
    contentQuality: 4,
    speakerPerformance: 5,
    venueLogistics: 3,
    likedMost: "The speaker lineup was world-class. Felt like a premium production all day.",
    couldImprove: "WiFi in the overflow hall was spotty during the afternoon sessions.",
    wouldRecommend: true,
    notes: "",
    sentiment: "positive",
  },
  {
    eventId: 2,
    attendeeName: "Priya Nair",
    attendeeRole: "Full-Stack Developer",
    overallRating: 5,
    contentQuality: 5,
    speakerPerformance: 4,
    venueLogistics: 5,
    likedMost: "Inspiring workshop tracks â€” the hands-on labs were my favorite part. Zero fluff.",
    couldImprove: "A few more break areas between packed sessions would be great.",
    wouldRecommend: true,
    notes: "",
    sentiment: "positive",
  },
  {
    eventId: 3,
    attendeeName: "Jonas Lindqvist",
    attendeeRole: "Product Designer",
    overallRating: 4,
    contentQuality: 4,
    speakerPerformance: 4,
    venueLogistics: 5,
    likedMost: "Loved the hands-on critique lab â€” got real feedback on my portfolio mid-week.",
    couldImprove: "Keynote slides could have used more beginner-friendly context.",
    wouldRecommend: true,
    notes: "",
    sentiment: "positive",
  },
  {
    eventId: 5,
    attendeeName: "Sofia Marchetti",
    attendeeRole: "ML Engineer",
    overallRating: 5,
    contentQuality: 5,
    speakerPerformance: 5,
    venueLogistics: 4,
    likedMost: "Flawless production â€” the live model-eval demos were the best part.",
    couldImprove: "Would love a follow-up async Q&A channel for the recorded sessions.",
    wouldRecommend: true,
    notes: "",
    sentiment: "positive",
  },
];

async function main() {
  console.log("Seeding eventsâ€¦");
  await db.insert(events).values(sampleEvents as unknown as (typeof events.$inferInsert)[]);

  // Fetch back the generated ids so feedback can reference them safely.
  const eventRows: { id: number }[] = [];
  for (const ev of sampleEvents) {
    const rows = await db.select({ id: events.id }).from(events).where(eq(events.slug, ev.slug));
    eventRows.push(rows[0]);
  }

  console.log("Seeding feedbackâ€¦");
  const feedbackRows = sampleFeedback.map((f, i) => ({
    ...f,
    eventId: eventRows[i % eventRows.length]?.id ?? 1,
  }));
  await db.insert(feedback).values(feedbackRows as (typeof feedback.$inferInsert)[]);

  // Keep reviewCount consistent with real feedback rows (even after reseeds).
  for (const row of eventRows) {
    await db
      .update(events)
      .set({ reviewCount: sql`(select count(*) from feedback where event_id = ${row.id})` })
      .where(eq(events.id, row.id));
  }

  console.log(`Done: ${eventRows.length} events, ${feedbackRows.length} feedback rows.`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
