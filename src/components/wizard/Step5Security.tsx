"use client";

import { motion } from "framer-motion";
import { DropdownField } from "./DropdownStepWrapper";
import { FormArchitectValues } from "@/lib/validations/form-schema";

export function Step5Security({ formData, updateField }: { formData: FormArchitectValues; updateField: any }) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <DropdownField
        title="Data Classification & Sensitivity"
        options={[
          { value: "public", label: "Public / Non-sensitive", description: "General open data" },
          { value: "internal_pii", label: "Standard User Data (PII)", description: "Email / Basic Profile" },
          { value: "financial_pci", label: "Financial Data (PCI-DSS)", description: "Transactions / Credit Cards" },
          { value: "healthcare_hipaa", label: "Healthcare Data (HIPAA)", description: "Sensitive Medical Records" },
        ]}
        selectedValue={formData.dataClassification}
        onSelect={(val) => updateField("dataClassification", val)}
      />

      <DropdownField
        title="Network Exposure"
        options={[
          { value: "fully_public", label: "Fully Public API / Web", description: "Directly accessible" },
          { value: "hybrid_private_backend", label: "Hybrid (Private Backend)", description: "Backend in Private Subnet" },
          { value: "isolated_vpc", label: "Isolated / Private VPC", description: "VPN / Internal access only" },
        ]}
        selectedValue={formData.networkExposure}
        onSelect={(val) => updateField("networkExposure", val)}
      />
    </motion.div>
  );
}
