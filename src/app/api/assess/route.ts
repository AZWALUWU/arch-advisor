import { NextRequest, NextResponse } from "next/server";
import { formArchitectSchema } from "@/lib/validations/form-schema";
import { calculateWafScores } from "@/lib/engine/waf-scorer";
import { generateArchitectInsight } from "@/lib/engine/gemini";
import { calculateCostEstimate } from "@/lib/engine/cost-estimator";
import { supabase } from "@/lib/supabase/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validation Input Form with Zod
    const validationResult = formArchitectSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid form input", details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    // 2. Calculate WAF Scoring, Estimation Pricing, & Analyze Gemini AI
    const wafScores = calculateWafScores(formData);
    const costEstimate = calculateCostEstimate(formData);
    const aiOutput = await generateArchitectInsight(formData);

    // 3. Save Result Evalution to Supabase Database
    const { data: evaluation, error: dbError } = await supabase
      .from("evaluations")
      .insert({
        project_description: formData.projectDescription,
        form_inputs: formData,
        waf_scores: wafScores,
        cost_estimate: costEstimate,
        ai_output: aiOutput,
      })
      .select("id")
      .single();

    if (dbError || !evaluation) {
      console.error("Database Save Error:", dbError);
      return NextResponse.json(
        { error: "Gagal menyimpan data evaluasi ke database" },
        { status: 500 }
      );
    }

    // 4. Response with evaluationId for Redirect Frontend
    return NextResponse.json({
      success: true,
      evaluationId: evaluation.id,
    });
  } catch (error: any) {
    console.error("Analysis Error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error.message || "Gagal memproses evaluasi arsitektur",
      },
      { status: 500 }
    );
  }
}