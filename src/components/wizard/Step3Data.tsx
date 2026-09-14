"use client";

import { motion } from "framer-motion";
import { DropdownField } from "./DropdownStepWrapper";
import { FormArchitectValues } from "@/lib/validations/form-schema";

export function Step3Data({ formData, updateField }: { formData: FormArchitectValues; updateField: any }) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <DropdownField
        title="Primary Data Structure"
        options={[
          { value: "relational", label: "Relational (PostgreSQL / MySQL)", description: "ACID Transactions" },
          { value: "nosql_kv", label: "NoSQL / Key-Value", description: "Schema Flexibility (DynamoDB)" },
          { value: "object_file", label: "File & Media Storage", description: "Images / Videos / Documents (S3)" },
          { value: "in_memory", label: "In-Memory Cache", description: "Redis / Memcached" },
          { value: "analytics_bigdata", label: "Analytics / Big Data", description: "Data Lake & Warehouse" },
        ]}
        selectedValue={formData.primaryDataType}
        onSelect={(val) => updateField("primaryDataType", val)}
      />

      <DropdownField
        title="Data Scale"
        options={[
          { value: "under_10gb", label: "< 10 GB", description: "Small Capacity" },
          { value: "10gb_500gb", label: "10 GB – 500 GB", description: "Medium Capacity" },
          { value: "500gb_5tb", label: "500 GB – 5 TB", description: "Large Capacity" },
          { value: "over_5tb", label: "> 5 TB", description: "Big Data" },
        ]}
        selectedValue={formData.dataScale}
        onSelect={(val) => updateField("dataScale", val)}
      />

      <DropdownField
        title="Caching Strategy"
        options={[
          { value: "none", label: "No Caching", description: "Direct to DB" },
          { value: "db_only", label: "Database Caching Only", description: "Redis / ElastiCache" },
          { value: "cdn_only", label: "CDN / Edge Caching Only", description: "CloudFront Static Cache" },
          { value: "full_stack", label: "Full-Stack Caching", description: "Edge CDN + Redis DB Caching" },
        ]}
        selectedValue={formData.cachingStrategy}
        onSelect={(val) => updateField("cachingStrategy", val)}
      />
    </motion.div>
  );
}
