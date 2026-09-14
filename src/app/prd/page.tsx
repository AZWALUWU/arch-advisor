"use client";

import { useState } from "react";
import { Header } from "@/components/ui/Header";
import { PrdProgressStepper } from "@/components/prd/PrdProgressStepper";
import { PrdStep1Concept } from "@/components/prd/PrdStep1Concept";
import { PrdStep2Features } from "@/components/prd/PrdStep2Features";
import { PrdStep3TechStack } from "@/components/prd/PrdStep3TechStack";
import { PrdStep4Services } from "@/components/prd/PrdStep4Services";
import { PrdResultView } from "@/components/prd/PrdResultView";
import { PrdFormValues } from "@/lib/validations/prd-schema";
import { PrdGeneratedResult } from "@/lib/engine/prd-generator";
import { ArrowLeft, ArrowRight, Sparkles, Loader2 } from "lucide-react";

const STEP_LABELS = [
  "App Concept",
  "MVP Features",
  "Tech Stack",
  "SaaS & Services",
];

const INITIAL_FORM_DATA: PrdFormValues = {
  appName: "",
  appSummary: "",
  targetAudience: "",
  problemStatement: "",
  coreFeatures: ["User Authentication & Profiles", "User Dashboard & Analytics", "Core Resource CRUD"],
  customFeatures: "",
  frontendTech: "Next.js (React)",
  backendTech: "Next.js API Routes",
  databaseTech: "PostgreSQL",
  stylingTech: "Tailwind CSS + shadcn/ui",
  services: ["Supabase", "Vercel", "Resend"],
  additionalNotes: "",
};

export default function PrdBuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<PrdFormValues>(INITIAL_FORM_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [prdResult, setPrdResult] = useState<PrdGeneratedResult | null>(null);

  const updateField = (field: keyof PrdFormValues, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const isStepValid = () => {
    if (currentStep === 0) {
      return (
        formData.appName.trim().length >= 2 &&
        formData.appSummary.trim().length >= 15 &&
        formData.targetAudience.trim().length >= 3 &&
        formData.problemStatement.trim().length >= 10
      );
    }
    if (currentStep === 1) {
      return formData.coreFeatures && formData.coreFeatures.length > 0;
    }
    if (currentStep === 2) {
      return (
        !!formData.frontendTech &&
        !!formData.backendTech &&
        !!formData.databaseTech &&
        !!formData.stylingTech
      );
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep < STEP_LABELS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/prd/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || json.error || "Failed to generate PRD.");
      }

      setPrdResult(json.data);
    } catch (err: any) {
      console.error("PRD Generation Submit Error:", err);
      setErrorMsg(err.message || "An unexpected error occurred while generating the PRD.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPrdResult(null);
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(0);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto max-w-4xl px-4 py-8 flex flex-col items-center">
        {prdResult ? (
          <PrdResultView prd={prdResult} onReset={handleReset} />
        ) : (
          <div className="w-full space-y-8">
            {/* Top Heading */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 ring-1 ring-orange-500/20">
                <Sparkles className="h-3.5 w-3.5" />
                <span>MVP PRD Generator for Vibe Coders & Founders</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Build Your MVP PRD Specification
              </h1>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                Define your app idea, tech stack, and SaaS integrations to generate an AI-ready PRD for Cursor, Antigravity, or your development team.
              </p>
            </div>

            {/* Progress Stepper */}
            <PrdProgressStepper
              currentStep={currentStep}
              totalSteps={STEP_LABELS.length}
              stepLabels={STEP_LABELS}
            />

            {/* Step Form Container */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              {currentStep === 0 && (
                <PrdStep1Concept formData={formData} updateField={updateField} />
              )}
              {currentStep === 1 && (
                <PrdStep2Features formData={formData} updateField={updateField} />
              )}
              {currentStep === 2 && (
                <PrdStep3TechStack formData={formData} updateField={updateField} />
              )}
              {currentStep === 3 && (
                <PrdStep4Services formData={formData} updateField={updateField} />
              )}

              {errorMsg && (
                <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                  {errorMsg}
                </div>
              )}

              {/* Navigation Controls */}
              <div className="mt-8 flex items-center justify-between border-t border-slate-800/80 pt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 0 || isLoading}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all border border-slate-800"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>

                {currentStep < STEP_LABELS.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-orange-600/20"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading || !isStepValid()}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 px-7 py-3 text-xs font-bold text-white hover:from-orange-500 hover:to-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xl shadow-orange-600/25"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Generating PRD via Gemini...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Generate MVP PRD</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
