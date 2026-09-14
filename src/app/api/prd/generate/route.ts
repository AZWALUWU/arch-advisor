import { NextRequest, NextResponse } from "next/server";
import { prdFormSchema } from "@/lib/validations/prd-schema";
import { generatePrdInsight } from "@/lib/engine/prd-generator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validate PRD Form Inputs using Zod
    const validationResult = prdFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation Error", details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    // 2. Generate PRD document using Gemini AI Engine
    const prdResult = await generatePrdInsight(formData);

    // 3. Return generated PRD JSON data
    return NextResponse.json({
      success: true,
      data: prdResult,
    });
  } catch (error: any) {
    console.error("PRD Generation Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message || "Failed to generate PRD" },
      { status: 500 }
    );
  }
}
