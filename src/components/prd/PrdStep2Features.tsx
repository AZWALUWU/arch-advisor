"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PrdFormValues } from "@/lib/validations/prd-schema";

interface Step2Props {
  formData: PrdFormValues;
  updateField: (field: keyof PrdFormValues, val: any) => void;
}

const PRESET_MVP_FEATURES = [
  { id: "auth", label: "User Authentication & Profiles", desc: "Sign up, Sign in, Social Login & Profile settings" },
  { id: "dashboard", label: "User Dashboard & Analytics", desc: "Main control panel with metrics & activity overview" },
  { id: "crud", label: "Core Resource CRUD", desc: "Create, Read, Update, Delete main application items" },
  { id: "billing", label: "Subscriptions & Payment Checkout", desc: "Stripe/Midtrans integration for paid plans" },
  { id: "ai_chat", label: "AI Copilot / Chat Assistant", desc: "Integrated LLM chat interface for user guidance" },
  { id: "notifications", label: "Email & In-App Notifications", desc: "Transactional emails and alert triggers" },
  { id: "upload", label: "File & Media Uploads", desc: "Upload images, attachments, or videos to cloud storage" },
  { id: "search_filter", label: "Search & Filtering", desc: "Fast search, categories, and custom data filters" },
];

export function PrdStep2Features({ formData, updateField }: Step2Props) {
  const toggleFeature = (featureLabel: string) => {
    const current = formData.coreFeatures || [];
    if (current.includes(featureLabel)) {
      updateField(
        "coreFeatures",
        current.filter((f) => f !== featureLabel)
      );
    } else {
      updateField("coreFeatures", [...current, featureLabel]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 text-left"
    >
      <div>
        <h2 className="text-xl font-bold text-[#E1DCC9] tracking-tight">MVP Core Features</h2>
        <p className="text-xs text-[#E1DCC9]/70 mt-1">
          Select the essential must-have features for your MVP (version 1.0).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PRESET_MVP_FEATURES.map((feat) => {
          const isSelected = formData.coreFeatures?.includes(feat.label);
          return (
            <button
              key={feat.id}
              type="button"
              onClick={() => toggleFeature(feat.label)}
              className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
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
                <span className="text-xs font-semibold block">{feat.label}</span>
                <span className="text-[11px] text-[#E1DCC9]/70 mt-0.5 block">{feat.desc}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Additional Custom Features */}
      <div>
        <label className="block text-xs font-semibold text-[#E1DCC9] mb-1.5">
          Custom / Specific MVP Features (Optional)
        </label>
        <textarea
          rows={3}
          value={formData.customFeatures || ""}
          onChange={(e) => updateField("customFeatures", e.target.value)}
          placeholder="List any unique or custom business logic features for your application..."
          className="w-full rounded-xl border border-[#412D15] bg-[#1F150C] p-3 text-sm text-[#E1DCC9] placeholder-[#E1DCC9]/40 focus:border-[#E1DCC9] focus:outline-none focus:ring-1 focus:ring-[#E1DCC9] resize-none"
        />
      </div>
    </motion.div>
  );
}
