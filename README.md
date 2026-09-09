<div align="center">

# EventFlow

### Event feedback & review platform for tech communities

**EventFlow Technologies Inc.**

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MUI](https://img.shields.io/badge/MUI_v9-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![orpc](https://img.shields.io/badge/orpc-4F46E5?style=for-the-badge)
![Drizzle](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-f9f1e1?style=for-the-badge&logo=bun&logoColor=black)
![TanStack Query](https://img.shields.io/badge/TanStack_Query_v5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Tailwind v4](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

---

## Overview

EventFlow is a SaaS-style event feedback and review platform. Attendees browse
past events, submit structured feedback through a polished form, and organizers
get **live aggregates** — average ratings and review counts are recomputed and
propagated to every page the moment a submission lands.

Built on the Next.js 16 App Router with MUI v9 and a **fully typed**
backend. The frontend never talks to the database directly: every data access
flows through an [orpc](https://orpc.unnoq.com) RPC layer that shares **zod
validation between client and server**, with Drizzle ORM + MySQL underneath.

## Vercel deployment

Deploy this `my-app` directory as the Vercel project root. The committed
`vercel.json` installs dependencies with Bun from the lockfile and runs
`bun run build`.

Do not install `vercel/vercel-plugin`; it is not required for this Next.js
application.

## Features

### Home
- Hero with animated landing copy and events preview
- **Live pulse** ticker streaming the newest feedback submissions
- Feature highlights and an analytics section fed by the live database

### Events
- Responsive card grid with category / status / format / search filtering
- Paginated "load more" browsing and skeleton loading states
- **View Details modal** — full event summary, live rating, and every verified
  feedback entry with a "Give Feedback" shortcut that preselects the event

### Feedback
- Verified-attendee form: event picker, name & role, interactive 1–5 star
  ratings (overall + content / speaker / venue), recommendation toggle, notes
- Server-side validation with zod (`min(1)`, `1..5` ranges) — empty optional
  fields never block a submission

### Data layer
- React Query hooks with cache invalidation — after a submission, the events
  list, event detail, and per-event feedback queries refresh automatically
- MySQL-backed, so everything survives restarts

## Architecture

```
 Browser (.tsx, client components)
   │  typed calls via createORPCClient<RouterClient<AppRouter>>
   ▼
 /api/orpc/[[...path]]        (Next.js route handler)
   │  zod input/output validation on both sides
   ▼
 lib/orpc/router.ts           (event.list / event.detail / feedback.*)
   │
   ▼
 lib/db/index.ts              (mysql2 pool + Drizzle ORM)
   │
   ▼
 Aiven MySQL (managed, SSL)
```

The **router recomputes aggregates** on every `feedback.create` (AVG of
`overall_rating`, COUNT of rows), so `rating` / `reviewCount` on the parent
event stay correct everywhere.

## Tech Stack

| Layer          | Technology                                          |
| -------------- | --------------------------------------------------- |
| Framework      | Next.js 16 (App Router, Turbopack)                  |
| UI             | MUI v9 (+ emotion), Tailwind CSS v4                 |
| Data fetching  | TanStack React Query v5                             |
| RPC            | orpc (v2 beta) — typed procedures end-to-end        |
| Validation     | zod (v4)                                            |
| ORM / Database | Drizzle ORM + drizzle-kit, MySQL (Aiven, managed)   |
| State          | Zustand (filters + form draft)                      |
| Animation      | GSAP                                               |
| Runtime        | Bun 1.4, React 19, TypeScript                       |

## Getting Started

### Prerequisites
- **Bun 1.4+** (the repo is pinned via `packageManager: bun@1.4.2`)

```bash
bun install
```

### Environment

The app connects to a remote (Aiven) MySQL database. Copy the connection
details into `.env` (see `.env` in the repo root):

```env
DATABASE_URL=mysql://user:pass@host:port/db?ssl-mode=REQUIRED
DATABASE_HOST=...
DATABASE_PORT=...
DATABASE_USER=...
DATABASE_PASSWORD=...
DATABASE_NAME=...
```

### Push the schema & seed

```bash
bunx drizzle-kit generate   # generate SQL migration from lib/db/schema.ts
bunx drizzle-kit migrate    # apply migration to the database
bun scripts/seed.ts         # seed 6 events + 5 feedback rows
```

### Run

```bash
bun run dev        # development server → http://localhost:3000
bun run build      # type-check + production build
bun run start      # serve the production build
bun run lint       # ESLint (flat config)
```

> No test framework is configured — `bun run build` performs the type-check,
> and end-to-end verification lives in `scripts/` (below).

## End-to-End Verification

`scripts/smoke-orpc.mjs` drives the real RPC wire protocol against a running
production server (no HTTP mocks):

```bash
bun run start &            # boot the server (or: $env:PORT="3100"; bun run start)
SMOKE_URL=http://127.0.0.1:3000/api/orpc bun scripts/smoke-orpc.mjs
```

It verifies event listing/detail, feedback listing, **creating a feedback row
(which bumps the event's rating & review count)**, and cleanup.

## Database Schema

### `events`
| column           | type                          |
| ---------------- | ----------------------------- |
| `id`             | int PK autoincrement          |
| `title`, `slug`  | varchar(255), slug unique     |
| `description`    | text                          |
| `category`       | enum `Technology & AI` / `Web Development` / `Design & UX` / `Startups & Biz` |
| `status`         | enum `Upcoming` / `Past` / `Feedback Open` |
| `format`         | enum `Online` / `In-Person` / `Hybrid` |
| `venue`, `city`  | varchar                       |
| `event_date`     | datetime                      |
| `cover_image`    | varchar(500)                  |
| `rating`         | float (maintained by create)  |
| `review_count`   | int (maintained by create)    |

### `feedback`
| column                  | type                                   |
| ----------------------- | -------------------------------------- |
| `id`                    | int PK autoincrement                   |
| `event_id`              | FK → events.id (cascade delete)        |
| `attendee_name`, `attendee_role` | varchar                     |
| `overall_rating`, `content_quality`, `speaker_performance`, `venue_logistics` | int 1–5 |
| `liked_most`, `could_improve`, `notes` | text (nullable)           |
| `would_recommend`       | boolean                                |
| `sentiment`             | enum `positive` / `neutral` / `negative` (derived) |
| `created_at`            | timestamp                              |

## RPC Procedures (`lib/orpc/router.ts`)

| Procedure            | Input                | Output                  | Notes                              |
| -------------------- | -------------------- | ----------------------- | ---------------------------------- |
| `event.list`         | —                    | `Event[]`               | ordered by date desc               |
| `event.detail`       | `{ id }`             | `Event`                 |                                    |
| `feedback.list`      | —                    | `Feedback[]`            | newest 20                          |
| `feedback.listByEvent` | `{ eventId }`      | `Feedback[]`            | newest first                       |
| `feedback.create`    | full form payload    | `Feedback`              | + recomputes event aggregates      |

## Project Structure

```
app/
  page.tsx               Home (hero, live pulse, features, analytics)
  events/page.tsx        Events grid + filters + View Details modal
  feedback/page.tsx      Feedback form
  api/orpc/[[...path]]   orpc route handler
  providers.tsx          QueryClient + theme providers
  layout.tsx             Root layout (SSR-emotion safe)
components/
  layout/   Navbar, Footer
  events/   EventCard, EventDetailDialog, EventFilters, EventStars
  home/     Hero, LivePulse, Features, Analytics, CTA, SectionLabel
  shared/   InteractiveRating, ...
lib/
  db/       schema.ts (drizzle) + index.ts (mysql2 pool)
  orpc/     router.ts (server), client.ts (typed client)
  data/     use-events.ts (React Query hooks)
  store/    zustand stores
  theme.ts, emotion-registry.tsx, hooks/use-animations.ts (gsap)
scripts/
  seed.ts                 seed data
  smoke-orpc.mjs          e2e RPC smoke test
  flow-test.mjs           full submit → aggregates → cleanup flow
challenges/               build/runtime issue log books
```

## Field Notes

- **MUI v9 API drift** vs classic MUI: `Grid` (no `Grid2`), `slotProps` (no
  `PaperProps` / `InputProps`), `StarBorder` (no `StarOutline`).
- **SSR + MUI emotion** requires `lib/emotion-registry.tsx`
  (`CacheProvider` + `useServerInsertedHTML`) — otherwise emotion `<style>`
  tags render inline in the body and cause hydration mismatches.
- **orpc client typing**: always
  `createORPCClient<RouterClient<AppRouter>>` — passing the plain `AppRouter`
  breaks the client types.
- Output zod schemas **must use enum literals** (not `z.string()`) for
  `category` / `status` / `format` / `sentiment` so client types match the
  `mysqlEnum` columns.
- MySQL `DATETIME` columns want `"YYYY-MM-DD HH:MM:SS"` strings — not ISO
  with `T`/`Z`.
- The mysql2 pool needs `ssl: { rejectUnauthorized: false }` for Aiven, and
  **must use the callback client** (`import mysql from "mysql2"`) — the
  `mysql2/promise` driver breaks Drizzle.

## License

Private — EventFlow Technologies Inc.