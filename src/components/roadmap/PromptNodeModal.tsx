"use client";

import { useState } from "react";
import { X, Copy, Check, Sparkles, GitBranch } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#412D15] bg-[#1F150C] p-6 shadow-2xl space-y-5 text-left text-[#E1DCC9]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-[#E1DCC9]/70 hover:bg-[#412D15] hover:text-[#E1DCC9] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#412D15] px-2.5 py-0.5 text-xs font-bold text-[#E1DCC9] border border-[#412D15] font-mono">
              {node.id}
            </span>
            <span className="rounded-md bg-[#412D15] px-2.5 py-0.5 text-xs font-semibold text-[#E1DCC9] border border-[#E1DCC9]/20">
              <GitBranch className="h-3 w-3 inline mr-1" />
              {node.branchType}
            </span>
            <span className="text-xs font-medium text-[#E1DCC9]/80 bg-[#000000]/60 px-2.5 py-0.5 rounded-md border border-[#412D15]">
              {node.category}
            </span>
          </div>

          <h2 className="text-xl font-extrabold text-[#E1DCC9] tracking-tight leading-snug">
            {node.title}
          </h2>
        </div>

        {/* Dependencies & Deliverables */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl border border-[#412D15] bg-[#000000]/60 p-3.5 space-y-1">
            <span className="font-semibold text-[#E1DCC9]/60 uppercase tracking-wider text-[10px]">
              Prerequisites & Dependencies
            </span>
            <p className="text-[#E1DCC9] font-mono">
              {node.dependencies?.length > 0
                ? node.dependencies.join(", ")
                : "None (Baseline Step)"}
            </p>
          </div>

          <div className="rounded-xl border border-[#412D15] bg-[#000000]/60 p-3.5 space-y-1">
            <span className="font-semibold text-[#E1DCC9] uppercase tracking-wider text-[10px]">
              Expected Deliverable
            </span>
            <p className="text-[#E1DCC9]">{node.expectedDeliverable}</p>
          </div>
        </div>

        {/* AI Coding Prompt Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#E1DCC9] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#E1DCC9]" />
              Detailed AI Vibe Coding Prompt
            </label>
            <button
              onClick={handleCopyPrompt}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#412D15] px-3.5 py-1.5 text-xs font-semibold text-[#E1DCC9] hover:bg-[#000000] border border-[#412D15] transition-all shadow-md"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied to Clipboard!" : "Copy Prompt"}</span>
            </button>
          </div>

          <div className="relative rounded-xl border border-[#412D15] bg-[#000000] p-4 text-xs font-mono text-[#E1DCC9] whitespace-pre-wrap leading-relaxed max-h-[250px] overflow-y-auto shadow-inner">
            {node.detailedAiPrompt}
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="text-[11px] text-[#E1DCC9]/70 flex items-center justify-between border-t border-[#412D15] pt-4">
          <span>Copy and paste this prompt into Cursor, Antigravity, or Claude Code.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#000000] text-[#E1DCC9] hover:bg-[#412D15] transition-colors font-medium border border-[#412D15]"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
