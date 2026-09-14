import { NextRequest, NextResponse } from "next/server";
import { formArchitectSchema } from "@/lib/validations/form-schema";
import { calculateWafScores } from "@/lib/engine/waf-scorer";
import { generateArchitectInsight } from "@/lib/engine/gemini";
import { calculateCostEstimate } from "@/lib/engine/cost-estimator";
import { supabase } from "@/lib/supabase/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validation Input Form via Zod
    const validationResult = formArchitectSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation Error", details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    // 2. Execution Scoring, Estimate Price & AI Gemini Paralel
    const [wafScores, costEstimate, aiOutput] = await Promise.all([
      calculateWafScores(formData),
      calculateCostEstimate(formData),
      generateArchitectInsight(formData),
    ]);

    // 3. Save Result to Supabase PostgreSQL
    const { data: record, error: dbError } = await supabase
      .from("evaluations")
      .insert({
        project_description: formData.projectDescription,
        form_inputs: formData,
        ai_output: aiOutput,
        cost_estimate: costEstimate,
        waf_scores: wafScores,
        is_public: true,
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("Supabase Save Error:", dbError);
      return NextResponse.json(
        { error: "Database Error", message: dbError.message },
        { status: 500 }
      );
    }

    // 4. Return ID Evaluation to Redirect Frontend
    return NextResponse.json({
      success: true,
      id: record.id,
      data: {
        id: record.id,
        formInputs: formData,
        wafScores,
        costEstimate,
        aiOutput,
      },
    });
  } catch (error: any) {
    console.error("Submit Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message || "Failed to process evaluation" },
      { status: 500 }
    );
  }
}
