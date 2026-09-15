<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Arch Advisor — Agent Context

## Project Overview

Arch Advisor is a Next.js 16.3.5 (App Router) full-stack AI application. It provides three tools:

1. **Vibe Roadmap** (`/roadmap`) — pastes a PRD, generates a non-linear branching Mermaid flowchart with per-node AI prompts via Gemini AI.
2. **MVP PRD Generator** (`/prd`) — 4-step wizard generating structured PRD markdown documents via Gemini AI.
3. **AWS Architecture Advisor** (`/assess`) — 6-step wizard generating AWS architecture diagrams, WAF scores, and cost estimates via Gemini AI.

---

## Runtime & Framework

- **Next.js**: `16.3.5` with App Router and Route Handlers. Do NOT use Pages Router, `getServerSideProps`, or `getStaticProps`.
- **React**: `19.2.x` — use the latest React patterns. `use client` / `use server` directives apply.
- **TypeScript**: strict mode. All new files must be typed; avoid `any`.
- **Tailwind CSS**: `v4` — PostCSS-based config via `postcss.config.mjs`. No `tailwind.config.js` file; configuration is in CSS directly. Class syntax may differ from v3.
- **Package manager**: `npm`. Use `npm install` for new dependencies.

---

## AI Engine

All Gemini AI calls use `@google/generative-ai` (not `@google/genai`). The active model is `gemini-3.6-flash` with `responseMimeType: "application/json"`. All engine modules live in `src/lib/engine/`:

- `gemini.ts` — architecture analysis
- `prd-generator.ts` — PRD generation
- `roadmap-generator.ts` — branching roadmap flowchart

When modifying prompts, always keep `responseMimeType: "application/json"` and ensure the response is parsed with `JSON.parse(result.response.text())`. Never switch to streaming responses in engine files.

---

## Database

No database — all AI results are returned directly to the client without persistence.

---

## Project Structure Rules

```
src/app/          — pages and API route handlers only
src/components/   — React UI components (no business logic)
src/lib/engine/   — AI and computation logic
src/lib/validations/ — Zod schemas
src/types/        — shared TypeScript interfaces
```

- API routes follow the pattern: `src/app/api/<feature>/<action>/route.ts`
- Page components are in `src/app/<route>/page.tsx`
- Shared UI components go in `src/components/ui/`
- Feature components are grouped by tool: `wizard/`, `prd/`, `roadmap/`, `result/`

---

## Validation

All form inputs are validated with **Zod v3** before hitting any API route. Schemas live in `src/lib/validations/`:

- `form-schema.ts` — architecture wizard (6 steps)
- `prd-schema.ts` — PRD builder (4 steps)
- `roadmap-schema.ts` — roadmap PRD input

Do not add API logic that bypasses Zod validation.

---

## Styling Conventions

- Background: `#000000`
- Primary text: `#E1DCC9`
- Accent / borders: `#412D15`
- Card backgrounds: `#1F150C`
- All components use Tailwind utility classes. No CSS modules or inline styles.
- Framer Motion is available for animations.
- Lucide React is the icon library.

---

## Key Behaviours to Preserve

- The Roadmap page reads from `localStorage` key `arch_advisor_import_prd` on mount to auto-populate the PRD textarea when navigating from the PRD result view.
- Assessment results are returned directly from the API and displayed inline in the wizard page.
- All Gemini AI responses are expected to be pure JSON — never wrap prompts to return markdown-fenced code blocks.
- Mermaid node IDs in roadmap output must be simple alphanumeric keys (e.g. `NODE_1`, `NODE_2A`). Labels must be quoted strings.

---

## Environment Variables

```env
GEMINI_API_KEY=
```

`GEMINI_API_KEY` is server-only (no `NEXT_PUBLIC_` prefix). Never expose it to the client.

---

## Commands

```bash
npm run dev      # start development server (Turbopack)
npm run build    # production build
npm run start    # start production server
npm run lint     # ESLint
```
