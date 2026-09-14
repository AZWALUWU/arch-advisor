import { FormArchitectValues } from "@/lib/validations/form-schema";

export interface WafScores {
  operationalExcellence: number;
  security: number;
  reliability: number;
  performanceEfficiency: number;
  costOptimization: number;
  sustainability: number;
}

export function calculateWafScores(input: FormArchitectValues): WafScores {
  let operationalExcellence = 70;
  let security = 70;
  let reliability = 70;
  let performanceEfficiency = 70;
  let costOptimization = 70;
  let sustainability = 70;

  // Security Scoring Logic
  if (input.dataClassification === "financial_pci" || input.dataClassification === "healthcare_hipaa") {
    security += 20;
  }
  if (input.networkExposure === "isolated_vpc") security += 10;

  // Reliability Scoring Logic
  if (input.availabilitySla === "sla_99_99" || input.availabilitySla === "sla_99_999") {
    reliability += 20;
  }
  if (input.disasterRecovery === "active_active" || input.disasterRecovery === "warm_standby") {
    reliability += 10;
  }

  // Cost Optimization Logic
  if (input.deploymentModel === "serverless") {
    costOptimization += 15;
    sustainability += 15;
  }
  if (input.monthlyBudget === "under_50") costOptimization += 10;

  // Performance Logic
  if (input.cachingStrategy === "full_stack") performanceEfficiency += 20;
  if (input.latencyRequirement === "ultra_low") performanceEfficiency += 10;

  // Operational Excellence Logic
  if (input.devopsCapacity === "dedicated_devops") operationalExcellence += 20;
  if (input.devopsCapacity === "none") operationalExcellence -= 15;

  const clamp = (val: number) => Math.min(100, Math.max(30, val));

  return {
    operationalExcellence: clamp(operationalExcellence),
    security: clamp(security),
    reliability: clamp(reliability),
    performanceEfficiency: clamp(performanceEfficiency),
    costOptimization: clamp(costOptimization),
    sustainability: clamp(sustainability),
  };
}
