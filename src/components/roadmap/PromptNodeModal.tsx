"use client";

import { useState } from "react";
import { X, Copy, Check, Sparkles, GitBranch, ArrowRight, Code } from "lucide-react";
import { RoadmapNode } from "@/lib/engine/roadmap-generator";

interface PromptNodeModalProps {
  node: RoadmapNode | null;
  onClose: () => void;
}

export function PromptNodeModal({ node, onClose }: PromptNodeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!node) return null;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(node.detailedAiPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-orange-500/10 px-2.5 py-0.5 text-xs font-bold text-orange-400 ring-1 ring-orange-500/20 font-mono">
              {node.id}
            </span>
            <span
              className={`rounded-md px-2.5 py-0.5 text-xs font-semibold ${
                node.branchType === "Main Path"
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : node.branchType === "Alternative Branch"
                  ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              }`}
            >
              <GitBranch className="h-3 w-3 inline mr-1" />
              {node.branchType}
            </span>
            <span className="text-xs font-medium text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-md">
              {node.category}
            </span>
          </div>

          <h2 className="text-xl font-extrabold text-white tracking-tight leading-snug">
            {node.title}
          </h2>
        </div>

        {/* Dependencies & Deliverables */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-1">
            <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
              Prerequisites & Dependencies
            </span>
            <p className="text-slate-200 font-mono">
              {node.dependencies?.length > 0
                ? node.dependencies.join(", ")
                : "None (Baseline Step)"}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-1">
            <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[10px]">
              Expected Deliverable
            </span>
            <p className="text-slate-200">{node.expectedDeliverable}</p>
          </div>
        </div>

        {/* AI Coding Prompt Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              Detailed AI Vibe Coding Prompt
            </label>
            <button
              onClick={handleCopyPrompt}
              className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-orange-500 transition-all shadow-md shadow-orange-600/20"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied to Clipboard!" : "Copy Prompt"}</span>
            </button>
          </div>

          <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[250px] overflow-y-auto shadow-inner">
            {node.detailedAiPrompt}
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-4">
          <span>Copy and paste this prompt into Cursor, Antigravity, or Claude Code.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors font-medium"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
