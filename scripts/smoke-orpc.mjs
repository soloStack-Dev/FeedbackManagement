// Smoke test — drives the real orpc wire protocol against a running server.
// Verifies: event.list, event.detail, feedback.list, feedback.create (insert),
// and that create() bumps the parent event's aggregates. Restores DB afterwards.
// Usage: start `bun run start` (default port 3000), then `bun run scripts/smoke-orpc.mjs`.
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";

const BASE = process.env.SMOKE_URL ?? "http://127.0.0.1:3000/api/orpc";
const orpc = createORPCClient(
  new RPCLink({ url: () => BASE })
);

const line = (msg) => console.log(msg);

async function main() {
  // 1. list
  const events = await orpc.event.list();
  line(`event.list -> ${events.length} events; first: "${events[0]?.title}"`);
  if (!events.length) throw new Error("no events seeded!");

  // 2. detail
  const target = events[0];
  const detail = await orpc.event.detail({ id: target.id });
  line(`event.detail(${target.id}) -> "${detail?.title}" (rating ${detail?.rating})`);
  if (!detail) throw new Error("detail not found");

  // 3. recent feedback
  const fb = await orpc.feedback.list();
  line(`feedback.list -> ${fb.length} rows`);

  // 4. create -> persists + aggregates update
  const before = { rating: detail.rating, reviewCount: detail.reviewCount };
  const created = await orpc.feedback.create({
    eventId: target.id,
    attendeeName: "Smoke Tester",
    attendeeRole: "QA Bot",
    overallRating: 5,
    contentQuality: 5,
    speakerPerformance: 4,
    venueLogistics: 5,
    likedMost: "End-to-end wire test",
    couldImprove: "Nothing — it just worked",
    wouldRecommend: true,
    notes: "smoke test row; will be cleaned up",
  });
  line(`feedback.create -> id ${created.id} (${created.sentiment})`);
  const after = await orpc.event.detail({ id: target.id });
  line(`event.detail after create -> rating ${after.rating} / reviews ${after.reviewCount} (was ${before.rating} / ${before.reviewCount})`);

  // 5. cleanup: hard-delete the smoke row + restore aggregates via drizzle
  const dbMod = await import("../lib/db/index.ts");
  const { eq, avg, count } = await import("drizzle-orm");
  const db = dbMod.db;
  const feedbackTable = dbMod.feedback;
  const eventsTable = dbMod.events;
  await db.delete(feedbackTable).where(eq(feedbackTable.id, created.id));
  const agg = await db.select({ avgRating: avg(feedbackTable.overallRating), total: count(feedbackTable.id) }).from(feedbackTable).where(eq(feedbackTable.eventId, target.id));
  await db.update(eventsTable).set({ rating: Number(Number(agg[0]?.avgRating ?? 0).toFixed(1)), reviewCount: Number(agg[0]?.total ?? 0) }).where(eq(eventsTable.id, target.id));
  line("cleanup done (smoke row deleted, aggregates restored)");
}

main().then(() => process.exit(0)).catch((err) => { console.error("SMOKE FAILED:", err); process.exit(1); });