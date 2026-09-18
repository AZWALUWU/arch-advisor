import { z } from "zod";

export const roadmapFormSchema = z.object({
  prdContent: z
    .string()
    .min(30, "PRD content must be at least 30 characters.")
    .max(100000, "PRD content is too long (max 100,000 characters)."),
  focusPreference: z.enum(["balanced", "speed_mvp", "enterprise_robust"]).default("balanced"),
});

export type RoadmapFormValues = z.infer<typeof roadmapFormSchema>;
