import { generateText } from "ai";
import { openrouter, DEFAULT_MODEL } from "./openrouter";
import { FormArchitectValues } from "@/lib/validations/form-schema";
import { AiOutput } from "@/types/database";

export async function generateArchitectInsight(
  formData: FormArchitectValues
): Promise<AiOutput> {
  const systemDesignContext = `
=== SYSTEM DESIGN & ARCHITECTURE KNOWLEDGE BASE ===

FREE-TIER SERVICES (for early-stage / low-traffic layers):
- Upstash        → Serverless Redis (caching, rate limiting, pub-sub) + Kafka – free tier
- Supabase       → PostgreSQL, realtime, storage, edge functions – free tier
- Neon           → Serverless PostgreSQL with branching – free tier
- Clerk          → Authentication & user management – free up to 10k MAU
- Stripe         → Payments & billing – pay-per-use
- RevenueCat     → Mobile in-app subscriptions – free up to $10k MRR
- PostHog        → Product analytics & feature flags – free up to 1M events/month
- Sentry         → Error monitoring & performance – free tier
- Vercel         → Web hosting & serverless functions – free hobby tier
- Cloudflare     → CDN, DNS, DDoS protection, WAF, Workers – free tier

AWS SERVICES FOR PAID / HIGH-SCALE PRODUCTION:
- Compute: EC2, ECS Fargate, Lambda, Elastic Beanstalk, App Runner
- Database: RDS Aurora (PostgreSQL/MySQL), DynamoDB, ElastiCache (Redis/Memcached), DocumentDB
- Networking: VPC, ALB/NLB, Route 53, CloudFront (CDN), API Gateway
- Storage: S3, EFS, EBS
- Messaging / Queuing: SQS, SNS, EventBridge, MSK (Kafka), Kinesis
- Security: IAM, Cognito, WAF, Shield, Secrets Manager, KMS, GuardDuty
- Observability: CloudWatch, X-Ray, AWS Config, CloudTrail
- ML / AI: Bedrock, SageMaker, Rekognition, Comprehend

DATABASE SELECTION GUIDE:
- Relational (RDS Aurora / Supabase / Neon): structured data, ACID transactions, JOIN-heavy queries → user profiles, orders, financials
- Non-Relational:
  • Key-Value (ElastiCache Redis / Upstash): caching, sessions, rate limiting – sub-millisecond latency
  • Document (DynamoDB / MongoDB): flexible JSON documents, high throughput, variable schemas
  • Wide-Column (Cassandra): massive write throughput, time-series, analytics
  • Graph (Neptune / Neo4j): recommendation engines, social graphs, fraud detection

SCALABILITY PATTERNS:
- Vertical Scaling: increase CPU/RAM on one server – simple, limited, single point of failure
- Horizontal Scaling: multiple servers behind a load balancer – fault-tolerant, preferred for production
- Load Balancer Algorithms: Round Robin, Least Connections, IP Hash, Weighted, Geographical, Consistent Hashing
- Health Checks: ALB/NLB polls targets; unhealthy targets removed from rotation automatically
- Avoid SPOF: multi-AZ deployments, redundant LBs, Aurora Multi-AZ, read replicas, self-healing Auto Scaling Groups
- Caching Strategy: CDN (CloudFront) → Application Cache (ElastiCache) → DB Query Cache – minimise round trips
- Async Processing: offload heavy tasks to SQS + Lambda/ECS workers to prevent request timeouts

API DESIGN:
- REST: stateless, resource-based (/api/v1/resources/{id}), HTTP verbs (GET/POST/PUT/PATCH/DELETE), versioned endpoints (/api/v1/), pagination (?page=1&limit=20), proper status codes (2xx/3xx/4xx/5xx)
- GraphQL: single endpoint, client-specified queries, mutations for writes – reduces over/under-fetching
- gRPC: bidirectional streaming via protocol buffers – ideal for internal microservice communication
- API Gateway: managed throttling, request validation, caching, auth integration (Cognito/JWT)

COMMUNICATION PROTOCOLS:
- HTTPS + TLS 1.3: all external traffic encrypted; enforce via CloudFront / ALB
- WebSockets (API Gateway WebSocket / AppSync): real-time bidirectional (chat, live dashboards, notifications)
- SQS / SNS / EventBridge: async decoupling – producers and consumers scale independently
- TCP: reliable ordered delivery | UDP: low-latency lossy (video streaming, gaming)

AUTHENTICATION & AUTHORIZATION:
- JWT / Bearer Tokens: stateless; validate at API Gateway or application layer
- OAuth 2.0 + OIDC: federated identity (Google, GitHub, Apple) via Cognito or Clerk
- Access Token (15m) + Refresh Token (30d): short-lived access, silent renewal
- RBAC: role-based permissions (Admin/User/Viewer)
- ABAC: attribute-based fine-grained access (department, IP, time)
- IAM Roles: least-privilege principle for all AWS service-to-service access

AWS WELL-ARCHITECTED SECURITY CHECKLIST:
- Rate Limiting: WAF rate-based rules + API Gateway throttling (per-IP and per-key)
- CORS: allowlist trusted origins at CloudFront or API Gateway
- SQL Injection / XSS: WAF managed rule groups + parameterized queries / ORMs
- Encryption at Rest: RDS/S3/EBS encrypted via KMS; customer-managed keys for sensitive data
- Encryption in Transit: TLS 1.2+ enforced on all ALBs, CloudFront, and RDS connections
- Secrets Management: Secrets Manager or Parameter Store (never hardcode credentials)
- VPC Isolation: private subnets for databases and internal services; NAT Gateway for outbound
- DDoS Protection: AWS Shield Standard (free) or Shield Advanced; CloudFront absorbs volumetric attacks
- CSRF: CSRF tokens on state-changing endpoints; SameSite cookie policy
- Audit Logging: CloudTrail for API calls, VPC Flow Logs for network traffic, GuardDuty for threat detection
=== END SYSTEM DESIGN KNOWLEDGE BASE===
`;

  const prompt = `
  You are a senior AWS Principal Solutions Architect with deep expertise in system design, scalability, and the AWS Well-Architected Framework. Analyze the following system requirements and provide comprehensive, production-grade architecture recommendations.

  ${systemDesignContext}

  INSTRUCTIONS:
  - Recommend AWS services for a paid/scalable production architecture AND call out free-tier alternatives (Supabase, Upstash, Clerk, Vercel, Cloudflare) where they are cost-effective for the described scale.
  - Apply the correct database selection (relational vs non-relational) based on the data access patterns described.
  - Address SPOF risks: recommend multi-AZ, redundant load balancers, and Auto Scaling Groups.
  - Include caching layers (CloudFront CDN + ElastiCache) where appropriate to reduce latency.
  - Use async messaging (SQS/SNS/EventBridge) for workloads that benefit from decoupling.
  - All tailoredMermaidSyntax must be valid Mermaid graph TD syntax visualizing the complete AWS architecture including VPC, subnets, load balancers, compute, databases, caching, CDN, and security layers.
  - The wafChecklist must cover all 6 AWS Well-Architected pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability.

  SYSTEM REQUIREMENTS INPUT:
  ${JSON.stringify(formData, null, 2)}

  YOUR TASK:
  Generate pure JSON according to the following schema without any additional text outside the JSON:
  {
    "executiveSummary": "Executive summary of 3-4 sentences covering architecture style, scale assumptions, and key design decisions.",
    "tailoredMermaidSyntax": "Valid Mermaid.js syntax (graph TD) visualizing AWS components including VPC, subnets, ALB, compute, database, cache, CDN, and security layers.",
    "serviceRecommendations": [
      {
        "serviceName": "Service Name (e.g., AWS Lambda / ECS Fargate / Amazon Aurora)",
        "category": "Category (e.g., Compute / Database / Networking / Security / Messaging)",
        "rationale": "Detailed reason for choosing this service based on input parameters, scale, and access patterns.",
        "alternativesConsidered": "Other alternatives considered (including free-tier options like Supabase/Upstash/Vercel) and reasons for not selecting them at this scale."
      }
    ],
    "tradeoffs": [
      {
        "decision": "Key architecture decision (e.g., Serverless vs Provisioned Container / SQL vs NoSQL)",
        "pros": "Main advantages of this decision for the described use case",
        "cons": "Consequences or limitations of this decision"
      }
    ],
    "scalabilityStrategy": "In-depth explanation of the strategy for handling traffic spikes, autoscaling policies, caching layers, database read replicas, and async queue-based load levelling.",
    "securityStrategy": "In-depth explanation covering encryption at rest and in transit, IAM least-privilege roles, VPC isolation with private subnets, WAF + Shield DDoS protection, Secrets Manager usage, and audit logging with CloudTrail and GuardDuty.",
    "wafChecklist": [
      {
        "category": "Security | Reliability | Performance | Cost Optimization | Operational Excellence | Sustainability",
        "item": "Recommended practical step aligned with AWS Well-Architected Framework",
        "severity": "critical | high | medium | low"
      }
    ]
  }
  `;

  const { text } = await generateText({
    model: openrouter.chat(DEFAULT_MODEL),
    prompt,
  });

  return JSON.parse(text) as AiOutput;
}
