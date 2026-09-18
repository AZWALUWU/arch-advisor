import { NextRequest, NextResponse } from "next/server";
import { formArchitectSchema } from "@/lib/validations/form-schema";
import { calculateWafScores } from "@/lib/engine/waf-scorer";
import { generateArchitectInsight } from "@/lib/engine/architect";
import { calculateCostEstimate } from "@/lib/engine/cost-estimator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validationResult = formArchitectSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid form input", details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    const [wafScores, costEstimate, aiOutput] = await Promise.all([
      calculateWafScores(formData),
      calculateCostEstimate(formData),
      generateArchitectInsight(formData),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        formInputs: formData,
        wafScores,
        costEstimate,
        aiOutput,
      },
    });
  } catch (error: any) {
    console.error("Analysis Error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error.message || "Failed to process architecture evaluation",
      },
      { status: 500 }
    );
  }
}
