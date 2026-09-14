import { FormArchitectValues } from "@/lib/validations/form-schema";

export interface EvaluationRecord {
  id: string;
  created_at: string;
  project_description: string;
  form_inputs: FormArchitectValues;
  ai_output: {
    executiveSummary: string;
    tailoredMermaidSyntax: string;
    tradeoffAnalysis: string;
    wafChecklist: Array<{
      category: "Security" | "Scalability" | "Cost" | "Reliability" | "Performance" | "Operations";
      item: string;
      severity: "critical" | "high" | "medium" | "low";
    }>;
  };
  cost_estimate: {
    monthlyTotal: { min: number; max: number };
    breakdown: Array<{
      service: string;
      category: string;
      estimatedCost: string;
    }>;
  };
  waf_scores: {
    operationalExcellence: number;
    security: number;
    reliability: number;
    performanceEfficiency: number;
    costOptimization: number;
    sustainability: number;
  };
  is_public: boolean;
}
