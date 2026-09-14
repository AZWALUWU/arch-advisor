"use client";

import { motion } from "framer-motion";
import { DropdownField } from "./DropdownStepWrapper";
import { FormArchitectValues } from "@/lib/validations/form-schema";

export function Step4Reliability({ formData, updateField }: { formData: FormArchitectValues; updateField: any }) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <DropdownField
        title="Target Availability (SLA)"
        options={[
          { value: "sla_99", label: "99% Uptime", description: "~7.2 hours downtime/month" },
          { value: "sla_99_9", label: "99.9% Uptime", description: "~43 minutes downtime/month" },
          { value: "sla_99_99", label: "99.99% (High Availability)", description: "Multi-AZ (~4.3 minutes/month)" },
          { value: "sla_99_999", label: "99.999% (Fault Tolerant)", description: "Multi-Region Zero Downtime" },
        ]}
        selectedValue={formData.availabilitySla}
        onSelect={(val) => updateField("availabilitySla", val)}
      />

      <DropdownField
        title="Disaster Recovery (DR) Strategy"
        options={[
          { value: "backup_restore", label: "Basic Backup & Restore", description: "Periodic restoration" },
          { value: "pilot_light", label: "Pilot Light", description: "Minimal core standby" },
          { value: "warm_standby", label: "Warm Standby", description: "Scale-ready replica" },
          { value: "active_active", label: "Multi-Region Active-Active", description: "Zero downtime availability" },
        ]}
        selectedValue={formData.disasterRecovery}
        onSelect={(val) => updateField("disasterRecovery", val)}
      />
    </motion.div>
  );
}
