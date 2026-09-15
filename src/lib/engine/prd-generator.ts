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

  const systemDesignContext = `
=== SYSTEM DESIGN & ARCHITECTURE KNOWLEDGE BASE ===

PREFERRED TECH STACK:
- Mobile App: React Native, Expo, NativeWind, TypeScript
- Web App: React, Next.js, Tailwind CSS + ShadcnUI, TypeScript
- Database: Relational (PostgreSQL via Supabase/Neon) + Non-Relational (Redis via Upstash) where appropriate

FREE-TIER SERVICES CATALOGUE (always prefer these for MVP integrations):
- Stripe         → Payments & billing (free tier, pay-per-use)
- RevenueCat     → Mobile in-app purchases & subscription management (free up to $10k MRR)
- Upstash        → Serverless Redis (rate limiting, caching, queues) + Kafka – free tier
- Clerk          → Authentication & user management – free up to 10k MAU
- Supabase       → PostgreSQL database, realtime, storage, edge functions – free tier
- Neon           → Serverless PostgreSQL with branching – free tier
- PostHog        → Product analytics & feature flags – free up to 1M events/month
- Sentry         → Error monitoring & performance tracing – free tier
- Vercel         → Web hosting & serverless functions – free hobby tier
- Cloudflare     → CDN, DNS, DDoS protection, Workers – free tier
FOR PAID / HIGH-SCALE: Amazon Web Services (EC2, ECS Fargate, RDS Aurora, ElastiCache, S3, CloudFront, SQS, API Gateway, Lambda, WAF, Shield)

DATABASE SELECTION GUIDE:
- Relational (PostgreSQL – Supabase/Neon): structured data with clear relationships, ACID transactions, JOIN-heavy queries → financial data, user profiles, orders
- Non-Relational:
  • Document (MongoDB): flexible/nested JSON documents, rapidly changing schemas
  • Wide-Column (Cassandra): massive write throughput, time-series data
  • Graph (Neo4j): recommendation engines, social graphs
  • Key-Value (Redis/Upstash): session storage, caching, rate limiting, pub-sub – sub-millisecond latency

SCALABILITY PATTERNS:
- Vertical Scaling (Scale Up): increase CPU/RAM on one server – simple but has a ceiling and single point of failure
- Horizontal Scaling (Scale Out): add more servers behind a load balancer – fault-tolerant, preferred for production
- Load Balancer Algorithms: Round Robin, Least Connections, Least Response Time, IP Hash, Weighted, Geographical, Consistent Hashing
- Health Checks: LB polls servers; unhealthy servers are removed from rotation automatically
- Avoid Single Points of Failure (SPOF): redundant load balancers, multi-AZ databases, self-healing systems

API DESIGN:
- REST: stateless, resource-based (/api/v1/products/{id}), HTTP verbs (GET/POST/PUT/PATCH/DELETE), proper status codes (2xx/3xx/4xx/5xx), versioned endpoints (/api/v1/), pagination (?page=1&limit=20)
- GraphQL: single endpoint, client-specified queries (no over/under-fetching), mutations for writes, errors returned in "errors" array with HTTP 200
- gRPC: bidirectional streaming, protocol buffers, ideal for internal microservice communication
- API Best Practices: plural noun resource names, consistent naming, Zod validation, rate limiting, CORS policy, versioning

COMMUNICATION PROTOCOLS:
- HTTP/HTTPS + TLS: standard request/response with encryption
- WebSockets: persistent bidirectional connection for real-time features (chat, notifications, live dashboards)
- AMQP / Message Queues (Upstash Kafka/QStash): async task processing, decouple producers from consumers, handle traffic spikes
- TCP: reliable ordered delivery (banking, messaging) | UDP: low-latency lossy (gaming, video streaming)

AUTHENTICATION & AUTHORIZATION (use Clerk for MVP):
- Bearer Tokens / JWT: stateless, sent in Authorization header
- OAuth 2.0: third-party login (Google, GitHub) → access token + refresh token pattern
- Access Token: short-lived (15m) for API calls | Refresh Token: long-lived (30d) for silent re-auth
- RBAC (Role-Based Access Control): Admin/User/Viewer roles with permission sets
- ABAC (Attribute-Based): fine-grained policies (department, IP range, time-of-day)
- ACL (Access Control List): per-resource permissions (like Google Drive sharing)

API SECURITY CHECKLIST:
- Rate Limiting: enforce per-IP and per-user limits (Upstash Redis sliding window algorithm)
- CORS: allowlist trusted origins only
- SQL Injection Prevention: use ORMs / parameterized queries (never raw string interpolation)
- Web Application Firewall (WAF): block anomalous traffic patterns (Cloudflare WAF free tier)
- CSRF Tokens: protect state-changing endpoints from cross-site forgery
- XSS Prevention: sanitize & escape all user-generated content before rendering
- HTTPS Everywhere: enforce TLS; redirect HTTP to HTTPS (Cloudflare handles this for free)
- Input Validation: validate all inputs server-side with Zod schemas
=== END SYSTEM DESIGN KNOWLEDGE BASE ===
`;

  const prompt = `
  You are an elite Product Manager, Tech Lead, and Vibe Coding Architect with deep knowledge of modern system design.
  Generate an actionable, production-ready Product Requirement Document (PRD) tailored for an MVP (Minimum Viable Product).
  This document will be used by vibe coders, AI coding assistants (like Cursor, Antigravity, Claude, Windsurf), and founders to build the app from scratch.

  ${systemDesignContext}

  INSTRUCTIONS FOR TECH STACK & INTEGRATIONS:
  - Always prefer the free-tier services listed above when recommending integrations for MVP stage.
  - For web apps recommend Next.js + Tailwind CSS + ShadcnUI + TypeScript.
  - For mobile apps recommend React Native + Expo + NativeWind + TypeScript.
  - Choose the right database type (relational vs non-relational) based on the data model described.
  - Apply REST API best practices (versioned endpoints /api/v1/, pagination, proper HTTP verbs, status codes).
  - Include auth via Clerk (free tier), error monitoring via Sentry, analytics via PostHog by default.
  - Add Upstash Redis for rate limiting and caching where relevant.
  - Use Cloudflare for CDN/DNS and Vercel for hosting.
  - Include security considerations (CORS, rate limiting, input validation with Zod, HTTPS) in the roadmap steps.
  - The vibeCodingRoadmap aiPromptSnippet must be a precise, copy-paste-ready prompt an AI coding assistant can execute immediately.

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
      "database": "Selected database & schema strategy (relational vs non-relational decision explained)",
      "styling": "Selected UI framework",
      "integrations": [
        {
          "serviceName": "Service name with tier info (e.g. Clerk – Free up to 10k MAU)",
          "category": "Auth / Database / Payments / Email / Hosting / Monitoring / Analytics / Cache / CDN",
          "purpose": "How it is integrated into the MVP and why it was chosen over alternatives"
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
        "aiPromptSnippet": "Exact prompt copy for AI Coding Assistant (e.g., 'Initialize a Next.js 15 app with Tailwind CSS + ShadcnUI, TypeScript strict mode, Supabase client, and Clerk auth. Set up /api/v1/ REST route structure with Zod validation middleware...')",
        "expectedDeliverable": "Working baseline app with database connection and auth flow"
      }
    ],
    "fullMarkdownContent": "Complete, beautifully formatted GitHub Markdown PRD containing all sections above with headers, tables, code blocks, and check-lists ready to save as PRD.md. Include a Security Considerations section and an Integration Architecture diagram in Mermaid syntax."
  }
  `;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  return JSON.parse(responseText) as PrdGeneratedResult;
}
