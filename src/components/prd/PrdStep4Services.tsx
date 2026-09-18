"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PrdFormValues } from "@/lib/validations/prd-schema";

interface Step4Props {
  formData: PrdFormValues;
  updateField: (field: keyof PrdFormValues, val: any) => void;
}

/**
 * Services below are cross-checked against free-for.dev and each provider's
 * current pricing page. Only services with a standing, non-expiring free
 * tier are included — no one-time trial credits, no "free for 30 days"
 * offers. Where a free tier requires a credit card, that is called out
 * explicitly so users aren't surprised later.
 */
const SAAS_SERVICES_LIST = [
  {
    category: "Backend, Database & BaaS",
    items: [
      {
        id: "supabase",
        label: "Supabase",
        desc: "Open-source Firebase alternative (PostgreSQL, Auth, Storage, Edge Functions). Free tier: 500MB DB, 5GB bandwidth, 50k MAU — no credit card required.",
      },
      {
        id: "firebase",
        label: "Firebase (Spark Plan)",
        desc: "Google NoSQL Firestore, Auth, Analytics & Cloud Messaging. Spark plan is free indefinitely with generous daily quotas — no credit card required.",
      },
      {
        id: "neon",
        label: "Neon",
        desc: "Serverless Postgres with database branching. Free tier: 0.5GB storage, 10 branches — no credit card required.",
      },
      {
        id: "turso",
        label: "Turso (libSQL)",
        desc: "Edge-hosted SQLite. Free tier: 500 databases, 9GB total storage, 1B row reads/month — no credit card required.",
      },
    ],
  },
  {
    category: "Authentication",
    items: [
      {
        id: "clerk",
        label: "Clerk Auth",
        desc: "Complete user management, social logins, and multi-tenancy UI. Free tier: up to 10,000 MAU — no credit card required.",
      },
      {
        id: "authjs",
        label: "Auth.js (NextAuth)",
        desc: "Open-source authentication library for Next.js. Self-hosted, 100% free forever — no usage caps, no account or card needed.",
      },
    ],
  },
  {
    category: "Hosting & Infrastructure (PaaS)",
    items: [
      {
        id: "vercel",
        label: "Vercel (Hobby)",
        desc: "Frontend & serverless deployment for Next.js. Free Hobby tier: 100GB bandwidth/month — no credit card required.",
      },
      {
        id: "cloudflare",
        label: "Cloudflare Pages & Workers",
        desc: "Static hosting + edge compute. Free tier: unlimited sites, 100k Worker requests/day — no credit card required.",
      },
      {
        id: "render",
        label: "Render",
        desc: "Free web services & static sites, 750 instance hours/month — no credit card required (free web services spin down after inactivity).",
      },
      {
        id: "aws",
        label: "AWS (Amazon Web Services)",
        desc: "Full-scale cloud infrastructure (S3, EC2, Lambda, RDS). 12-month + \"Always Free\" limits, but a credit card is required at signup and overage is billed — best once you outgrow the fully-free options above.",
      },
    ],
  },
  {
    category: "Cache, Queue & Rate Limiting",
    items: [
      {
        id: "upstash_redis",
        label: "Upstash Redis",
        desc: "Serverless Redis for caching & rate limiting. Free tier: 500k commands/month, 256MB — no credit card required.",
      },
      {
        id: "upstash_qstash",
        label: "Upstash QStash / Kafka",
        desc: "Serverless message queue & scheduling. Free tier: 500 messages/day — no credit card required.",
      },
    ],
  },
  {
    category: "Monitoring & Analytics",
    items: [
      {
        id: "sentry",
        label: "Sentry",
        desc: "Error monitoring & performance tracing. Free tier: 5,000 errors/month, 1 team member — no credit card required.",
      },
      {
        id: "posthog",
        label: "PostHog",
        desc: "Product analytics & feature flags. Free tier: up to 1M events/month — no credit card required.",
      },
    ],
  },
  {
    category: "Payments & Commerce",
    items: [
      {
        id: "stripe",
        label: "Stripe",
        desc: "Global payment processing, subscriptions & billing portal. No monthly fee — pay only a small % per successful transaction.",
      },
      {
        id: "midtrans",
        label: "Midtrans / Xendit",
        desc: "Southeast Asia local payment gateway & e-wallet checkout. Same pay-per-transaction model, no monthly cost to integrate.",
      },
      {
        id: "lemonsqueezy",
        label: "Lemon Squeezy",
        desc: "Merchant of record for SaaS digital subscriptions & tax compliance. Transaction-fee based, no monthly cost.",
      },
    ],
  },
  {
    category: "Email & AI APIs",
    items: [
      {
        id: "resend",
        label: "Resend / React Email",
        desc: "Modern transactional email API with React templates. Free tier: 3,000 emails/month, 100/day — no credit card required.",
      },
      {
        id: "openrouter_api",
        label: "OpenRouter API",
        desc: "Unified AI gateway — one API key for hundreds of LLM models. Several models are available on a permanent free (\":free\") tier with daily rate limits — no credit card required to start.",
      },
      {
        id: "gemini_api",
        label: "Google Gemini API",
        desc: "Gemini Flash models via Google AI Studio. Standing free tier with generous daily request limits — no credit card required.",
      },
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
        <h2 className="text-xl font-bold text-[#E1DCC9] tracking-tight">SaaS, PaaS & BaaS Services</h2>
        <p className="text-xs text-[#E1DCC9]/70 mt-1">
          Select third-party cloud services and APIs to speed up your MVP development. Every entry below has a
          standing free tier — not a one-time trial credit — and we note where a card is required.
        </p>
      </div>

      <div className="space-y-5">
        {SAAS_SERVICES_LIST.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-2">
            <h3 className="text-xs font-semibold text-[#E1DCC9] uppercase tracking-wider">
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
                        ? "border-[#E1DCC9] bg-[#412D15] text-[#E1DCC9] ring-1 ring-[#E1DCC9]"
                        : "border-[#412D15] bg-[#1F150C]/80 text-[#E1DCC9]/80 hover:border-[#E1DCC9]/50 hover:bg-[#1F150C]"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                        isSelected
                          ? "border-[#E1DCC9] bg-[#E1DCC9] text-[#000000]"
                          : "border-[#412D15] bg-[#000000]"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    <div>
                      <span className="text-xs font-medium block">{srv.label}</span>
                      <span className="text-[11px] text-[#E1DCC9]/70 block mt-0.5">{srv.desc}</span>
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
        <label className="block text-xs font-semibold text-[#E1DCC9] mb-1.5">
          Additional Notes / Specific Instructions (Optional)
        </label>
        <textarea
          rows={2}
          value={formData.additionalNotes || ""}
          onChange={(e) => updateField("additionalNotes", e.target.value)}
          placeholder="Any specific architectural preferences or third-party SDKs to include..."
          className="w-full rounded-xl border border-[#412D15] bg-[#1F150C] p-3 text-sm text-[#E1DCC9] placeholder-[#E1DCC9]/40 focus:border-[#E1DCC9] focus:outline-none focus:ring-1 focus:ring-[#E1DCC9] resize-none"
        />
      </div>
    </motion.div>
  );
}