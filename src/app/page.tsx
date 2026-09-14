import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { ArrowRight, ShieldCheck, Zap, DollarSign, Cpu, FileCode, Layers, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto max-w-5xl px-4 py-16 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-1.5 text-sm font-medium text-orange-400 ring-1 ring-orange-500/20 mb-8">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>AI Architecture & MVP PRD Suite</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-tight">
          From App Concept to Cloud Architecture in <span className="text-orange-500">Minutes</span>
        </h1>

        <p className="mt-6 text-lg text-slate-400 max-w-2xl leading-relaxed">
          Designed for vibe coders, founders, and architects. Generate production-ready MVP PRDs and evaluate AWS cloud architectures backed by Google Gemini AI.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/prd"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-orange-600/25 hover:from-orange-500 hover:to-amber-400 transition-all"
          >
            <FileCode className="h-5 w-5" />
            Build MVP PRD Specification
            <ArrowRight className="h-5 w-5" />
          </Link>

          <Link
            href="/assess"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-8 py-4 text-base font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
          >
            <Layers className="h-5 w-5 text-orange-400" />
            Start Architecture Evaluation
          </Link>
        </div>

        {/* Feature Grid Highlight */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-left">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
            <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
              <FileCode className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-white text-lg">MVP PRD Generator</h3>
            <p className="mt-2 text-sm text-slate-400">
              Generates structured PRD specs, data model drafts, and step-by-step AI prompts for vibe coding assistants.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
            <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-white text-lg">Mermaid Diagrams</h3>
            <p className="mt-2 text-sm text-slate-400">
              Automatically generates AWS network topology schemas ready for use in your project documentation.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
            <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-white text-lg">WAF & Pricing Analysis</h3>
            <p className="mt-2 text-sm text-slate-400">
              In-depth security, scalability ratings, and estimated monthly AWS costs based on traffic patterns.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
