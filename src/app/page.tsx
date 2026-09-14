import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { ArrowRight, ShieldCheck, Zap, DollarSign, Cpu } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto max-w-5xl px-4 py-16 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-1.5 text-sm font-medium text-orange-400 ring-1 ring-orange-500/20 mb-8">
          <Zap className="h-4 w-4" />
          <span>AWS Well-Architected Advisor Engine</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-tight">
          Design Precise AWS Architecture in <span className="text-orange-500">Minutes</span>
        </h1>

        <p className="mt-6 text-lg text-slate-400 max-w-2xl leading-relaxed">
          Combines AI project description input with the 6 pillars of the AWS Well-Architected Framework to generate SVG/Mermaid architecture diagrams, stack recommendations, and instant cost estimates.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/assess"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-orange-600/25 hover:bg-orange-500 transition-all"
          >
            Start Architecture Evaluation
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Feature Grid Highlight */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-left">
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
            <h3 className="font-semibold text-white text-lg">WAF Checklist</h3>
            <p className="mt-2 text-sm text-slate-400">
              In-depth security and scalability recommendations tailored to your cost tolerance and team.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
              <DollarSign className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-white text-lg">Pricing Estimates</h3>
            <p className="mt-2 text-sm text-slate-400">
              Calculates monthly AWS cost ranges based on estimated traffic load and database type.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
