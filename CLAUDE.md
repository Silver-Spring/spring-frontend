# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

The **Silver Spring** frontend — a Next.js app for a retirement readiness psychometric assessment platform. Users register, pay via Razorpay, take a scored assessment, and receive a PDF report. Admins manage assessment types, questions, bands, and view analytics via a sidebar dashboard.

---

## Commands

```bash
pnpm dev          # Start dev server (Next.js, default port 3000)
pnpm build        # Production build
pnpm lint         # ESLint (Next.js flat config — see Lint notes below)
pnpm codegen      # Regenerate GraphQL types from backend schema (requires backend running on :5001)
pnpm codegen:watch  # Watch mode for codegen
```

No test suite exists in this codebase.

**Always run `pnpm codegen`** after adding or changing any GraphQL operation. Never manually edit `src/gql/graphql.ts` or `src/gql/gql.ts` — they are generated.

---

## Architecture

### Routing (Next.js 15 App Router)

| Route                                                                   | Purpose                                                                                                                              |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `/`                                                                     | Redirects to `/assessment` (authed) or `/auth/login`                                                                                 |
| `/auth/*`                                                               | Login, register, forgot/reset password                                                                                               |
| `/assessment`                                                           | AssessmentStatus hub — shows current state (not paid / ready / in-progress / done)                                                   |
| `/assessment/cori`                                                      | CORI (Couples Retirement Index) landing page — dyadic flow with Partner A (pays + gets invite code) and Partner B (joins via code)   |
| `/assessment/[sessionId]`                                               | Question-by-question assessment flow (handles both SSRI/PRAI solo and CORI dyadic sessions)                                          |
| `/assessment/results/[resultId]`                                        | Results report page                                                                                                                  |
| `/admin`                                                                | Dashboard overview                                                                                                                   |
| `/admin/assessment`                                                     | Assessment workspace (types, sections, questions, bands, template content) — all views are query-param driven (`?view=...&type=...`) |
| `/admin/users`, `/admin/analytics`, `/admin/payments`, `/admin/coupons` | Supporting admin pages                                                                                                               |

All `/admin/*` routes are wrapped in `AdminSidebarLayout` which enforces `AuthRestrict.LOGGED_OUT | AuthRestrict.NOT_ADMIN`. Middleware at `middleware.ts` handles cookie-based auth redirects for both protected and public paths.

### GraphQL / Apollo

- Backend at `NEXT_PUBLIC_GRAPHQL_URL` (dev: `http://localhost:5001/graphql`)
- Client is set up in `src/lib/apollo/with-apollo.tsx` — reads `authToken` cookie on every request and injects `Authorization: Bearer <token>`
- Cache policy: `cache-first` globally; mutations call `refetch()` on related queries rather than using cache writes
- **GraphQL documents** live colocated in each module under `graphql/*.graphql.ts`, exported as typed document nodes using `graphql()` from `@/gql`
- **Codegen** reads all `src/**/*.graphql.ts` files and generates types into `src/gql/`. After adding or changing a GraphQL operation, run `pnpm codegen`.

### State

- **Zustand** — two stores:
  - `useUserStore` (`src/stores/use-user-store.ts`) — persisted to localStorage; holds current user profile + admin flag
  - `useAssessmentStore` (`src/stores/use-assessment-store.ts`) — in-memory; tracks current session + question number
- Apollo cache handles server state; Zustand handles client-side session/user state

### Module structure

Code is organised under `src/modules/<domain>/`:

```
modules/
  admin/
    components/       # All admin UI components
      dashboard/      # AdminDashboardPage, insights, quick-actions
      assessment/     # catalog, overview, workspace, content panels
      interpretation-bands/
      dialogs/
      shared/         # AdminKpiCard, AdminPageHeader, AdminPanelSkeleton
    graphql/          # GraphQL documents for all admin operations
    hooks/            # One hook per operation (use-admin-assessment-types.ts, etc.)
    lib/              # assessment-workspace-nav.ts, report-field-hints.ts, etc.
    schema/           # Zod schemas for admin forms
  assessment/
    components/       # User-facing assessment UI (SSRI/PRAI)
    constants/        # AssessmentTypeCode, formatPriceFromPaise, TEMPLATE_CONTENT_KEYS
    graphql/          # Session, question, response, results, couple-assessment documents
    hooks/            # use-question-flow, use-submit-or-update-response, use-start-couple-assessment, etc.
    cori/
      components/     # CORI landing page: cori-page, cori-hero, cori-pricing, cori-invite-reveal, etc.
  auth/               # Login/register/logout, useCurrentUser, TOKEN_NAME cookie key
  payment/            # Razorpay create-order + verify-payment hooks
```

