import { NextRequest, NextResponse } from "next/server";
import { roadmapFormSchema } from "@/lib/validations/roadmap-schema";
import { generateRoadmapInsight } from "@/lib/engine/roadmap-generator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validate Form Input via Zod
    const validationResult = roadmapFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation Error", details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    // 2. Generate Roadmap & Branching Flowchart via Gemini
    const roadmapResult = await generateRoadmapInsight(formData);

    // 3. Return JSON response
    return NextResponse.json({
      success: true,
      data: roadmapResult,
    });
  } catch (error: any) {
    console.error("Roadmap Generation Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message || "Failed to generate roadmap" },
      { status: 500 }
    );
  }
}
