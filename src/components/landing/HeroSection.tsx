"use client";

import { Sparkles } from "lucide-react";
import { CtaButtons } from "./CtaButtons";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative w-full flex flex-col items-center text-center overflow-hidden pt-20 sm:pt-28 lg:pt-32">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#412D15]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#412D15]/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-[#412D15]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-[#412D15]/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 space-y-7 max-w-4xl mx-auto px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-[#1F150C]/80 px-4 py-2 text-sm font-medium text-[#E1DCC9]/90 ring-1 ring-[#412D15]/60 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-[#E1DCC9]" />
          <span>AI Architecture, PRD & Vibe Coding Suite</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-[#E1DCC9] leading-[1.05]">
          Build Smarter, Ship{" "}
          <span className="relative inline-block">
            <span className="relative z-10 underline decoration-[#412D15]/80 underline-offset-[10px] sm:underline-offset-[14px]">
              Faster
            </span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-[#412D15]/20 -skew-x-6 rounded-sm" />
          </span>{" "}
          with AI
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-[#E1DCC9]/60 max-w-2xl mx-auto leading-relaxed">
          From app concept to production architecture. Generate MVP PRDs, interactive branching
          roadmaps, and production AWS cloud architectures — all in minutes.
        </p>

        {/* CTA */}
        <div className="pt-2">
          <CtaButtons />
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 pt-4 text-xs text-[#E1DCC9]/40">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" /></svg>
            No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            100% free to generate
          </span>
        </div>
      </div>

      {/* Hero Screenshot */}
      <div className="relative z-10 mt-16 sm:mt-20 w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative group">
          {/* Glow behind card */}
          <div className="absolute -inset-1 bg-gradient-to-b from-[#412D15]/30 via-[#412D15]/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 pointer-events-none" />

          <div className="relative rounded-2xl border border-[#412D15]/60 bg-[#1F150C]/60 p-2 sm:p-3 backdrop-blur-sm shadow-2xl shadow-[#412D15]/20">
            {/* Browser chrome mockup */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-[#412D15]/40">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#412D15]/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#412D15]/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#412D15]/30" />
              </div>
              <div className="flex-1 mx-4">
                <div className="mx-auto max-w-xs w-full h-5 rounded-md bg-[#412D15]/20 flex items-center justify-center">
                  <span className="text-[10px] text-[#E1DCC9]/30 font-mono">localhost:3000/assess</span>
                </div>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-[#412D15]/30">
              <Image
                src="/aws-architedture-advisor/FireShot Capture 009 - ArchAdvisor - localhost.webp"
                alt="ArchAdvisor - AWS Architecture Advisor showing diagram, WAF scores, and cost breakdown"
                width={1440}
                height={900}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Glow under screenshot */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-16 bg-[#412D15]/20 rounded-full blur-[60px] pointer-events-none" />
      </div>
    </section>
  );
}
