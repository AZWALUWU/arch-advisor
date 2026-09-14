import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { ArrowRight, ShieldCheck, Zap, DollarSign, Cpu, FileCode, Layers, GitBranch, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#E1DCC9] flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto max-w-5xl px-4 py-16 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#1F150C] px-4 py-1.5 text-sm font-medium text-[#E1DCC9] ring-1 ring-[#412D15] mb-8">
          <Sparkles className="h-4 w-4 text-[#E1DCC9]" />
          <span>AI Architecture, PRD & Vibe Coding Suite</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#E1DCC9] max-w-3xl leading-tight">
          From App Concept to Branching Vibe Roadmap in <span className="text-[#E1DCC9] underline decoration-[#412D15]">Minutes</span>
        </h1>

        <p className="mt-6 text-lg text-[#E1DCC9]/80 max-w-2xl leading-relaxed">
          The ultimate toolkit for vibe coders, founders, and architects. Generate MVP PRDs, interactive branching AI coding roadmaps, and production AWS cloud architectures.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/roadmap"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#412D15] px-8 py-4 text-base font-semibold text-[#E1DCC9] shadow-xl hover:bg-[#1F150C] hover:border hover:border-[#412D15] transition-all border border-[#412D15]"
          >
            <GitBranch className="h-5 w-5" />
            Generate Vibe Flowchart
            <ArrowRight className="h-5 w-5" />
          </Link>

          <Link
            href="/prd"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#1F150C] border border-[#412D15] px-7 py-4 text-base font-semibold text-[#E1DCC9] hover:bg-[#412D15] transition-all"
          >
            <FileCode className="h-5 w-5" />
            Build MVP PRD
          </Link>

          <Link
            href="/assess"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#1F150C] border border-[#412D15] px-7 py-4 text-base font-semibold text-[#E1DCC9] hover:bg-[#412D15] transition-all"
          >
            <Layers className="h-5 w-5" />
            Evaluate Architecture
          </Link>
        </div>

        {/* Feature Grid Highlight */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-left">
          <div className="rounded-2xl border border-[#412D15] bg-[#1F150C]/90 p-6 backdrop-blur-sm">
            <div className="h-10 w-10 rounded-lg bg-[#412D15] flex items-center justify-center text-[#E1DCC9] mb-4">
              <GitBranch className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-[#E1DCC9] text-lg">Interactive Vibe Roadmap</h3>
            <p className="mt-2 text-sm text-[#E1DCC9]/70">
              Generates non-linear decision branching flowcharts. Click any node to open a pop-up prompt with precise AI prompts.
            </p>
          </div>

          <div className="rounded-2xl border border-[#412D15] bg-[#1F150C]/90 p-6 backdrop-blur-sm">
            <div className="h-10 w-10 rounded-lg bg-[#412D15] flex items-center justify-center text-[#E1DCC9] mb-4">
              <FileCode className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-[#E1DCC9] text-lg">MVP PRD Generator</h3>
            <p className="mt-2 text-sm text-[#E1DCC9]/70">
              Captures your app vision, MVP feature specs, and SaaS/PaaS/BaaS stack to generate GitHub-ready PRD markdown docs.
            </p>
          </div>

          <div className="rounded-2xl border border-[#412D15] bg-[#1F150C]/90 p-6 backdrop-blur-sm">
            <div className="h-10 w-10 rounded-lg bg-[#412D15] flex items-center justify-center text-[#E1DCC9] mb-4">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-[#E1DCC9] text-lg">AWS Architecture Advisor</h3>
            <p className="mt-2 text-sm text-slate-400 text-[#E1DCC9]/70">
              Generates AWS network topology diagrams, WAF 6-pillar radar scores, and estimated monthly cost ranges.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
