import { GoogleGenerativeAI } from "@google/generative-ai";
import { RoadmapFormValues } from "@/lib/validations/roadmap-schema";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

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
  const model = genAI.getGenerativeModel({
    model: "gemini-3.6-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

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

  JSON OUTPUT SCHEMA (Respond strictly with pure JSON matching this structure without markdown code blocks):
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

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  return JSON.parse(responseText) as RoadmapGeneratedResult;
}
