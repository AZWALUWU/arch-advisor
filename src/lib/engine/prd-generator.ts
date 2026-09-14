import { GoogleGenerativeAI } from "@google/generative-ai";
import { PrdFormValues } from "@/lib/validations/prd-schema";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export interface PrdGeneratedResult {
  title: string;
  tagline: string;
  executiveSummary: string;
  targetAudience: string;
  problemStatement: string;
  mvpFeatures: Array<{
    featureName: string;
    description: string;
    userStory: string;
    acceptanceCriteria: string[];
    priority: "Must Have" | "Should Have" | "Nice to Have";
  }>;
  outOfScopeV1: string[];
  techStackArchitecture: {
    frontend: string;
    backend: string;
    database: string;
    styling: string;
    integrations: Array<{
      serviceName: string;
      category: string;
      purpose: string;
    }>;
  };
  dataModelDraft: Array<{
    entityName: string;
    fields: string[];
    relationships: string;
  }>;
  vibeCodingRoadmap: Array<{
    stepNumber: number;
    stepTitle: string;
    aiPromptSnippet: string;
    expectedDeliverable: string;
  }>;
  fullMarkdownContent: string;
}

export async function generatePrdInsight(formData: PrdFormValues): Promise<PrdGeneratedResult> {
  const model = genAI.getGenerativeModel({
    model: "gemini-3.6-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const prompt = `
  You are an elite Product Manager, Tech Lead, and Vibe Coding Architect.
  Generate an actionable, production-ready Product Requirement Document (PRD) tailored for an MVP (Minimum Viable Product).
  This document will be used by vibe coders, AI coding assistants (like Cursor, Antigravity, Claude, Windsurf), and founders to build the app from scratch.

  USER PRD INPUT:
  ${JSON.stringify(formData, null, 2)}

  YOUR TASK:
  Generate a pure JSON response matching the following TypeScript interface structure without any markdown formatting or code block wrapper outside the JSON object:
  {
    "title": "Application Name PRD",
    "tagline": "A concise 1-sentence tagline describing the app",
    "executiveSummary": "Executive overview of 3-4 sentences summarizing the vision and core MVP scope.",
    "targetAudience": "Detailed breakdown of primary target user personas.",
    "problemStatement": "Clear definition of the problem being solved.",
    "mvpFeatures": [
      {
        "featureName": "Feature Name",
        "description": "Brief summary of what this feature does",
        "userStory": "As a [user], I want [action] so that [benefit]",
        "acceptanceCriteria": ["Criteria 1", "Criteria 2", "Criteria 3"],
        "priority": "Must Have"
      }
    ],
    "outOfScopeV1": [
      "Feature deferred to v2",
      "Feature deferred to v2"
    ],
    "techStackArchitecture": {
      "frontend": "Selected frontend technology & justification",
      "backend": "Selected backend technology & justification",
      "database": "Selected database & schema strategy",
      "styling": "Selected UI framework",
      "integrations": [
        {
          "serviceName": "Selected SaaS/PaaS/BaaS (e.g. Supabase / Clerk / Stripe / Resend)",
          "category": "Auth / Database / Payments / Email / Hosting / AI",
          "purpose": "How it is integrated into the MVP"
        }
      ]
    },
    "dataModelDraft": [
      {
        "entityName": "User / Post / Transaction / etc.",
        "fields": ["id: UUID", "email: String", "created_at: Timestamp"],
        "relationships": "Relationship description (e.g., 1-to-many with Posts)"
      }
    ],
    "vibeCodingRoadmap": [
      {
        "stepNumber": 1,
        "stepTitle": "Project Setup & Base Architecture",
        "aiPromptSnippet": "Exact prompt copy for AI Coding Assistant (e.g., 'Initialize a Next.js 15 app with Tailwind CSS, TypeScript, and Supabase client...')",
        "expectedDeliverable": "Working baseline app with database connection"
      }
    ],
    "fullMarkdownContent": "Complete, beautifully formatted GitHub Markdown PRD containing all sections above with headers, tables, code blocks, and check-lists ready to save as PRD.md."
  }
  `;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  return JSON.parse(responseText) as PrdGeneratedResult;
}
