"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { RoadmapView } from "@/components/roadmap/RoadmapView";
import { RoadmapGeneratedResult } from "@/lib/engine/roadmap-generator";
import { Sparkles, Loader2, ArrowRight, FileText, Code } from "lucide-react";

function RoadmapContent() {
  const searchParams = useSearchParams();
  const [prdText, setPrdText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [roadmapResult, setRoadmapResult] = useState<RoadmapGeneratedResult | null>(null);

  useEffect(() => {
    // Check if PRD content was passed via localStorage or query params
    const storedPrd = localStorage.getItem("arch_advisor_import_prd");
    if (storedPrd) {
      setPrdText(storedPrd);
      localStorage.removeItem("arch_advisor_import_prd");
    }
  }, [searchParams]);

  const handleGenerate = async () => {
    if (!prdText.trim() || prdText.trim().length < 30) {
      setErrorMsg("Please paste or import a valid PRD document (minimum 30 characters).");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/roadmap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prdContent: prdText, focusPreference: "balanced" }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || json.error || "Failed to generate roadmap.");
      }

      setRoadmapResult(json.data);
    } catch (err: any) {
      console.error("Roadmap Submit Error:", err);
      setErrorMsg(err.message || "An unexpected error occurred while generating the roadmap.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 container mx-auto max-w-5xl px-4 py-8 flex flex-col items-center">
      {roadmapResult ? (
        <RoadmapView roadmap={roadmapResult} onReset={() => setRoadmapResult(null)} />
      ) : (
        <div className="w-full space-y-8 text-center">
          {/* Hero */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 ring-1 ring-orange-500/20">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Interactive Vibe Coding Flowchart & Prompt Generator</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Turn Any PRD into a Branching AI Vibe Roadmap
            </h1>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Paste your Product Requirement Document below to generate an interactive branching flowchart graph with high-precision AI prompts for every single phase.
            </p>
          </div>

          {/* Form Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md text-left space-y-4 shadow-2xl">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-orange-400" />
                  Paste Product Requirement Document (PRD.md)
                </span>
                <span className="text-[11px] text-slate-400">Markdown format supported</span>
              </label>

              <textarea
                rows={12}
                value={prdText}
                onChange={(e) => setPrdText(e.target.value)}
                placeholder="Paste your PRD markdown text here... (e.g. # Acme App PRD\n## Executive Summary\nWe are building an AI workspace app...)"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs font-mono text-slate-200 placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none shadow-inner"
              />
            </div>

            {errorMsg && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                {errorMsg}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">
                {prdText.length} characters
              </span>

              <button
                onClick={handleGenerate}
                disabled={isLoading || prdText.trim().length < 30}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 px-7 py-3 text-xs font-bold text-white hover:from-orange-500 hover:to-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xl shadow-orange-600/25"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Generating Branching Flowchart...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Generate Vibe Roadmap Flowchart</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />
      <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Vibe Roadmap...</div>}>
        <RoadmapContent />
      </Suspense>
    </div>
  );
}
