"use client";

import { motion } from "framer-motion";
import { DropdownField } from "./DropdownStepWrapper";
import { FormArchitectValues } from "@/lib/validations/form-schema";

export function Step2Traffic({ formData, updateField }: { formData: FormArchitectValues; updateField: any }) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <DropdownField
        title="Estimated Monthly Traffic (MAU)"
        options={[
          { value: "low_10k", label: "< 10,000 MAU", description: "Low / Early Stage" },
          { value: "med_100k", label: "10,000 – 100,000 MAU", description: "Medium" },
          { value: "high_1m", label: "100,000 – 1,000,000 MAU", description: "High" },
          { value: "enterprise_1m_plus", label: "> 1,000,000 MAU", description: "Enterprise Scale" },
        ]}
        selectedValue={formData.monthlyActiveUsers}
        onSelect={(val) => updateField("monthlyActiveUsers", val)}
      />

      <DropdownField
        title="Traffic Pattern Characteristics"
        options={[
          { value: "steady", label: "Constant / Steady", description: "Predictable workload" },
          { value: "spiky", label: "Spiky / Rapid Fluctuations", description: "Spikes during specific peak hours" },
          { value: "seasonal", label: "Seasonal", description: "Periodic events / promotions" },
          { value: "unpredictable", label: "Unpredictable", description: "Can spike at any time" },
        ]}
        selectedValue={formData.trafficShape}
        onSelect={(val) => updateField("trafficShape", val)}
      />

      <DropdownField
        title="Latency Tolerance"
        options={[
          { value: "ultra_low", label: "Ultra Low Latency (< 50ms)", description: "Gaming / Real-time API" },
          { value: "standard", label: "Standard Web Latency (100–500ms)", description: "Standard Web Application" },
          { value: "async_ok", label: "Asynchronous OK (> 1s)", description: "Background Processing" },
        ]}
        selectedValue={formData.latencyRequirement}
        onSelect={(val) => updateField("latencyRequirement", val)}
      />
    </motion.div>
  );
}
