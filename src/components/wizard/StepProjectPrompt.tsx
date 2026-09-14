"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageSquareText } from "lucide-react";

interface StepProjectPromptProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

export function StepProjectPrompt({ value, onChange, error }: StepProjectPromptProps) {
  const minLength = 15;
  const isEnough = value.trim().length >= minLength;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6 text-left"
    >
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-lg bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400 ring-1 ring-orange-500/20">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Step One: Application Context</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Describe the application you want to build
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          Provide an overview of your system (e.g., key features, target users, or specific requirements). This description will be processed by Gemini AI to deliver precise architecture recommendations.
        </p>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={5}
            placeholder="Example: I want to build an e-commerce platform with a flash sale system. The app has a Node.js backend, requires a relational database for transactions, and storage for promotional videos/images..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/90 p-4 text-sm text-slate-100 placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all resize-none shadow-inner"
          />
          <MessageSquareText className="absolute right-4 bottom-4 h-5 w-5 text-slate-600 pointer-events-none" />
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className={error ? "text-red-400 font-medium" : ""}>
            {error || (isEnough ? "Description is precise enough." : `Minimum ${minLength} characters.`)}
          </span>
          <span className={isEnough ? "text-emerald-400" : "text-slate-500"}>
            {value.length}/1000 characters
          </span>
        </div>
      </div>
    </motion.div>
  );
}
