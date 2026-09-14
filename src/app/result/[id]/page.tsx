import { notFound } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { ArchitectureDiagram } from "@/components/result/ArchitectureDiagram";
import { WafRadarChart } from "@/components/result/WafRadarChart";
import { CostBreakdownChart } from "@/components/result/CostBreakdownChart";
import { WafChecklist } from "@/components/result/WafChecklist";
import { ArchitectureDetail } from "@/components/result/ArchitectureDetail";
import { supabase } from "@/lib/supabase/client";
import { Cpu } from "lucide-react";

async function getEvaluationData(id: string) {
  const { data, error } = await supabase
    .from("evaluations")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data;
}

export default async function ResultPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  const evaluationId = resolvedParams.id;

  const evaluation = await getEvaluationData(evaluationId);

  if (!evaluation) {
    notFound();
  }

  const { ai_output, cost_estimate, waf_scores, project_description } = evaluation;

  return (
    <div className="min-h-screen bg-[#000000] text-[#E1DCC9] flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto max-w-6xl px-4 py-10 space-y-8">
        {/* Top Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-[#412D15] bg-[#1F150C]/80 p-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#E1DCC9]/70 uppercase tracking-wider">
              <Cpu className="h-4 w-4" /> Evaluation Result ID: {evaluationId.substring(0, 8)}...
            </div>
            <h1 className="text-2xl font-bold text-[#E1DCC9] tracking-tight">Recommendation Architecture AWS</h1>
            <p className="text-sm text-[#E1DCC9]/60 line-clamp-2">&quot;{project_description}&quot;</p>
          </div>
        </div>

        {/* Executive Summary AI */}
        {ai_output?.executiveSummary && (
          <div className="rounded-2xl border border-[#412D15] bg-[#1F150C]/60 p-6">
            <h2 className="text-sm font-bold text-[#E1DCC9] uppercase tracking-wider mb-2">Executive Summary (Gemini AI)</h2>
            <p className="text-sm text-[#E1DCC9]/80 leading-relaxed">{ai_output.executiveSummary}</p>
          </div>
        )}

        {/* Top Section Grid: Diagram & WAF Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ArchitectureDiagram mermaidSyntax={ai_output?.tailoredMermaidSyntax || ""} />
          </div>
          <div>
            <WafRadarChart scores={waf_scores} />
          </div>
        </div>

        {/* Detailed Analysis Breakdown */}
        <ArchitectureDetail aiOutput={ai_output} />

        {/* Bottom Section Grid: Cost & Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CostBreakdownChart costEstimate={cost_estimate} />
          <WafChecklist checklist={ai_output?.wafChecklist || []} />
        </div>
      </main>
    </div>
  );
}
