"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PrdFormValues } from "@/lib/validations/prd-schema";

interface Step4Props {
  formData: PrdFormValues;
  updateField: (field: keyof PrdFormValues, val: any) => void;
}

const SAAS_SERVICES_LIST = [
  {
    category: "BaaS & Database",
    items: [
      { id: "supabase", label: "Supabase", desc: "Open-source Firebase alternative (PostgreSQL, Auth, Storage, Edge Functions)" },
      { id: "firebase", label: "Firebase", desc: "Google NoSQL Firestore, Auth, Analytics & Cloud Messaging" },
      { id: "planetscale", label: "PlanetScale / Neon", desc: "Serverless Postgres / MySQL DB with branchable migrations" },
    ],
  },
  {
    category: "Authentication",
    items: [
      { id: "clerk", label: "Clerk Auth", desc: "Complete user management, social logins, and multi-tenancy UI" },
      { id: "authjs", label: "Auth.js (NextAuth)", desc: "Flexible open-source authentication library for Next.js" },
    ],
  },
  {
    category: "Hosting & Infrastructure (PaaS)",
    items: [
      { id: "vercel", label: "Vercel", desc: "Frontend & Serverless deployment platform for Next.js" },
      { id: "railway", label: "Railway / Fly.io", desc: "Containerized app hosting & instant Postgres/Redis deployment" },
      { id: "aws", label: "AWS (Amazon Web Services)", desc: "Full-scale cloud infrastructure (S3, EC2, Lambda, RDS)" },
    ],
  },
  {
    category: "Payments & Commerce",
    items: [
      { id: "stripe", label: "Stripe", desc: "Global payment processing, subscriptions & billing portal" },
      { id: "midtrans", label: "Midtrans / Xendit", desc: "Southeast Asia local payment gateway & e-wallet checkout" },
      { id: "lemonsqueezy", label: "Lemon Squeezy", desc: "Merchant of record for SaaS digital subscriptions & tax compliance" },
    ],
  },
  {
    category: "Email & AI APIs",
    items: [
      { id: "resend", label: "Resend / React Email", desc: "Modern transactional email API with React templates" },
      { id: "gemini_api", label: "Google Gemini AI API", desc: "Multimodal LLM API for AI features & text generation" },
      { id: "openai_api", label: "OpenAI API (GPT-4o)", desc: "Conversational AI, embeddings & code execution" },
    ],
  },
];

export function PrdStep4Services({ formData, updateField }: Step4Props) {
  const toggleService = (serviceLabel: string) => {
    const current = formData.services || [];
    if (current.includes(serviceLabel)) {
      updateField(
        "services",
        current.filter((s) => s !== serviceLabel)
      );
    } else {
      updateField("services", [...current, serviceLabel]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 text-left"
    >
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">SaaS, PaaS & BaaS Services</h2>
        <p className="text-xs text-slate-400 mt-1">
          Select third-party cloud services and APIs to speed up your MVP development.
        </p>
      </div>

      <div className="space-y-5">
        {SAAS_SERVICES_LIST.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-2">
            <h3 className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
              {group.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {group.items.map((srv) => {
                const isSelected = formData.services?.includes(srv.label);
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => toggleService(srv.label)}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-orange-500 bg-orange-500/10 text-white ring-1 ring-orange-500"
                        : "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                        isSelected
                          ? "border-orange-500 bg-orange-500 text-white"
                          : "border-slate-700 bg-slate-800"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    <div>
                      <span className="text-xs font-medium block">{srv.label}</span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">{srv.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-xs font-semibold text-slate-200 mb-1.5">
          Additional Notes / Specific Instructions (Optional)
        </label>
        <textarea
          rows={2}
          value={formData.additionalNotes || ""}
          onChange={(e) => updateField("additionalNotes", e.target.value)}
          placeholder="Any specific architectural preferences or third-party SDKs to include..."
          className="w-full rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-sm text-slate-100 placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none"
        />
      </div>
    </motion.div>
  );
}
