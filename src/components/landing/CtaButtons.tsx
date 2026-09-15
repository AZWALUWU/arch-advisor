import Link from "next/link";
import { GitBranch, FileCode, Layers, ArrowRight } from "lucide-react";

export function CtaButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
      <Link
        href="/roadmap"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#412D15] px-7 py-3.5 text-sm font-semibold text-[#E1DCC9] shadow-lg shadow-[#412D15]/20 hover:bg-[#412D15]/80 hover:shadow-xl hover:shadow-[#412D15]/30 active:scale-[0.98] transition-all duration-200 border border-[#412D15]"
      >
        <GitBranch className="h-4 w-4" />
        Vibe Roadmap
        <ArrowRight className="h-4 w-4 opacity-60" />
      </Link>

      <Link
        href="/prd"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#1F150C] border border-[#412D15]/60 px-6 py-3.5 text-sm font-semibold text-[#E1DCC9] hover:bg-[#412D15]/40 hover:border-[#412D15] active:scale-[0.98] transition-all duration-200"
      >
        <FileCode className="h-4 w-4" />
        MVP PRD
      </Link>

      <Link
        href="/assess"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#1F150C] border border-[#412D15]/60 px-6 py-3.5 text-sm font-semibold text-[#E1DCC9] hover:bg-[#412D15]/40 hover:border-[#412D15] active:scale-[0.98] transition-all duration-200"
      >
        <Layers className="h-4 w-4" />
        AWS Architect
      </Link>
    </div>
  );
}
