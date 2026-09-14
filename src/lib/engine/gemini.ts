import { GoogleGenerativeAI } from "@google/generative-ai";
import { FormArchitectValues } from "@/lib/validations/form-schema";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateArchitectInsight(formData: FormArchitectValues) {
  const model = genAI.getGenerativeModel({
    model: "gemini-3.6-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const prompt = `
  You are a senior AWS Principal Solutions Architect. Analyze the following system requirements and provide in-depth AWS Well-Architected Framework architecture recommendations.

  SYSTEM REQUIREMENTS INPUT:
  ${JSON.stringify(formData, null, 2)}

  YOUR TASK:
  Generate pure JSON according to the following schema without any additional text outside the JSON:
  {
    "executiveSummary": "Executive summary of 3-4 sentences.",
    "tailoredMermaidSyntax": "Valid Mermaid.js syntax (graph TD) visualizing AWS components.",
    "serviceRecommendations": [
      {
        "serviceName": "Service Name (e.g., AWS Lambda / ECS Fargate / Amazon Aurora)",
        "category": "Category (e.g., Compute / Database / Networking)",
        "rationale": "Detailed reason for choosing this service based on input parameters.",
        "alternativesConsidered": "Other alternatives considered and reasons for not selecting them."
      }
    ],
    "tradeoffs": [
      {
        "decision": "Key architecture decision (e.g., Serverless vs Provisioned Container)",
        "pros": "Main advantages of this decision",
        "cons": "Consequences or limitations of this decision"
      }
    ],
    "scalabilityStrategy": "In-depth explanation of the strategy for handling traffic spikes and autoscaling.",
    "securityStrategy": "In-depth explanation of the encryption, IAM, VPC isolation, and WAF/Shield protection strategy.",
    "wafChecklist": [
      {
        "category": "Security | Scalability | Performance | Cost",
        "item": "Recommended practical step",
        "severity": "critical | high | medium | low"
      }
    ]
  }
  `;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  return JSON.parse(responseText);
}
