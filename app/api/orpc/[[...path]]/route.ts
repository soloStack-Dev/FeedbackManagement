// app/api/orpc/[[...path]]/route.ts — mounts the orpc router.
// Optional catch-all so BOTH /api/orpc and /api/orpc/event.list reach the
// handler; `prefix` strips the mount point from the URL during matching.
import { RPCHandler } from "@orpc/server/fetch";
import { appRouter } from "@/lib/orpc/router";

const handler = new RPCHandler(appRouter);

const PREFIX = "/api/orpc";

export async function GET(request: Request) {
  const result = await handler.handle(request, { context: {}, prefix: PREFIX });
  return result.response ?? new Response("Not Found", { status: 404 });
}

export async function POST(request: Request) {
  const result = await handler.handle(request, { context: {}, prefix: PREFIX });
  return result.response ?? new Response("Not Found", { status: 404 });
}