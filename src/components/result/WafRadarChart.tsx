"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface WafRadarChartProps {
  scores: {
    operationalExcellence: number;
    security: number;
    reliability: number;
    performanceEfficiency: number;
    costOptimization: number;
    sustainability: number;
  };
}

export function WafRadarChart({ scores }: WafRadarChartProps) {
  const data = [
    { pillar: "Security", score: scores.security },
    { pillar: "Reliability", score: scores.reliability },
    { pillar: "Performance", score: scores.performanceEfficiency },
    { pillar: "Cost Opt.", score: scores.costOptimization },
    { pillar: "Operations", score: scores.operationalExcellence },
    { pillar: "Sustainability", score: scores.sustainability },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
      <div className="border-b border-slate-800 pb-4 mb-4">
        <h3 className="text-lg font-bold text-white">WAF 6 Pillars Alignment</h3>
        <p className="text-xs text-slate-400">Architecture alignment score (0 - 100)</p>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis dataKey="pillar" stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
            <Radar
              name="WAF Score"
              dataKey="score"
              stroke="#f97316"
              fill="#f97316"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
