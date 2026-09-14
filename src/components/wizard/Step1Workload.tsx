"use client";

import { motion } from "framer-motion";
import { DropdownField } from "./DropdownStepWrapper";
import { FormArchitectValues } from "@/lib/validations/form-schema";

interface StepProps {
  formData: FormArchitectValues;
  updateField: (field: keyof FormArchitectValues, val: any) => void;
}

export function Step1Workload({ formData, updateField }: StepProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <DropdownField
        title="Application / Workload Type"
        options={[
          { value: "web_app", label: "Web Application", description: "SSR / SPA / Monolith" },
          { value: "mobile_backend", label: "Mobile App Backend", description: "REST / GraphQL APIs" },
          { value: "api_microservices", label: "API Microservices", description: "Distributed Systems" },
          { value: "batch_processing", label: "Batch Data Processing", description: "ETL / Scheduled Jobs" },
          { value: "realtime_streaming", label: "Real-time Streaming", description: "IoT / Live Data" },
        ]}
        selectedValue={formData.workloadType}
        onSelect={(val) => updateField("workloadType", val)}
      />

      <DropdownField
        title="Lifecycle Stage"
        options={[
          { value: "mvp", label: "Prototype / MVP", description: "Focus on release speed" },
          { value: "early_production", label: "Early Production", description: "Has initial active users" },
          { value: "scaling", label: "Production Scaling", description: "Rapid growth" },
          { value: "migration", label: "Legacy Migration", description: "Migrating from on-premise/other provider" },
        ]}
        selectedValue={formData.lifecycleStage}
        onSelect={(val) => updateField("lifecycleStage", val)}
      />

      <DropdownField
        title="Primary Deployment Model"
        options={[
          { value: "serverless", label: "Serverless / Event-Driven", description: "AWS Lambda / App Runner" },
          { value: "containers", label: "Containers (Docker)", description: "AWS ECS Fargate / EKS" },
          { value: "ec2_vm", label: "Virtual Machines", description: "Amazon EC2 Instances" },
          { value: "hybrid", label: "Hybrid", description: "Serverless + Containers" },
        ]}
        selectedValue={formData.deploymentModel}
        onSelect={(val) => updateField("deploymentModel", val)}
      />
    </motion.div>
  );
}
