"use client";

import { motion } from "framer-motion";
import { PrdFormValues } from "@/lib/validations/prd-schema";

interface Step1Props {
  formData: PrdFormValues;
  updateField: (field: keyof PrdFormValues, val: any) => void;
}

export function PrdStep1Concept({ formData, updateField }: Step1Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 text-left"
    >
      <div>
        <h2 className="text-xl font-bold text-[#E1DCC9] tracking-tight">App Concept & Overview</h2>
        <p className="text-xs text-[#E1DCC9]/70 mt-1">
          Tell us about the application you want to build for your MVP launch.
        </p>
      </div>

      <div className="space-y-4">
        {/* App Name */}
        <div>
          <label className="block text-xs font-semibold text-[#E1DCC9] mb-1.5">
            Application / Project Name <span className="text-[#E1DCC9]">*</span>
          </label>
          <input
            type="text"
            value={formData.appName}
            onChange={(e) => updateField("appName", e.target.value)}
            placeholder="e.g. Acme SaaS, Flash Commerce, Vibe Workspace"
            className="w-full rounded-xl border border-[#412D15] bg-[#1F150C] px-4 py-3 text-sm text-[#E1DCC9] placeholder-[#E1DCC9]/40 focus:border-[#E1DCC9] focus:outline-none focus:ring-1 focus:ring-[#E1DCC9]"
          />
        </div>

        {/* App Summary */}
        <div>
          <label className="block text-xs font-semibold text-[#E1DCC9] mb-1.5">
            App Vision & Summary <span className="text-[#E1DCC9]">*</span>
          </label>
          <textarea
            rows={3}
            value={formData.appSummary}
            onChange={(e) => updateField("appSummary", e.target.value)}
            placeholder="Describe what your app does in a few sentences. e.g. An AI-powered workspace platform that turns raw ideas into production code roadmaps..."
            className="w-full rounded-xl border border-[#412D15] bg-[#1F150C] p-3.5 text-sm text-[#E1DCC9] placeholder-[#E1DCC9]/40 focus:border-[#E1DCC9] focus:outline-none focus:ring-1 focus:ring-[#E1DCC9] resize-none"
          />
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-xs font-semibold text-[#E1DCC9] mb-1.5">
            Target Audience / Users <span className="text-[#E1DCC9]">*</span>
          </label>
          <input
            type="text"
            value={formData.targetAudience}
            onChange={(e) => updateField("targetAudience", e.target.value)}
            placeholder="e.g. Solo founders, Vibe Coders, Freelancers, E-commerce shoppers"
            className="w-full rounded-xl border border-[#412D15] bg-[#1F150C] px-4 py-3 text-sm text-[#E1DCC9] placeholder-[#E1DCC9]/40 focus:border-[#E1DCC9] focus:outline-none focus:ring-1 focus:ring-[#E1DCC9]"
          />
        </div>

        {/* Problem Statement */}
        <div>
          <label className="block text-xs font-semibold text-[#E1DCC9] mb-1.5">
            Core Problem Solved <span className="text-[#E1DCC9]">*</span>
          </label>
          <textarea
            rows={2}
            value={formData.problemStatement}
            onChange={(e) => updateField("problemStatement", e.target.value)}
            placeholder="What main friction or problem does this app solve for your target users?"
            className="w-full rounded-xl border border-[#412D15] bg-[#1F150C] p-3.5 text-sm text-[#E1DCC9] placeholder-[#E1DCC9]/40 focus:border-[#E1DCC9] focus:outline-none focus:ring-1 focus:ring-[#E1DCC9] resize-none"
          />
        </div>
      </div>
    </motion.div>
  );
}
