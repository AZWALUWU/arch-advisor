"use client";

import { Cpu, ShieldCheck, Zap, Scale, HelpCircle } from "lucide-react";

interface ServiceRecommendation {
  serviceName: string;
  category: string;
  rationale: string;
  alternativesConsidered?: string;
}

interface TradeOff {
  decision: string;
  pros: string;
  cons: string;
}

interface ArchitectureDetailProps {
  aiOutput: any;
}

export function ArchitectureDetail({ aiOutput }: ArchitectureDetailProps) {
  const services: ServiceRecommendation[] = aiOutput?.serviceRecommendations || [];
  const tradeoffs: TradeOff[] = aiOutput?.tradeoffs || [];
  const scalabilityStrategy = aiOutput?.scalabilityStrategy || aiOutput?.scalabilityNotes;
  const securityStrategy = aiOutput?.securityStrategy || aiOutput?.securityNotes;

  return (
    <div className="space-y-8">
      {/* Service Rationale Breakdown */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm space-y-4">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Cpu className="h-4 w-4" /> Service Rationale & Selection
          </div>
          <h3 className="text-lg font-bold text-white">AWS Service Selection & Rationale</h3>
          <p className="text-xs text-slate-400">Specific analysis of the reasoning behind each architecture component</p>
        </div>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {services.map((srv, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-base">{srv.serviceName}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase">
                    {srv.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{srv.rationale}</p>
                {srv.alternativesConsidered && (
                  <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-800/60">
                    <strong className="text-slate-400">Alternatives considered:</strong> {srv.alternativesConsidered}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">Detailed service recommendations can be viewed in the Executive Summary above.</p>
        )}
      </div>

      {/* Architecture Trade-offs */}
      {tradeoffs.length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm space-y-4">
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Scale className="h-4 w-4" /> Architecture Trade-offs
            </div>
            <h3 className="text-lg font-bold text-white">Trade-off Considerations & Compromise Decisions</h3>
            <p className="text-xs text-slate-400">Evaluation of the advantages and limitations of the architecture design choices</p>
          </div>

          <div className="space-y-4 pt-2">
            {tradeoffs.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-3">
                <h4 className="font-semibold text-slate-200 text-sm flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-amber-400 shrink-0" />
                  {item.decision}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                    <span className="font-bold text-emerald-400 block mb-1">Advantages (Pros):</span>
                    <span className="text-slate-300">{item.pros}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                    <span className="font-bold text-red-400 block mb-1">Challenges/Consequences (Cons):</span>
                    <span className="text-slate-300">{item.cons}</span>
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
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm space-y-3">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                <Zap className="h-4 w-4" /> Scalability Strategy
              </div>
              <h4 className="text-base font-bold text-white">Scalability Strategy</h4>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{scalabilityStrategy}</p>
            </div>
          )}

          {securityStrategy && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4" /> Security & Compliance
              </div>
              <h4 className="text-base font-bold text-white">Security & Data Privacy Strategy</h4>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{securityStrategy}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
