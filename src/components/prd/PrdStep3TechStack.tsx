"use client";

import { motion } from "framer-motion";
import { DropdownField } from "../wizard/DropdownStepWrapper";
import { PrdFormValues } from "@/lib/validations/prd-schema";

interface Step3Props {
  formData: PrdFormValues;
  updateField: (field: keyof PrdFormValues, val: any) => void;
}

export function PrdStep3TechStack({ formData, updateField }: Step3Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 text-left"
    >
      <div>
        <h2 className="text-xl font-bold text-[#E1DCC9] tracking-tight">Preferred Tech Stack</h2>
        <p className="text-xs text-[#E1DCC9]/70 mt-1">
          Choose the primary technologies you plan to use for your application code. Each option notes what it's
          best suited for, so you can pick with confidence even if you're not deep into infra decisions yet.
        </p>
      </div>

      <DropdownField
        title="Frontend Framework"
        options={[
          {
            value: "Next.js (React)",
            label: "Next.js (React)",
            description: "App Router, SSR, full-stack ready — best default for SaaS, dashboards & SEO-sensitive apps",
          },
          {
            value: "React SPA (Vite)",
            label: "React SPA (Vite)",
            description: "Single Page Application, no SSR — best for internal tools & admin panels behind login",
          },
          {
            value: "Vue.js / Nuxt.js",
            label: "Vue.js / Nuxt.js",
            description: "Progressive JavaScript framework — gentler learning curve, great built-in DX",
          },
          {
            value: "SvelteKit",
            label: "SvelteKit",
            description: "Compiler-based, no virtual DOM — smallest bundles and fastest runtime performance",
          },
          {
            value: "Astro",
            label: "Astro",
            description: "Content-first, islands architecture — best for marketing sites, blogs & docs with minimal JS",
          },
          {
            value: "React Native (Expo)",
            label: "React Native / Expo",
            description: "Cross-platform mobile app — one codebase for iOS + Android",
          },
        ]}
        selectedValue={formData.frontendTech}
        onSelect={(val) => updateField("frontendTech", val)}
      />

      <DropdownField
        title="Backend & Server Layer"
        options={[
          {
            value: "Next.js API Routes",
            label: "Next.js Server Actions / API Routes",
            description: "Unified Node.js full-stack — simplest to ship solo or in a small team",
          },
          {
            value: "Node.js (Express / Fastify)",
            label: "Node.js (Express / Fastify)",
            description: "Dedicated REST/GraphQL server, decoupled from the frontend — more control over infra",
          },
          {
            value: "Python (FastAPI / Django)",
            label: "Python (FastAPI / Django)",
            description: "Great for AI, ML & data-heavy backends — largest data-science ecosystem",
          },
          {
            value: "Go (Gin / Fiber)",
            label: "Go (Gin / Fiber)",
            description: "Compiled, high-concurrency backend — best for low-latency APIs at scale",
          },
          {
            value: "Serverless Functions",
            label: "Serverless (AWS Lambda / Edge)",
            description: "Event-driven, pay-per-use — scales to zero, no server to manage",
          },
          {
            value: "Supabase Edge Functions",
            label: "Supabase Edge Functions",
            description: "Deno-based functions wired directly to your Supabase DB — fastest to ship on that stack",
          },
        ]}
        selectedValue={formData.backendTech}
        onSelect={(val) => updateField("backendTech", val)}
      />

      <DropdownField
        title="Primary Database"
        options={[
          {
            value: "PostgreSQL",
            label: "PostgreSQL",
            description: "Relational, ACID-compliant (Supabase / Neon) — best default for structured, related data",
          },
          {
            value: "MongoDB",
            label: "MongoDB",
            description: "Document NoSQL — best for flexible or rapidly-changing schemas",
          },
          {
            value: "MySQL / MariaDB",
            label: "MySQL / PlanetScale",
            description: "Traditional relational DB — widest hosting compatibility, very mature tooling",
          },
          {
            value: "SQLite / Turso",
            label: "SQLite / Turso (libSQL)",
            description: "Lightweight edge database — best for low-traffic apps and edge-first architecture",
          },
          {
            value: "Redis / Upstash",
            label: "Redis / Upstash",
            description: "In-memory key-value store — pair with a primary DB above for caching, sessions & queues, not as your only database",
          },
          {
            value: "Firebase Firestore",
            label: "Firebase Firestore",
            description: "Realtime NoSQL document DB — best for realtime sync-heavy mobile or web apps",
          },
        ]}
        selectedValue={formData.databaseTech}
        onSelect={(val) => updateField("databaseTech", val)}
      />

      <DropdownField
        title="UI & Styling Framework"
        options={[
          {
            value: "Tailwind CSS + shadcn/ui",
            label: "Tailwind CSS + shadcn/ui",
            description: "Utility-first CSS + accessible component primitives — most popular modern combo, highly customizable",
          },
          {
            value: "Tailwind CSS",
            label: "Pure Tailwind CSS",
            description: "Utility-first CSS only — full design freedom, more components to build by hand",
          },
          {
            value: "MUI / Mantine",
            label: "MUI / Mantine UI",
            description: "Pre-styled Material-inspired components — fast to ship a polished, familiar UI",
          },
          {
            value: "Chakra UI",
            label: "Chakra UI",
            description: "Accessible, themeable component library — simpler theming model than MUI",
          },
          {
            value: "Ant Design",
            label: "Ant Design",
            description: "Enterprise-grade component library — best for admin panels & data-dense dashboards",
          },
          {
            value: "NativeWind (Mobile)",
            label: "NativeWind / Tailwind Mobile",
            description: "Tailwind for React Native — pairs with the Expo frontend option above",
          },
        ]}
        selectedValue={formData.stylingTech}
        onSelect={(val) => updateField("stylingTech", val)}
      />
    </motion.div>
  );
}