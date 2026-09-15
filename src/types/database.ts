export interface ServiceRecommendation {
  serviceName: string;
  category: string;
  rationale: string;
  alternativesConsidered: string;
}

export interface Tradeoff {
  decision: string;
  pros: string;
  cons: string;
}

export interface WafChecklistItem {
  category: "Security" | "Reliability" | "Performance" | "Cost Optimization" | "Operational Excellence" | "Sustainability";
  item: string;
  severity: "critical" | "high" | "medium" | "low";
}

export interface AiOutput {
  executiveSummary: string;
  tailoredMermaidSyntax: string;
  serviceRecommendations: ServiceRecommendation[];
  tradeoffs: Tradeoff[];
  scalabilityStrategy: string;
  securityStrategy: string;
  wafChecklist: WafChecklistItem[];
}

export interface CostEstimate {
  monthlyTotal: { min: number; max: number };
  breakdown: Array<{
    service: string;
    category: string;
    estimatedCost: string;
  }>;
}

export interface WafScores {
  operationalExcellence: number;
  security: number;
  reliability: number;
  performanceEfficiency: number;
  costOptimization: number;
  sustainability: number;
}
