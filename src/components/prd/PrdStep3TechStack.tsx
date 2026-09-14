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
          Choose the primary technologies you plan to use for your application code.
        </p>
      </div>

      <DropdownField
        title="Frontend Framework"
        options={[
          { value: "Next.js (React)", label: "Next.js (React)", description: "App Router, SSR, Full-stack ready" },
          { value: "React SPA (Vite)", label: "React SPA (Vite)", description: "Single Page Application with Vite" },
          { value: "React Native (Expo)", label: "React Native / Expo", description: "Cross-platform Mobile App" },
          { value: "Vue.js / Nuxt", label: "Vue.js / Nuxt.js", description: "Progressive JavaScript Framework" },
        ]}
        selectedValue={formData.frontendTech}
        onSelect={(val) => updateField("frontendTech", val)}
      />

      <DropdownField
        title="Backend & Server Layer"
        options={[
          { value: "Next.js API Routes", label: "Next.js Server Actions / API Routes", description: "Unified Node.js full-stack" },
          { value: "Node.js (Express / Fastify)", label: "Node.js (Express / Fastify)", description: "Dedicated REST/GraphQL Server" },
          { value: "Python (FastAPI / Django)", label: "Python (FastAPI / Django)", description: "Great for AI & Data Processing" },
          { value: "Serverless Functions", label: "Serverless (AWS Lambda / Edge)", description: "Event-driven serverless APIs" },
        ]}
        selectedValue={formData.backendTech}
        onSelect={(val) => updateField("backendTech", val)}
      />

      <DropdownField
        title="Primary Database"
        options={[
          { value: "PostgreSQL", label: "PostgreSQL", description: "Relational ACID DB (Supabase / Neon)" },
          { value: "MongoDB", label: "MongoDB", description: "Document NoSQL Database" },
          { value: "MySQL / MariaDB", label: "MySQL / PlanetScale", description: "Traditional Relational DB" },
          { value: "SQLite / Turso", label: "SQLite / Turso (LibSQL)", description: "Lightweight Edge Database" },
        ]}
        selectedValue={formData.databaseTech}
        onSelect={(val) => updateField("databaseTech", val)}
      />

      <DropdownField
        title="UI & Styling Framework"
        options={[
          { value: "Tailwind CSS + shadcn/ui", label: "Tailwind CSS + shadcn/ui", description: "Modern, customizable component primitives" },
          { value: "Tailwind CSS", label: "Pure Tailwind CSS", description: "Utility-first CSS framework" },
          { value: "MUI / Mantine", label: "MUI / Mantine UI", description: "Pre-styled component library" },
          { value: "NativeWind (Mobile)", label: "NativeWind / Tailwind Mobile", description: "Tailwind for React Native" },
        ]}
        selectedValue={formData.stylingTech}
        onSelect={(val) => updateField("stylingTech", val)}
      />
    </motion.div>
  );
}
