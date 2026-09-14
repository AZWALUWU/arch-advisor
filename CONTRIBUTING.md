# Contributing to Arch Advisor

Thanks for your interest in contributing! This guide will help you get started.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Fork & Clone](#fork--clone)
- [Branching Strategy](#branching-strategy)
- [Development Workflow](#development-workflow)
- [Code Style & Conventions](#code-style--conventions)
- [Commit Messages](#commit-messages)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)

---

## Prerequisites

- **Node.js** v18 or higher
- **npm** (recommended) or yarn/pnpm
- **Git**
- A [Supabase](https://supabase.com) account (for PostgreSQL)
- A [Google Gemini](https://aistudio.google.com/apikey) API key

---

## Fork & Clone

1. **Fork** the repository on GitHub.

2. **Clone** your fork:
   ```bash
   git clone https://github.com/<your-username>/arch-advisor.git
   cd arch-advisor
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/AZWALUWU/arch-advisor.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Setup environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and fill in your credentials. See [Environment Variables](#environment-variables).

6. **Run development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

---

## Branching Strategy

We use a 3-tier branching model:

```
main        ← production (auto-deploy via Vercel)
  └── develop    ← staging + preview deploy
        └── feature-xxx    ← your working branch
```

| Branch | Purpose | Push Policy | CI |
|--------|---------|-------------|-----|
| `main` | Production code | PR only, requires review | Lint + Build + Trivy + Production Deploy |
| `develop` | Staging/integration | PR only, requires review | Lint + Build + Trivy + Preview Deploy |
| `feature` | Central development hub | PR only, requires review | Lint + Build + Trivy |

### Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/<short-description>` | `feature/add-dark-mode` |
| Bug fix | `fix/<short-description>` | `fix/mermaid-render-error` |
| Hotfix | `hotfix/<short-description>` | `hotfix/security-patch` |

---

## Development Workflow

### 1. Sync with upstream

Always start by syncing your local `develop` branch:

```bash
git checkout develop
git fetch upstream
git merge upstream/develop
git push origin develop
```

### 2. Create a working branch

Create your branch from `develop`:

```bash
git checkout develop
git checkout -b feature/add-dark-mode
```

### 3. Make changes & commit

```bash
# Stage files
git add src/components/ui/Header.tsx

# Commit with a descriptive message
git commit -m "feat(ui): add dark mode toggle to header"
```

See [Commit Messages](#commit-messages) for formatting rules.

### 4. Push & create a Pull Request

```bash
git push origin feature/add-dark-mode
```

Then open a PR on GitHub: **`feature/add-dark-mode` → `develop`**

### 5. After your PR is merged to `develop`

Once `develop` is ready for production, create a PR: **`develop` → `main`**

This triggers a production deployment.

---

## Code Style & Conventions

### TypeScript

- **Strict mode** is enabled. All new files must be typed.
- Avoid `any`. Use proper types or `unknown` with type guards.
- Interfaces go in `src/types/` or co-located with their feature.

### React

- Use **function components** with hooks.
- Client components use `"use client"` directive at the top.
- Server components are the default (no directive needed).

### Styling

- **Tailwind CSS v4** utility classes only.
- No CSS modules or inline styles.
- Color palette:
  - Background: `#000000`
  - Card: `#1F150C`
  - Accent/border: `#412D15`
  - Text: `#E1DCC9`

### File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `Header.tsx`, `WafRadarChart.tsx` |
| Pages | `page.tsx` | `src/app/prd/page.tsx` |
| API Routes | `route.ts` | `src/app/api/prd/generate/route.ts` |
| Validation Schemas | kebab-case | `form-schema.ts`, `prd-schema.ts` |
| Engine/Logic | kebab-case | `cost-estimator.ts`, `waf-scorer.ts` |

### AI Engine Rules

- All Gemini AI calls use `@google/generative-ai` (not `@google/genai`).
- Model: `gemini-3.6-flash` with `responseMimeType: "application/json"`.
- Always parse responses with `JSON.parse(result.response.text())`.
- Never switch to streaming responses in engine files.
- Prompts must return pure JSON, never markdown-fenced code blocks.

### Validation

- All form inputs validated with **Zod v3** before API calls.
- Schemas live in `src/lib/validations/`.
- Never add API logic that bypasses validation.

---

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>
```

### Types

| Type | When to use |
|------|------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style (formatting, no logic change) |
| `refactor` | Code refactoring (no feature/fix) |
| `test` | Adding or updating tests |
| `ci` | CI/CD configuration changes |
| `chore` | Build process, dependencies, configs |

### Scopes

| Scope | Area |
|-------|------|
| `ui` | UI components |
| `wizard` | Architecture assessment wizard |
| `prd` | PRD generator |
| `roadmap` | Vibe roadmap flowchart |
| `engine` | AI engines (gemini, cost-estimator, waf-scorer) |
| `api` | API route handlers |
| `db` | Database, Supabase, migrations |
| `auth` | Authentication (if added) |

### Examples

```
feat(prd): add step 4 services selection
fix(engine): handle empty mermaid graph response
docs: update contributing guide
style(ui): apply brand color palette
refactor(api): parallelize assess submission pipeline
ci: add preview deploy job for develop branch
```

---

## Pull Request Guidelines

### Before submitting

- [ ] Code compiles without errors (`npm run build`)
- [ ] Lint passes (`npm run lint`)
- [ ] No type errors (`npx tsc --noEmit`)
- [ ] Changes are tested locally
- [ ] Branch is up-to-date with `develop`

### PR Description

Use this template:

```markdown
## What
Brief description of the change.

## Why
Why this change is needed.

## How
How the change works (technical details).

## Screenshots
If UI changed, add before/after screenshots.

## Checklist
- [ ] Code compiles (`npm run build`)
- [ ] Lint passes (`npm run lint`)
- [ ] No type errors (`npx tsc --noEmit`)
- [ ] Tested locally
```

### Review Process

1. PR requires at least **1 review** before merge.
2. CI must pass (lint, type-check, build, Trivy scans).
3. Address review feedback with new commits (don't force push during review).
4. Squash merge is preferred for clean history.

---

## Project Structure

```
src/
├── app/                          # Next.js App Router pages & API routes
│   ├── page.tsx                  # Landing page
│   ├── assess/page.tsx           # Architecture assessment wizard
│   ├── prd/page.tsx              # MVP PRD generator
│   ├── roadmap/page.tsx          # Interactive vibe roadmap
│   ├── result/[id]/page.tsx      # Architecture result dashboard
│   └── api/                      # API route handlers
│       ├── assess/               # Architecture submission & result
│       ├── prd/generate/         # PRD generation
│       └── roadmap/generate/     # Roadmap generation
├── components/
│   ├── ui/                       # Shared UI (Header, MermaidDiagram)
│   ├── wizard/                   # Architecture assessment steps (1-6)
│   ├── prd/                      # PRD builder steps + result view
│   ├── roadmap/                  # Flowchart, modal, view
│   └── result/                   # Charts, diagrams, checklists
├── lib/
│   ├── engine/                   # AI engines & business logic
│   │   ├── gemini.ts             # Architecture analysis
│   │   ├── prd-generator.ts      # PRD generation
│   │   ├── roadmap-generator.ts  # Roadmap generation
│   │   ├── cost-estimator.ts     # AWS cost estimation
│   │   └── waf-scorer.ts         # WAF pillar scoring
│   ├── supabase/client.ts        # Supabase client
│   └── validations/              # Zod schemas
├── migrations/sep14.sql          # Database schema
└── types/database.ts             # TypeScript type definitions
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `GEMINI_API_KEY` | Yes | Google Gemini API key (server-only) |

> **Note:** `GEMINI_API_KEY` has no `NEXT_PUBLIC_` prefix and must never be exposed to the client.

---

## Questions?

Open an issue or start a discussion on GitHub.