### Admin assessment workspace

The `/admin/assessment` page is a single-page workspace driven by two URL params:

- `?view=` — one of: `catalog | users | overview | content | scoring | reports | settings`
- `?type=` — assessment type code (e.g. `ssri`, `prai`)

`useAdminAssessmentWorkspace()` reads these params and provides `navigate(view, type)`. Views `catalog` and `users` are global (no type context); all others are type-scoped. The workspace sidebar nav is defined in `src/modules/admin/lib/assessment-workspace-nav.ts`.

### Auth pattern

`AuthLayout` + `AuthRestrict` flags in `src/components/layouts/auth-layout.tsx` wrap pages. The layout reads from `useUserStore`. `TOKEN_NAME = 'authToken'` is the cookie key used everywhere.

---

## React Compiler (Next.js 16)

`reactCompiler: true` is set in `next.config.ts`. This enforces rules via `eslint-plugin-react-compiler`:

- **`react-hooks/set-state-in-effect`** — calling `setState` synchronously inside a `useEffect` body. Fix: derive state during render (computed value + "dismissed" flag) instead of syncing via effect.
- **`react-hooks/refs`** — accessing `ref.current` during render. Fix: read `.current` inside event handlers or effects only.
- **`react-hooks/purity`** — calling impure functions (e.g. `Math.random()`, `Date.now()`) during render. Fix: move to `useState` lazy initializer or `useRef`.
- **`react-hooks/incompatible-library`** — React Hook Form `watch()` and TanStack Table `useReactTable()` cannot be memoized by the compiler; these are warnings not errors.
- **`useCallback` deps** — the compiler infers broader deps than optional-chained expressions (e.g. `currentSession` not `currentSession?.id`). Always use the non-optional object as the dep.

The codebase has pre-existing violations in admin components and shadcn/ui files. Add `// eslint-disable-next-line react-hooks/set-state-in-effect` only when a proper refactor would break complex logic.

---

## Lint notes

`eslint.config.mjs` uses the Next.js 16 flat config directly (no `FlatCompat` wrapper):

```js
import coreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
const eslintConfig = [...coreWebVitals, ...nextTypescript, { ignores: ['src/gql/**', ...] }];
```

`src/gql/**` is excluded because those files are generated by codegen.

---

## Key conventions

- **Styling**: Tailwind CSS 4 only — no inline styles, no CSS modules. shadcn/ui components from `@/components/ui/`.
- **Event handlers**: named with `handle` prefix (`handleClick`, `handleSubmit`)
- **Functions**: `const foo = () =>` style, with explicit TypeScript types
- **Early returns** preferred over nested conditionals
- **No new doc/readme files** — context lives in code and this file

---

## Environment variables

```
NEXT_PUBLIC_GRAPHQL_URL       # GraphQL endpoint (dev: http://localhost:5001/graphql)
NEXT_PUBLIC_APP_URL           # App base URL for metadata
NEXT_PUBLIC_RAZORPAY_KEY_ID   # Razorpay publishable key
NEXT_PUBLIC_POSTHOG_KEY       # PostHog analytics key
NEXT_PUBLIC_POSTHOG_HOST      # PostHog host (proxied via /ingest)
```

---

## Available skills

Skills live in `.agents/skills/` and are invoked with `/skill-name`. Use them proactively:

| Skill | When to use |
|-------|-------------|
| `vercel-react-best-practices` | Writing or reviewing React/Next.js components — performance patterns, re-render optimization, data fetching waterfalls, bundle size |
| `vercel-composition-patterns` | Refactoring components with many boolean props, designing compound component APIs, building reusable component libraries |
| `next-best-practices` | File conventions, RSC boundaries, async API changes (Next.js 15+), route handlers, image/font optimization |
| `web-design-guidelines` | Reviewing UI for accessibility, visual hierarchy, responsive design compliance |
| `frontend-design` | UI layout and visual design decisions |
| `vercel-optimize` | Bundle analysis and Vercel deployment performance |
| `vercel-react-view-transitions` | Implementing page/element view transitions |
| `deploy-to-vercel` | Deploying or configuring Vercel project settings |
| `code-review` | Reviewing a diff for correctness bugs and simplification opportunities |
| `security-review` | Reviewing pending changes for security issues |
| `simplify` | Refactor changed code for reuse, simplification, and efficiency |
