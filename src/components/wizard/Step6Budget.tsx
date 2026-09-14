"use client";

import { motion } from "framer-motion";
import { DropdownField } from "./DropdownStepWrapper";
import { FormArchitectValues } from "@/lib/validations/form-schema";

export function Step6Budget({ formData, updateField }: { formData: FormArchitectValues; updateField: any }) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <DropdownField
        title="Estimated Monthly Budget Allocation"
        options={[
          { value: "under_50", label: "< $50 / month", description: "Free-tier focus / Budget friendly" },
          { value: "50_300", label: "$50 – $300 / month", description: "Small to Medium Scale" },
          { value: "300_1500", label: "$300 – $1,500 / month", description: "Production Scale" },
          { value: "over_1500", label: "> $1,500 / month", description: "Enterprise Scale" },
        ]}
        selectedValue={formData.monthlyBudget}
        onSelect={(val) => updateField("monthlyBudget", val)}
      />

      <DropdownField
        title="DevOps Team Capacity"
        options={[
          { value: "none", label: "None (Managed Infrastructure)", description: "Full focus on application coding" },
          { value: "small_team", label: "Small Team / Generalist", description: "Can manage basic Docker/Linux" },
          { value: "dedicated_devops", label: "Dedicated DevOps Team", description: "Ready to manage Terraform / K8s / CI/CD" },
        ]}
        selectedValue={formData.devopsCapacity}
        onSelect={(val) => updateField("devopsCapacity", val)}
      />
    </motion.div>
  );
}
