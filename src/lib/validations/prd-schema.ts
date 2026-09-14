import { z } from "zod";

export const prdFormSchema = z.object({
  // Step 1: Concept & Overview
  appName: z.string().min(2, "App name must be at least 2 characters."),
  appSummary: z
    .string()
    .min(15, "App summary must be at least 15 characters.")
    .max(1000, "App summary cannot exceed 1000 characters."),
  targetAudience: z.string().min(3, "Please specify your target audience."),
  problemStatement: z.string().min(10, "Please describe the core problem solved."),

  // Step 2: Core MVP Features
  coreFeatures: z
    .array(z.string())
    .min(1, "Please select or add at least one core MVP feature."),
  customFeatures: z.string().optional(),

  // Step 3: Tech Stack Preferences
  frontendTech: z.string().min(1, "Please select a frontend technology."),
  backendTech: z.string().min(1, "Please select a backend technology."),
  databaseTech: z.string().min(1, "Please select a database technology."),
  stylingTech: z.string().min(1, "Please select a UI/styling framework."),

  // Step 4: SaaS / PaaS / BaaS Integrations
  services: z.array(z.string()).default([]),
  additionalNotes: z.string().optional(),
});

export type PrdFormValues = z.infer<typeof prdFormSchema>;
