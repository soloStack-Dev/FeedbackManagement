<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# EventFlow (event-feedback-management)

Next.js 16 App Router app — "EventFlow", a SaaS event feedback/review platform ("EventFlow Technologies Inc.").

## Package manager
- **Bun** is required (`packageManager: bun@1.4.2`, `bun.lock`). Use `bun add`/`bun install`, not npm/yarn/pnpm.

## Commands (from `package.json`)
- `bun run dev` — dev server (Turbopack by default; `next lint` was removed in v16, don't add it)
- `bun run build` / `bun run start`
- `bun run lint` — runs ESLint CLI via flat config `eslint.config.mjs`. This is the only check; there is **no test framework or typecheck script** configured. `bun run build` does type-check via Next.

## Stack notes
- MUI v9 (`@mui/material` + emotion), TanStack React Query v5, `@orpc/client` + `@orpc/server` (v2 beta), `drizzle-orm` (`drizzle-kit` for CLI), `mysql2`, `zod`, `zustand`, `gsap`, Tailwind v4.
- App router lives directly under `app/` (no `src/` dir). Path alias `@/*` → repo root.
- `asserts/` (note the misspelling, not `assets/`) holds the page reference screenshots per page.
- `Context/` contains the authoritative design + build prompt specs (home / event / feedback pages) — build pages from these specs.
- `.env` defines a remote Aiven MySQL connection via `DATABASE_URL` + `DATABASE_*`. DB wiring lives in `lib/db/` (`schema.ts`, `index.ts` = mysql2 pool + drizzle) and `drizzle.config.ts`; migration is in `drizzle/` and already applied. `scripts/seed.ts` seeds 6 events + 5 feedback rows; `scripts/smoke-orpc.mjs` is the end-to-end RPC smoke test (start prod server, then run it).
- MUI v9 API drift to remember: `Grid` (no `Grid2`), `TextField` `slotProps={{ input }}` (no `InputProps`), outline star is `StarBorder` (no `StarOutline`). Icons come from `@mui/icons-material` (`react-icon` is an unusable legacy FA wrapper).
- orpc: procedures live in `lib/orpc/router.ts`; route is `app/api/orpc/[[...path]]/route.ts` handled with `{ prefix: "/api/orpc" }`; **client must be typed `createORPCClient<RouterClient<AppRouter>>`** (passing plain `AppRouter` breaks all types); client is `lib/orpc/client.ts`. Output zod schemas must use enum-literal unions (`category/status/format/sentiment`) so client types match drizzle `mysqlEnum`.
- Data layer: `lib/data/use-events.ts` has React Query hooks (`useEvents`, `useEventDetail`, `useFeedback`, `useFeedbackByEvent`, `useCreateFeedback`). State: `lib/store/use-app-store.ts` (`useEventStore` = filters; `useFeedbackStore` = Feedback-form draft). Animations: `lib/hooks/use-animations.ts` (gsap). Theme: `lib/theme.ts`, providers in `app/providers.tsx`. **MUI SSR requires `lib/emotion-registry.tsx`** (`CacheProvider` + `useServerInsertedHTML`) wrapping `<Providers>` in the root layout — without it, emotion `<style>` tags render inline in the body and cause hydration mismatches.
- **Basic SQL (date) gotcha:** MySQL `DATETIME` needs `"YYYY-MM-DD HH:MM:SS"`, not ISO `T`/`Z`. mysql2 pool needs `ssl: { rejectUnauthorized: false }` for Aiven.
- `challenges/` contains logs of every error/warning encountered during the build (runtime-errors.txt, syntax-errors.txt, warnings.txt, biggest-challenge.txt) — keep it updated when you hit new ones.
- Pages: `app/page.tsx` (Home — hero, live pulse, features, analytics, CTA), `app/events/page.tsx` (Events grid + filters), `app/feedback/page.tsx` (Feedback form → orpc create). `layout.tsx` uses `LayoutProps<"/">` (Next 16 async Request APIs — `params`/`searchParams`/`cookies`/`headers` are async-only).

## Page structure
- Navbar `Home` / `Events` / `Feedback` centered, primary CTA "Give Feedback" + profile icon right; active nav item gets a soft pill. Brand color: indigo/violet. Same navbar/footer shared across all pages.
