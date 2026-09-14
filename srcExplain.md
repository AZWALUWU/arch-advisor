# Directory & File Structure Documentation (`src`)

This document provides a detailed explanation of all folders and files within the `src` directory of the **Arch Advisor** project.

---

## 1. Folder `src/app/` (Next.js App Router Routing & Endpoints)
Manages main page navigation (Pages) and backend API endpoints (Route Handlers).

- **`layout.tsx`**: Root Layout wrapping all application pages (applies global fonts, Tailwind CSS, and header navigation).
- **`page.tsx`**: Main Landing Page of the application.
- **`globals.css`**: Global stylesheet file based on Tailwind CSS.
- **`favicon.ico`**: Browser tab icon.
- **`app/assess/`**
  - **`page.tsx`**: Page where users complete the multi-step architecture assessment wizard form.
- **`app/result/[id]/`**
  - **`page.tsx`**: Page displaying the generated cloud architecture recommendation, Mermaid diagram, cost breakdown, and Well-Architected Framework (WAF) analysis based on assessment ID.
- **`app/api/`** (Next.js Backend API Routes)
  - `app/api/assess/`:
    - **`route.ts`**: API route handler for processing initial assessment requests.
    - `submit/` → **`route.ts`**: Endpoint for receiving wizard form submissions, triggering the AI engine, and saving results to Supabase.
    - `result/[id]/` → **`route.ts`**: Endpoint for fetching saved assessment recommendation data from the database by ID.

---

## 2. Folder `src/components/` (React UI Components)

### `components/ui/` (General UI Components)
- **`Header.tsx`**: Top navigation header bar component.
- **`MermaidDiagram.tsx`**: Visual renderer component converting Mermaid.js syntax strings into interactive cloud architecture diagrams.

### `components/wizard/` (Multi-Step Assessment Form Components)
- **`ProgressStepper.tsx`**: Step progress indicator (Steps 1 through 6).
- **`DropdownStepWrapper.tsx`**: Reusable UI wrapper for wizard step dropdown fields.
- **`StepProjectPrompt.tsx`**: Initial project summary/prompt description input field.
- **`Step1Workload.tsx`**: Step 1 — Input workload type (Web App, Microservices, ETL, etc.), lifecycle stage, and deployment model.
- **`Step2Traffic.tsx`**: Step 2 — Estimate monthly active users (MAU), traffic pattern shape, and latency tolerance.
- **`Step3Data.tsx`**: Step 3 — Primary data structure, data volume scale, and caching strategy.
- **`Step4Reliability.tsx`**: Step 4 — Target SLA availability uptime and Disaster Recovery (DR) strategy.
- **`Step5Security.tsx`**: Step 5 — Data classification/sensitivity and network exposure level.
- **`Step6Budget.tsx`**: Step 6 — Monthly budget allocation and DevOps team capacity.

### `components/result/` (Visualization & Dashboard Components)
- **`ArchitectureDiagram.tsx`**: Wrapper component for rendering cloud architecture diagrams.
- **`ArchitectureDetail.tsx`**: Detailed breakdown component explaining selected AWS services and architectural rationales.
- **`CostBreakdownChart.tsx`**: Visual chart breaking down estimated monthly/yearly cloud costs by service.
- **`WafRadarChart.tsx`**: Radar chart mapping scores across AWS Well-Architected Framework (WAF) pillars.
- **`WafChecklist.tsx`**: Evaluation checklist verifying compliance against WAF pillars.

---

## 3. Folder `src/lib/` (Core Business Logic, Clients & AI Engine)

### `lib/engine/` (Core Logic & AI Processor)
- **`gemini.ts`**: Google Gemini AI API integration module for analyzing assessment input and generating cloud architecture recommendations with Mermaid syntax.
- **`cost-estimator.ts`**: Calculation algorithm for estimating AWS service costs based on architecture configuration and workload inputs.
- **`waf-scorer.ts`**: Evaluation algorithm scoring AWS Well-Architected Framework pillars.

### `lib/supabase/`
- **`client.ts`**: Supabase client initialization for interacting with the PostgreSQL database backend.

### `lib/validations/`
- **`form-schema.ts`**: Zod validation schema ensuring data integrity of wizard form inputs.

---

## 4. Folder `src/migrations/` (Database Migrations)
- **`sep14.sql`**: SQL migration script creating PostgreSQL/Supabase database tables for assessments and recommendation results.

---

## 5. Folder `src/types/` (TypeScript Interfaces & Types)
- **`database.ts`**: TypeScript type definitions mapping Supabase database schemas and application API payloads.

---

## Application Workflow Summary
1. **User Input**: Users fill out the multi-step wizard (`components/wizard`) on the assessment page (`app/assess/page.tsx`).
2. **Validation**: Input data is validated by the Zod schema (`lib/validations/form-schema.ts`).
3. **Backend Processing**: Data is submitted via API (`app/api/assess/submit/route.ts`), analyzed by Gemini AI (`lib/engine/gemini.ts`), costs are estimated (`lib/engine/cost-estimator.ts`), and WAF scores are computed (`lib/engine/waf-scorer.ts`).
4. **Data Persistence**: Results are stored in the Supabase PostgreSQL database (`lib/supabase/client.ts`).
5. **Visualization**: Users are redirected to the result page (`app/result/[id]/page.tsx`) to view Mermaid diagrams (`components/result/ArchitectureDiagram.tsx`), cost charts (`CostBreakdownChart.tsx`), and Waf Radar metrics (`WafRadarChart.tsx`).
