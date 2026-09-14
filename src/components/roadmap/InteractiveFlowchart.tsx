"use client";

import React, { useState } from "react";
import { MermaidDiagram } from "../ui/MermaidDiagram";
import { RoadmapNode } from "@/lib/engine/roadmap-generator";
import { GitBranch, Sparkles, ArrowUpRight, CheckCircle2 } from "lucide-react";

interface InteractiveFlowchartProps {
  mermaidGraph: string;
  nodes: RoadmapNode[];
  onSelectNode: (node: RoadmapNode) => void;
}

export function InteractiveFlowchart({
  mermaidGraph,
  nodes,
  onSelectNode,
}: InteractiveFlowchartProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = Array.from(new Set(nodes.map((n) => n.category)));

  const filteredNodes =
    activeCategory === "all"
      ? nodes
      : nodes.filter((n) => n.category === activeCategory);

  return (
    <div className="space-y-6 w-full text-left">
      {/* Mermaid Diagram Card */}
      <div className="rounded-2xl border border-[#412D15] bg-[#1F150C]/60 p-6 backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#412D15] pb-3">
          <div>
            <h3 className="text-sm font-bold text-[#E1DCC9] uppercase tracking-wider flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-[#E1DCC9]/70" />
              Interactive Vibe Coding Branching Flowchart
            </h3>
            <p className="text-xs text-[#E1DCC9]/60 mt-0.5">
              Visualizes main setup paths, feature branches, and optional extensions. Click any node below to retrieve its detailed AI prompt.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-[#E1DCC9] bg-[#412D15]/40 px-2.5 py-1 rounded-full border border-[#412D15]">
            {nodes.length} Roadmap Nodes
          </span>
        </div>

        <div className="w-full overflow-x-auto py-2 flex justify-center bg-[#000000]/80 rounded-xl border border-[#412D15]/80">
          <MermaidDiagram chart={mermaidGraph} />
        </div>
      </div>

      {/* Node Selection Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-[#E1DCC9] uppercase tracking-wider">
              Select a Node to Open Detailed AI Prompt
            </h3>
            <p className="text-xs text-[#E1DCC9]/60">
              Click any step node below to open the popup prompt modal window.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-[#412D15] text-[#E1DCC9] font-semibold border border-[#E1DCC9]/30"
                  : "bg-[#1F150C] text-[#E1DCC9]/60 hover:text-[#E1DCC9] border border-[#412D15]"
              }`}
            >
              All ({nodes.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#412D15] text-[#E1DCC9] font-semibold border border-[#E1DCC9]/30"
                    : "bg-[#1F150C] text-[#E1DCC9]/60 hover:text-[#E1DCC9] border border-[#412D15]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredNodes.map((node) => (
            <div
              key={node.id}
              onClick={() => onSelectNode(node)}
              className="group cursor-pointer rounded-xl border border-[#412D15] bg-[#1F150C]/80 p-4 hover:border-[#E1DCC9]/40 hover:bg-[#412D15]/40 hover:shadow-lg transition-all space-y-2.5 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-[#412D15]/60 px-2 py-0.5 text-xs font-bold text-[#E1DCC9] border border-[#412D15] font-mono">
                    {node.id}
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                      node.branchType === "Main Path"
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : node.branchType === "Alternative Branch"
                        ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        : "bg-[#412D15]/60 text-[#E1DCC9]/70 border border-[#412D15]"
                    }`}
                  >
                    {node.branchType}
                  </span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#E1DCC9]/40 group-hover:text-[#E1DCC9] transition-colors" />
              </div>

              <h4 className="text-sm font-bold text-[#E1DCC9] group-hover:text-[#E1DCC9] transition-colors leading-snug">
                {node.title}
              </h4>

              <p className="text-xs text-[#E1DCC9]/60 line-clamp-2 leading-relaxed">
                {node.expectedDeliverable}
              </p>

              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#412D15]/60 text-[#E1DCC9]/50">
                <span>{node.category}</span>
                <span className="text-[#E1DCC9]/70 font-semibold flex items-center gap-1 group-hover:underline">
                  <Sparkles className="h-3 w-3" /> View AI Prompt
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
