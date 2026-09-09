// Flow test — mirrors exactly what the client does after a submission:
// 1) create feedback (empty optional fields, the case that used to fail)
// 2) list events -> confirm the submitted event's rating/reviewCount changed
// 3) detail + byEvent queries (what the modal would show) see the new row
// 4) cleanup: delete the smoke row + restore aggregates
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";

const BASE = process.env.SMOKE_URL ?? "http://127.0.0.1:3102/api/orpc";
const orpc = createORPCClient(new RPCLink({ url: () => BASE }));
const log = (s) => console.log(s);

async function main() {
  const events = await orpc.event.list();
  const target = events[0];
  const before = target.rating;
  log(`before: ${target.title} rating=${before} reviews=${target.reviewCount}`);

  // Empty optional strings MUST now be accepted by the server (optText).
  let created;
  try {
    created = await orpc.feedback.create({
      eventId: target.id,
      attendeeName: "Flow Test",
      attendeeRole: "",
      overallRating: 5,
      contentQuality: 5,
      speakerPerformance: 5,
      venueLogistics: 5,
      likedMost: "",
      couldImprove: "",
      wouldRecommend: true,
      notes: "",
    });
  } catch (e) {
    console.error("CREATE FAILED. message =>", e?.message?.slice(0, 2000));
    console.error("CREATE FAILED. statusCode =>", e?.status, "| code =>", e?.code, "| defined =>", e?.defined);
    console.error("CREATE FAILED. data =>", JSON.stringify(e?.data ?? null, null, 2)?.slice(0, 3000));
    throw e;
  }
  log(`created id=${created.id}; empty-optional fields accepted`);

  const after = await orpc.event.detail({ id: target.id });
  log(`after create: rating=${after.rating} reviews=${after.reviewCount} (was ${before}/${target.reviewCount})`);
  if (after.reviewCount !== target.reviewCount + 1) throw new Error("reviewCount did not bump!");

  const listAfter = await orpc.event.list();
  const listed = listAfter.find((e) => e.id === target.id);
  log(`event.list reflects update: ${listed.rating}/${listed.reviewCount}`);

  const byEvent = await orpc.feedback.listByEvent({ eventId: target.id });
  const mine = byEvent.find((f) => f.attendeeName === "Flow Test");
  log(`detail modal sees new row: ${mine ? "yes (id " + mine.id + ")" : "MISSING!"}`);

  // Cleanup
  const dbMod = await import("../lib/db/index.ts");
  const { eq, avg, count } = await import("drizzle-orm");
  const { db, feedback: fb, events: ev } = dbMod;
  await db.delete(fb).where(eq(fb.id, created.id));
  const agg = await db
    .select({ avgRating: avg(fb.overallRating), total: count(fb.id) })
    .from(fb)
    .where(eq(fb.eventId, target.id));
  await db
    .update(ev)
    .set({
      rating: Number(Number(agg[0]?.avgRating ?? 0).toFixed(1)),
      reviewCount: Number(agg[0]?.total ?? 0),
    })
    .where(eq(ev.id, target.id));
  log("cleanup done");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("FLOW FAILED:", err?.message);
    process.exit(1);
  });