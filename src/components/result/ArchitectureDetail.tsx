"use client";

import { Cpu, ShieldCheck, Zap, Scale, HelpCircle } from "lucide-react";
import { AiOutput } from "@/types/database";

interface ArchitectureDetailProps {
  aiOutput: AiOutput;
}

export function ArchitectureDetail({ aiOutput }: ArchitectureDetailProps) {
  const services = aiOutput?.serviceRecommendations || [];
  const tradeoffs = aiOutput?.tradeoffs || [];
  const scalabilityStrategy = aiOutput?.scalabilityStrategy;
  const securityStrategy = aiOutput?.securityStrategy;

  return (
    <div className="space-y-8">
      {/* Service Rationale Breakdown */}
      <div className="rounded-2xl border border-[#412D15] bg-[#1F150C]/60 p-6 backdrop-blur-sm space-y-4">
        <div className="border-b border-[#412D15] pb-4">
          <div className="flex items-center gap-2 text-[#E1DCC9]/70 text-xs font-semibold uppercase tracking-wider mb-1">
            <Cpu className="h-4 w-4" /> Service Rationale &amp; Selection
          </div>
          <h3 className="text-lg font-bold text-[#E1DCC9]">AWS Service Selection &amp; Rationale</h3>
          <p className="text-xs text-[#E1DCC9]/60">Specific analysis of the reasoning behind each architecture component</p>
        </div>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {services.map((srv, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#000000]/50 border border-[#412D15]/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#E1DCC9] text-base">{srv.serviceName}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#412D15]/40 text-[#E1DCC9]/80 border border-[#412D15] uppercase">
                    {srv.category}
                  </span>
                </div>
                <p className="text-xs text-[#E1DCC9]/80 leading-relaxed">{srv.rationale}</p>
                {srv.alternativesConsidered && (
                  <p className="text-[11px] text-[#E1DCC9]/50 pt-1 border-t border-[#412D15]/60">
                    <strong className="text-[#E1DCC9]/60">Alternatives considered:</strong> {srv.alternativesConsidered}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#E1DCC9]/60 italic">Detailed service recommendations can be viewed in the Executive Summary above.</p>
        )}
      </div>

      {/* Architecture Trade-offs */}
      {tradeoffs.length > 0 && (
        <div className="rounded-2xl border border-[#412D15] bg-[#1F150C]/60 p-6 backdrop-blur-sm space-y-4">
          <div className="border-b border-[#412D15] pb-4">
            <div className="flex items-center gap-2 text-[#E1DCC9]/70 text-xs font-semibold uppercase tracking-wider mb-1">
              <Scale className="h-4 w-4" /> Architecture Trade-offs
            </div>
            <h3 className="text-lg font-bold text-[#E1DCC9]">Trade-off Considerations &amp; Compromise Decisions</h3>
            <p className="text-xs text-[#E1DCC9]/60">Evaluation of the advantages and limitations of the architecture design choices</p>
          </div>

          <div className="space-y-4 pt-2">
            {tradeoffs.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#000000]/50 border border-[#412D15]/80 space-y-3">
                <h4 className="font-semibold text-[#E1DCC9] text-sm flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-[#E1DCC9]/60 shrink-0" />
                  {item.decision}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                    <span className="font-bold text-emerald-400 block mb-1">Advantages (Pros):</span>
                    <span className="text-[#E1DCC9]/80">{item.pros}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                    <span className="font-bold text-red-400 block mb-1">Challenges/Consequences (Cons):</span>
                    <span className="text-[#E1DCC9]/80">{item.cons}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scalability & Security Strategies */}
      {(scalabilityStrategy || securityStrategy) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scalabilityStrategy && (
            <div className="rounded-2xl border border-[#412D15] bg-[#1F150C]/60 p-6 backdrop-blur-sm space-y-3">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                <Zap className="h-4 w-4" /> Scalability Strategy
              </div>
              <h4 className="text-base font-bold text-[#E1DCC9]">Scalability Strategy</h4>
              <p className="text-xs text-[#E1DCC9]/80 leading-relaxed whitespace-pre-line">{scalabilityStrategy}</p>
            </div>
          )}

          {securityStrategy && (
            <div className="rounded-2xl border border-[#412D15] bg-[#1F150C]/60 p-6 backdrop-blur-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4" /> Security &amp; Compliance
              </div>
              <h4 className="text-base font-bold text-[#E1DCC9]">Security &amp; Data Privacy Strategy</h4>
              <p className="text-xs text-[#E1DCC9]/80 leading-relaxed whitespace-pre-line">{securityStrategy}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
