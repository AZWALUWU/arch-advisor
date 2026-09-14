import { z } from "zod";

export const formArchitectSchema = z.object({
  // Step 0: User Prompt
  projectDescription: z
    .string()
    .min(15, "Deskripsi proyek minimal 15 karakter.")
    .max(1000, "Deskripsi proyek maksimal 1000 karakter."),

  // Step 1: Workload
  workloadType: z.enum([
    "web_app",
    "mobile_backend",
    "api_microservices",
    "batch_processing",
    "realtime_streaming",
  ]),
  lifecycleStage: z.enum(["mvp", "early_production", "scaling", "migration"]),
  deploymentModel: z.enum(["serverless", "containers", "ec2_vm", "hybrid"]),

  // Step 2: Traffic
  monthlyActiveUsers: z.enum(["low_10k", "med_100k", "high_1m", "enterprise_1m_plus"]),
  trafficShape: z.enum(["steady", "spiky", "seasonal", "unpredictable"]),
  latencyRequirement: z.enum(["ultra_low", "standard", "async_ok"]),

  // Step 3: Data
  primaryDataType: z.enum([
    "relational",
    "nosql_kv",
    "object_file",
    "in_memory",
    "analytics_bigdata",
  ]),
  dataScale: z.enum(["under_10gb", "10gb_500gb", "500gb_5tb", "over_5tb"]),
  cachingStrategy: z.enum(["none", "db_only", "cdn_only", "full_stack"]),

  // Step 4: Reliability
  availabilitySla: z.enum(["sla_99", "sla_99_9", "sla_99_99", "sla_99_999"]),
  disasterRecovery: z.enum(["backup_restore", "pilot_light", "warm_standby", "active_active"]),

  // Step 5: Security
  dataClassification: z.enum(["public", "internal_pii", "financial_pci", "healthcare_hipaa"]),
  networkExposure: z.enum(["fully_public", "hybrid_private_backend", "isolated_vpc"]),

  // Step 6: Budget & Operations
  monthlyBudget: z.enum(["under_50", "50_300", "300_1500", "over_1500"]),
  devopsCapacity: z.enum(["none", "small_team", "dedicated_devops"]),
});

export type FormArchitectValues = z.infer<typeof formArchitectSchema>;
