// orpc client — one typed client shared by all client components.
// Each procedure is callable as a plain async function, e.g. orpc.event.list().
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import type { AppRouter } from "./router";

// Base URL must match the route handler mount (app/api/orpc/[[...path]]/route.ts).
// The codec appends the procedure path (e.g. /event/list) to this base.
const rpcLink = new RPCLink({
  url: () => "/api/orpc",
});

// RouterClient maps the server router to the client-callable shape, so
// orpc.event.list() / orpc.feedback.create(input) are fully typed.
export const orpc = createORPCClient<RouterClient<AppRouter>>(rpcLink);