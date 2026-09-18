import { generateText } from "ai";
import { openrouter, DEFAULT_MODEL } from "./openrouter";
import { RoadmapFormValues } from "@/lib/validations/roadmap-schema";

export interface RoadmapNode {
  id: string;
  title: string;
  category: string;
  branchType: "Main Path" | "Alternative Branch" | "Optional Extension";
  dependencies: string[];
  detailedAiPrompt: string;
  expectedDeliverable: string;
}

export interface RoadmapGeneratedResult {
  projectName: string;
  overview: string;
  mermaidGraph: string;
  nodes: RoadmapNode[];
}

export async function generateRoadmapInsight(
  formData: RoadmapFormValues
): Promise<RoadmapGeneratedResult> {
  const prompt = `
  You are an expert AI Lead Architect and Vibe Coding Prompt Engineer.
  Given the following Product Requirement Document (PRD) markdown text, generate a non-linear, branching step-by-step Vibe Coding Roadmap and Flowchart.

  INPUT PRD DOCUMENT:
  ${formData.prdContent}

  FOCUS PREFERENCE: ${formData.focusPreference}

  REQUIREMENTS FOR GENERATION:
  1. Non-Linear Branching Flowchart (mermaidGraph):
     - Do NOT generate a simple single straight-line flowchart.
     - Include parallel paths, alternative technical branches (e.g. Auth vs Database, Primary Features vs Optional Extensions), and deployment steps.
     - Use valid Mermaid graph syntax starting with graph TD. Node IDs MUST be simple alphanumeric keys like NODE_1, NODE_2A, NODE_2B, NODE_3, OPT_1, etc.
     - Node labels in Mermaid MUST be wrapped in double quotes, e.g.: NODE_1["Phase 1: App Setup"]
     - Connect nodes with clean directional arrows, e.g.: NODE_1 --> NODE_2A and dotted lines for optional extensions, e.g.: NODE_2A -. Optional .-> OPT_1["Opt: Analytics"].

  2. Detailed Node AI Prompts (nodes):
     - Provide an array of node objects corresponding to EVERY node ID in your Mermaid graph.
     - detailedAiPrompt: MUST BE AN EXTREMELY DETAILED, HIGH-PRECISION PROMPT written for AI Coding Assistants (Cursor, Antigravity, Claude, Windsurf).
     - The prompt must specify:
       - Exact files to create or modify (e.g., src/lib/supabase/client.ts, src/components/auth/LoginForm.tsx)
       - Required TypeScript types, imports, and schemas
       - Component props, state handling, and edge cases
       - Step-by-step verification commands (e.g., npx tsc --noEmit, test instructions)
       - Strict alignment with the features, database types, and tech stack specified in the PRD.

  JSON OUTPUT SCHEMA (respond with ONLY the raw JSON object, no explanation, no markdown fences):
  {
    "projectName": "Extracted Project Name from PRD",
    "overview": "Short 2-sentence summary of the vibe coding implementation strategy.",
    "mermaidGraph": "graph TD\\n  NODE_1[\\"Phase 1: Project & Tech Setup\\"] --> NODE_2A[\\"Phase 2A: Authentication & User Profiles\\"]\\n  NODE_1 --> NODE_2B[\\"Phase 2B: Database & Schema Migration\\"]\\n  NODE_2A --> NODE_3[\\"Phase 3: Core Features MVP\\"]\\n  NODE_2B --> NODE_3\\n  NODE_3 -. Optional .-> OPT_1[\\"Option: Email Notifications\\"]\\n  NODE_3 --> NODE_4[\\"Phase 4: Deployment & CI/CD\\"]",
    "nodes": [
      {
        "id": "NODE_1",
        "title": "Phase 1: Project Initialization & Base Styling",
        "category": "Core Foundation",
        "branchType": "Main Path",
        "dependencies": [],
        "detailedAiPrompt": "Super detailed multi-paragraph prompt with exact file paths, Tailwind config, and dependencies setup...",
        "expectedDeliverable": "Working baseline Next.js repository with configured design tokens and header"
      }
    ]
  }
  `;

  const { text } = await generateText({
    model: openrouter.chat(DEFAULT_MODEL),
    system:
      "You are a JSON-only API. Respond with a single raw JSON object. No markdown fences, no explanation, no commentary, no preamble.",
    prompt,
    maxOutputTokens: 16384,
  });

  console.log("[roadmap-generator] raw AI response (first 500 chars):", text.slice(0, 500));

  let jsonStr = text;

  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    jsonStr = codeBlockMatch[1].trim();
  }

  const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    jsonStr = jsonMatch[0];
  }

  try {
    return JSON.parse(jsonStr) as RoadmapGeneratedResult;
  } catch {
    throw new Error(
      "AI returned invalid JSON. The model may be temporarily unavailable. Please try again."
    );
  }
}
