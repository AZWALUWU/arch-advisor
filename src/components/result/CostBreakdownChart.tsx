"use client";

import { DollarSign, Layers } from "lucide-react";

interface CostBreakdownProps {
  costEstimate: {
    monthlyTotal: { min: number; max: number };
    breakdown: Array<{
      service: string;
      category: string;
      estimatedCost: string;
    }>;
  };
}

export function CostBreakdownChart({ costEstimate }: CostBreakdownProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Estimate Monthly AWS Costs</h3>
          <p className="text-xs text-slate-400">Projected cost range based on your parameters</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl bg-emerald-500/10 px-3 py-1.5 text-emerald-400 border border-emerald-500/20">
          <DollarSign className="h-4 w-4" />
          <span className="text-sm font-bold">
            ${costEstimate.monthlyTotal.min} - ${costEstimate.monthlyTotal.max} / bln
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {costEstimate.breakdown.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 text-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                <Layers className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-white">{item.service}</p>
                <p className="text-xs text-slate-400">{item.category}</p>
              </div>
            </div>
            <span className="font-medium text-orange-400">{item.estimatedCost}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
