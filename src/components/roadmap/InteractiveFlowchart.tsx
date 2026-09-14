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
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-orange-400" />
              Interactive Vibe Coding Branching Flowchart
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Visualizes main setup paths, feature branches, and optional extensions. Click any node below to retrieve its detailed AI prompt.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">
            {nodes.length} Roadmap Nodes
          </span>
        </div>

        <div className="w-full overflow-x-auto py-2 flex justify-center bg-slate-950/80 rounded-xl border border-slate-800/80">
          <MermaidDiagram chart={mermaidGraph} />
        </div>
      </div>

      {/* Node Selection Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Select a Node to Open Detailed AI Prompt
            </h3>
            <p className="text-xs text-slate-400">
              Click any step node below to open the popup prompt modal window.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-orange-500 text-white font-semibold"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
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
                    ? "bg-orange-500 text-white font-semibold"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
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
              className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900/80 p-4 hover:border-orange-500/60 hover:bg-slate-900 hover:shadow-lg hover:shadow-orange-500/5 transition-all space-y-2.5 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-orange-500/10 px-2 py-0.5 text-xs font-bold text-orange-400 border border-orange-500/20 font-mono">
                    {node.id}
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                      node.branchType === "Main Path"
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : node.branchType === "Alternative Branch"
                        ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {node.branchType}
                  </span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-orange-400 transition-colors" />
              </div>

              <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors leading-snug">
                {node.title}
              </h4>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {node.expectedDeliverable}
              </p>

              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/60 text-slate-400">
                <span>{node.category}</span>
                <span className="text-orange-400 font-semibold flex items-center gap-1 group-hover:underline">
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
