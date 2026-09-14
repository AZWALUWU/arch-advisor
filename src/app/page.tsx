import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { ArrowRight, ShieldCheck, Zap, DollarSign, Cpu, FileCode, Layers, GitBranch, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto max-w-5xl px-4 py-16 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-1.5 text-sm font-medium text-orange-400 ring-1 ring-orange-500/20 mb-8">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>AI Architecture, PRD & Vibe Coding Suite</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-tight">
          From App Concept to Branching Vibe Roadmap in <span className="text-orange-500">Minutes</span>
        </h1>

        <p className="mt-6 text-lg text-slate-400 max-w-2xl leading-relaxed">
          The ultimate toolkit for vibe coders, founders, and architects. Generate MVP PRDs, interactive branching AI coding roadmaps, and production AWS cloud architectures.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/roadmap"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-orange-600/25 hover:from-orange-500 hover:to-amber-400 transition-all"
          >
            <GitBranch className="h-5 w-5" />
            Generate Vibe Flowchart
            <ArrowRight className="h-5 w-5" />
          </Link>

          <Link
            href="/prd"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-7 py-4 text-base font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
          >
            <FileCode className="h-5 w-5 text-amber-400" />
            Build MVP PRD
          </Link>

          <Link
            href="/assess"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-7 py-4 text-base font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
          >
            <Layers className="h-5 w-5 text-orange-400" />
            Evaluate Architecture
          </Link>
        </div>

        {/* Feature Grid Highlight */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-left">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
              <GitBranch className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-white text-lg">Interactive Vibe Roadmap</h3>
            <p className="mt-2 text-sm text-slate-400">
              Generates non-linear decision branching flowcharts. Click any node to open a pop-up prompt with precise AI prompts.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
            <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
              <FileCode className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-white text-lg">MVP PRD Generator</h3>
            <p className="mt-2 text-sm text-slate-400">
              Captures your app vision, MVP feature specs, and SaaS/PaaS/BaaS stack to generate GitHub-ready PRD markdown docs.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
            <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-white text-lg">AWS Architecture Advisor</h3>
            <p className="mt-2 text-sm text-slate-400">
              Generates AWS network topology diagrams, WAF 6-pillar radar scores, and estimated monthly cost ranges.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
