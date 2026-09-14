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
    <div className="rounded-2xl border border-[#412D15] bg-[#1F150C]/60 p-6 backdrop-blur-sm">
      <div className="border-b border-[#412D15] pb-4 mb-4">
        <h3 className="text-lg font-bold text-[#E1DCC9]">WAF 6 Pillars Alignment</h3>
        <p className="text-xs text-[#E1DCC9]/60">Architecture alignment score (0 - 100)</p>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#412D15" />
            <PolarAngleAxis dataKey="pillar" stroke="#E1DCC9" tick={{ fill: "#E1DCC9", fontSize: 11, opacity: 0.7 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#412D15" />
            <Radar
              name="WAF Score"
              dataKey="score"
              stroke="#E1DCC9"
              fill="#412D15"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
