import { CtaButtons } from "./CtaButtons";
import { Sparkles } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="relative rounded-3xl border border-[#412D15]/60 bg-gradient-to-b from-[#1F150C]/90 to-[#1F150C]/60 p-10 sm:p-16 lg:p-20 text-center overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#412D15]/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[200px] bg-[#412D15]/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-[#412D15]/15 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#412D15]/30 px-4 py-1.5 text-xs font-semibold text-[#E1DCC9]/90 ring-1 ring-[#412D15]/50">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Start Building Today</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#E1DCC9] tracking-tight leading-tight">
            Ready to Build Smarter?
          </h2>
          <p className="text-base sm:text-lg text-[#E1DCC9]/60 max-w-xl mx-auto leading-relaxed">
            Start generating your MVP PRD, architecture diagram, and vibe roadmap today.
            No credit card required.
          </p>
          <div className="pt-4">
            <CtaButtons />
          </div>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-[#412D15]/30 rounded-tl-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-[#412D15]/30 rounded-tr-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-[#412D15]/30 rounded-bl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-[#412D15]/30 rounded-br-3xl pointer-events-none" />
      </div>
    </section>
  );
}
