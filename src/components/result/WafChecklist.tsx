"use client";

import { CheckCircle2, AlertTriangle, ShieldAlert, Info } from "lucide-react";

interface WafChecklistProps {
  checklist: Array<{
    category: string;
    item: string;
    severity?: "critical" | "high" | "medium" | "low";
  }>;
}

export function WafChecklist({ checklist }: WafChecklistProps) {
  const getSeverityBadge = (severity?: string) => {
    switch (severity) {
      case "critical":
        return <span className="inline-flex items-center gap-1 rounded bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-400 border border-red-500/20"><ShieldAlert className="h-3 w-3" /> CRITICAL</span>;
      case "high":
        return <span className="inline-flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/20"><AlertTriangle className="h-3 w-3" /> HIGH</span>;
      default:
        return <span className="inline-flex items-center gap-1 rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20"><Info className="h-3 w-3" /> RECOMMENDED</span>;
    }
  };

  return (
    <div className="rounded-2xl border border-[#412D15] bg-[#1F150C]/60 p-6 backdrop-blur-sm">
      <div className="border-b border-[#412D15] pb-4 mb-4">
        <h3 className="text-lg font-bold text-[#E1DCC9]">Well-Architected Actionable Checklist</h3>
        <p className="text-xs text-[#E1DCC9]/60">Prioritized recommendations for architecture improvements</p>
      </div>

      <div className="space-y-3">
        {checklist.map((check, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#000000]/40 border border-[#412D15]/60">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#E1DCC9]/70 uppercase tracking-wider">{check.category}</span>
                {getSeverityBadge(check.severity)}
              </div>
              <p className="text-sm text-[#E1DCC9]/80 leading-relaxed">{check.item}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
