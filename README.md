# Arch Advisor

> AI-Powered Architecture, PRD & Vibe Coding Suite

Arch Advisor is a full-stack AI toolkit built with **Next.js 16**, **Google Gemini AI**, **Tailwind CSS**, and **Supabase**. Designed for vibe coders, founders, and solutions architects to go from a raw app concept all the way to a production-grade AWS cloud architecture — in minutes.

---

## Key Features

### Interactive Vibe Roadmap
Paste any PRD document and generate a non-linear, branching Mermaid flowchart with clickable nodes. Each node opens a modal containing an ultra-detailed AI prompt tailored for Cursor, Claude, Windsurf, or any AI coding assistant — ready to copy and paste.

### MVP PRD Generator
A 4-step guided wizard (App Concept → MVP Features → Tech Stack → SaaS & Services) that produces a GitHub-ready PRD markdown document. The output can be directly piped into the Vibe Roadmap generator.

### AWS Architecture Advisor
A 6-step wizard that analyzes workload type, traffic patterns, data requirements, SLA targets, security sensitivity, and budget constraints to generate:
- AWS architecture diagrams rendered via Mermaid.js
- AWS Well-Architected Framework (WAF) scores across 5 pillars with radar charts and security checklists
- Estimated monthly and yearly costs broken down per AWS service
- Persistent, shareable results stored in Supabase via unique assessment URLs

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.3.5 — App Router, Route Handlers |
| Language | TypeScript 5 |
| AI Engine | Google Gemini AI (`gemini-3.6-flash`) via `@google/generative-ai` |
| Database | Supabase (PostgreSQL) |
| Styling | Tailwind CSS v4, Framer Motion, Lucide React |
| Diagrams & Charts | Mermaid.js, Recharts |
| Validation | Zod v3, React Hook Form + `@hookform/resolvers` |
| Runtime | React 19.2, React DOM 19.2 |

---

## Getting Started

### Prerequisites

- Node.js `v18.x` or higher
- npm / yarn / pnpm / bun
- A Supabase project (for PostgreSQL storage)
- A Google Gemini API Key

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/arch-advisor.git
cd arch-advisor
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Copy the sample environment file and fill in your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key
```

### 4. Database Setup

Run the migration SQL in your Supabase SQL Editor:

```
src/migrations/sep14.sql
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── app/                         # Next.js App Router
│   ├── page.tsx                 # Landing page
│   ├── roadmap/                 # Interactive Vibe Roadmap page
│   ├── prd/                     # MVP PRD Generator page
│   ├── assess/                  # Architecture Assessment wizard page
│   ├── result/[id]/             # Architecture result dashboard (persisted)
│   └── api/
│       ├── assess/              # Architecture submission & result fetch endpoints
│       ├── prd/generate/        # PRD generation endpoint
│       └── roadmap/generate/    # Roadmap flowchart generation endpoint
├── components/
│   ├── ui/                      # Header, MermaidDiagram renderer
│   ├── wizard/                  # Steps 1-6 for architecture assessment
│   ├── prd/                     # 4-step PRD builder + result view
│   ├── roadmap/                 # Interactive flowchart, node modal, roadmap view
│   └── result/                  # WAF radar chart, cost chart, architecture detail
├── lib/
│   ├── engine/
│   │   ├── gemini.ts            # Gemini AI — architecture analysis
│   │   ├── prd-generator.ts     # Gemini AI — PRD generation
│   │   ├── roadmap-generator.ts # Gemini AI — branching roadmap flowchart
│   │   ├── cost-estimator.ts    # AWS cost estimation engine
│   │   └── waf-scorer.ts        # WAF pillar scoring engine
│   ├── supabase/client.ts       # Supabase client
│   └── validations/             # Zod schemas for all three flows
├── migrations/sep14.sql         # PostgreSQL table definitions
└── types/database.ts            # TypeScript types for DB & API payloads
```

For a comprehensive per-file breakdown, see [srcExplain.md](srcExplain.md).

---

## Application Workflows

### Vibe Roadmap

```mermaid
flowchart LR
    A["PRD Text Input"] --> B["POST /api/roadmap/generate"]
    B --> C["Gemini AI — Branching Flowchart + Node Prompts"]
    C --> D["Interactive Mermaid Graph"]
    D --> E["Click Node — PromptNodeModal"]
    E --> F["Copy AI Prompt to Cursor / Claude / Windsurf"]
```

### MVP PRD Generator

```mermaid
flowchart LR
    A["4-Step Wizard"] --> B["Zod Validation"]
    B --> C["POST /api/prd/generate"]
    C --> D["Gemini AI — Structured PRD JSON"]
    D --> E["PRD Result View + Export Markdown"]
    E -->|Optional| F["Open in Vibe Roadmap"]
```

### Architecture Evaluation

```mermaid
flowchart LR
    A["6-Step Wizard"] --> B["Zod Validation"]
    B --> C["POST /api/assess/submit"]
    C --> D["Gemini AI + Cost Estimator + WAF Scorer"]
    D --> E["Supabase PostgreSQL"]
    E --> F["/result/[id] Dashboard"]
```

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request.

---

## License

MIT License — see [LICENSE](LICENSE) for details.
