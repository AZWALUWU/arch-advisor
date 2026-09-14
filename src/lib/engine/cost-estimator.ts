import { FormArchitectValues } from "@/lib/validations/form-schema";

export interface CostBreakdownItem {
  service: string;
  category: string;
  estimatedCost: string;
}

export interface CostEstimateResult {
  monthlyTotal: { min: number; max: number };
  breakdown: CostBreakdownItem[];
}

export function calculateCostEstimate(input: FormArchitectValues): CostEstimateResult {
  const breakdown: CostBreakdownItem[] = [];
  let minTotal = 0;
  let maxTotal = 0;

  // 1. Compute Cost
  if (input.deploymentModel === "serverless") {
    if (input.monthlyActiveUsers === "low_10k") {
      breakdown.push({ service: "AWS Lambda & API Gateway", category: "Compute & API", estimatedCost: "$0 - $15 / bln" });
      minTotal += 0;
      maxTotal += 15;
    } else if (input.monthlyActiveUsers === "med_100k") {
      breakdown.push({ service: "AWS Lambda & API Gateway", category: "Compute & API", estimatedCost: "$20 - $60 / bln" });
      minTotal += 20;
      maxTotal += 60;
    } else {
      breakdown.push({ service: "AWS Lambda & API Gateway", category: "Compute & API", estimatedCost: "$80 - $250 / bln" });
      minTotal += 80;
      maxTotal += 250;
    }
  } else if (input.deploymentModel === "containers") {
    breakdown.push({ service: "AWS Fargate (ECS) + ALB", category: "Compute & Load Balancer", estimatedCost: "$45 - $180 / bln" });
    minTotal += 45;
    maxTotal += 180;
  } else {
    breakdown.push({ service: "Amazon EC2 (t4g.medium/large)", category: "Virtual Machines", estimatedCost: "$35 - $120 / bln" });
    minTotal += 35;
    maxTotal += 120;
  }

  // 2. Database Cost
  if (input.primaryDataType === "relational") {
    if (input.dataScale === "under_10gb") {
      breakdown.push({ service: "Amazon RDS PostgreSQL (db.t4g.micro)", category: "Database", estimatedCost: "$18 - $30 / bln" });
      minTotal += 18;
      maxTotal += 30;
    } else {
      breakdown.push({ service: "Amazon Aurora PostgreSQL Multi-AZ", category: "Database", estimatedCost: "$60 - $250 / bln" });
      minTotal += 60;
      maxTotal += 250;
    }
  } else if (input.primaryDataType === "nosql_kv") {
    breakdown.push({ service: "Amazon DynamoDB (Pay-per-request)", category: "Database", estimatedCost: "$5 - $40 / bln" });
    minTotal += 5;
    maxTotal += 40;
  } else {
    breakdown.push({ service: "Amazon S3 + Athena / Redshift Serverless", category: "Storage & Analytics", estimatedCost: "$25 - $150 / bln" });
    minTotal += 25;
    maxTotal += 150;
  }

  // 3. Security & Networking Cost
  if (input.dataClassification === "financial_pci" || input.dataClassification === "healthcare_hipaa") {
    breakdown.push({ service: "AWS WAF + KMS + GuardDuty", category: "Security & Compliance", estimatedCost: "$15 - $50 / bln" });
    minTotal += 15;
    maxTotal += 50;
  }
  
  if (input.cachingStrategy === "full_stack" || input.cachingStrategy === "cdn_only") {
    breakdown.push({ service: "Amazon CloudFront (CDN)", category: "Edge Networking", estimatedCost: "$5 - $25 / bln" });
    minTotal += 5;
    maxTotal += 25;
  }

  return {
    monthlyTotal: { min: minTotal, max: maxTotal },
    breakdown,
  };
}
