"use client";

import { useState } from "react";
import { Copy, Check, Download, Sparkles, FileText, Code, Database, Rocket, Layers, ArrowRight, GitBranch } from "lucide-react";
import { PrdGeneratedResult } from "@/lib/engine/prd-generator";

interface PrdResultViewProps {
  prd: PrdGeneratedResult;
  onReset: () => void;
}

export function PrdResultView({ prd, onReset }: PrdResultViewProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "stack" | "data" | "roadmap" | "markdown">("overview");

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(prd.fullMarkdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([prd.fullMarkdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${prd.title.toLowerCase().replace(/\s+/g, "-")}-prd.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleOpenVibeRoadmap = () => {
    localStorage.setItem("arch_advisor_import_prd", prd.fullMarkdownContent);
    window.location.href = "/roadmap";
  };

  return (
    <div className="space-y-6 text-left w-full">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/20 mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>MVP PRD Generated</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {prd.title}
          </h1>
          <p className="text-xs text-slate-400 mt-1">{prd.tagline}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleOpenVibeRoadmap}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 px-4 py-2.5 text-xs font-bold text-white hover:from-orange-500 hover:to-amber-400 transition-colors shadow-lg shadow-orange-600/20"
          >
            <GitBranch className="h-4 w-4" />
            <span>Interactive Vibe Flowchart</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 px-3.5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors border border-slate-700"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? "Copied!" : "Copy PRD"}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors border border-slate-800"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: "overview", label: "Overview", icon: FileText },
          { id: "features", label: "MVP Features", icon: Layers },
          { id: "stack", label: "Tech Stack & Services", icon: Code },
          { id: "data", label: "Data Schema Draft", icon: Database },
          { id: "roadmap", label: "Interactive Vibe Roadmap Flowchart", icon: Rocket },
          { id: "markdown", label: "Raw Markdown", icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? "bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/30 font-semibold"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-orange-400">
                Executive Summary
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mt-2">
                {prd.executiveSummary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Target Audience / Personas
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {prd.targetAudience}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Core Problem Solved
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {prd.problemStatement}
                </p>
              </div>
            </div>

            {prd.outOfScopeV1?.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  Out of Scope for MVP (v1 Non-Goals)
                </h3>
                <ul className="list-disc list-inside text-xs text-slate-400 mt-2 space-y-1">
                  {prd.outOfScopeV1.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === "features" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-orange-400">
              MVP Must-Have Feature Specifications
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {prd.mvpFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/20 text-xs font-bold text-orange-400">
                        {idx + 1}
                      </span>
                      {feat.featureName}
                    </h4>
                    <span className="rounded-md bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-orange-400 ring-1 ring-orange-500/20">
                      {feat.priority}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">{feat.description}</p>

                  <div className="rounded-lg bg-slate-900/90 p-2.5 border border-slate-800 text-xs text-slate-400 italic">
                    <strong className="text-slate-300 not-italic">User Story: </strong>
                    "{feat.userStory}"
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Acceptance Criteria:
                    </span>
                    <ul className="space-y-1">
                      {feat.acceptanceCriteria.map((crit, cIdx) => (
                        <li
                          key={cIdx}
                          className="flex items-center gap-2 text-xs text-slate-400"
                        >
                          <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                          <span>{crit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "stack" && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-orange-400">
              Technical Architecture & Stack Justifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Frontend
                </span>
                <p className="text-sm font-semibold text-white mt-1">
                  {prd.techStackArchitecture.frontend}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Backend
                </span>
                <p className="text-sm font-semibold text-white mt-1">
                  {prd.techStackArchitecture.backend}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Database
                </span>
                <p className="text-sm font-semibold text-white mt-1">
                  {prd.techStackArchitecture.database}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Styling / UI
                </span>
                <p className="text-sm font-semibold text-white mt-1">
                  {prd.techStackArchitecture.styling}
                </p>
              </div>
            </div>

            {prd.techStackArchitecture.integrations?.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
                  SaaS / PaaS / BaaS Integrations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {prd.techStackArchitecture.integrations.map((srv, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{srv.serviceName}</span>
                        <span className="text-[10px] font-medium text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
                          {srv.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1.5">{srv.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "data" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-orange-400">
              Initial Data Model & Schema Outline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prd.dataModelDraft.map((model, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-orange-400" />
                    <h4 className="text-sm font-bold text-white">{model.entityName}</h4>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                      Fields:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {model.fields.map((field, fIdx) => (
                        <span
                          key={fIdx}
                          className="rounded-md bg-slate-900 px-2 py-1 text-[11px] font-mono text-slate-300 border border-slate-800"
                        >
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 pt-1">
                    <strong className="text-slate-300">Relationships: </strong>
                    {model.relationships}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "roadmap" && (
          <div className="space-y-6 text-center py-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20 mb-2">
              <GitBranch className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Generate Interactive Branching Vibe Roadmap Flowchart
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Transform this PRD into a non-linear flowchart with branching decision paths, optional features, and interactive popup prompt modals.
            </p>

            <button
              onClick={handleOpenVibeRoadmap}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 px-6 py-3.5 text-xs font-bold text-white hover:from-orange-500 hover:to-amber-400 transition-all shadow-xl shadow-orange-600/25"
            >
              <GitBranch className="h-4 w-4" />
              <span>Open in Vibe Roadmap Flowchart</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {activeTab === "markdown" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Full PRD Markdown Document
              </span>
              <button
                onClick={handleCopyMarkdown}
                className="text-xs text-orange-400 hover:text-orange-300 font-medium flex items-center gap-1"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
            <textarea
              readOnly
              rows={18}
              value={prd.fullMarkdownContent}
              className="w-full rounded-xl border border-slate-950 p-4 text-xs font-mono text-slate-300 focus:outline-none resize-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}
