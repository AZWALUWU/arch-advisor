"use client";

import { useState } from "react";
import { RoadmapGeneratedResult, RoadmapNode } from "@/lib/engine/roadmap-generator";
import { InteractiveFlowchart } from "./InteractiveFlowchart";
import { PromptNodeModal } from "./PromptNodeModal";
import { Sparkles, ArrowLeft, Download, Copy, Check } from "lucide-react";

interface RoadmapViewProps {
  roadmap: RoadmapGeneratedResult;
  onReset: () => void;
}

export function RoadmapView({ roadmap, onReset }: RoadmapViewProps) {
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyAllPrompts = () => {
    const fullText = roadmap.nodes
      .map(
        (n) =>
          `### [${n.id}] ${n.title}\nCategory: ${n.category} | Branch: ${n.branchType}\nDeliverable: ${n.expectedDeliverable}\n\nAI PROMPT:\n${n.detailedAiPrompt}\n\n---\n`
      )
      .join("\n");

    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-6 text-left w-full">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#412D15] pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#412D15]/40 px-3 py-1 text-xs font-semibold text-[#E1DCC9] ring-1 ring-[#412D15] mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Vibe Coding Flowchart</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#E1DCC9] tracking-tight">
            {roadmap.projectName} Roadmap
          </h1>
          <p className="text-xs text-[#E1DCC9]/60 mt-1 max-w-xl">{roadmap.overview}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleCopyAllPrompts}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#412D15] px-4 py-2.5 text-xs font-semibold text-[#E1DCC9] hover:bg-[#412D15]/70 transition-colors shadow-lg border border-[#E1DCC9]/20"
          >
            {copiedAll ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copiedAll ? "Copied All Prompts!" : "Copy All AI Prompts"}</span>
          </button>

          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#1F150C] px-3.5 py-2.5 text-xs font-medium text-[#E1DCC9]/60 hover:text-[#E1DCC9] transition-colors border border-[#412D15]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Import Another PRD</span>
          </button>
        </div>
      </div>

      {/* Main Flowchart & Node Selection */}
      <InteractiveFlowchart
        mermaidGraph={roadmap.mermaidGraph}
        nodes={roadmap.nodes}
        onSelectNode={(node) => setSelectedNode(node)}
      />

      {/* Modal Window */}
      <PromptNodeModal node={selectedNode} onClose={() => setSelectedNode(null)} />
    </div>
  );
}
