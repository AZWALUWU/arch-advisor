"use client";

import { useState } from "react";
import { Header } from "@/components/ui/Header";
import { ProgressStepper } from "@/components/wizard/ProgressStepper";
import { StepProjectPrompt } from "@/components/wizard/StepProjectPrompt";
import { Step1Workload } from "@/components/wizard/Step1Workload";
import { Step2Traffic } from "@/components/wizard/Step2Traffic";
import { Step3Data } from "@/components/wizard/Step3Data";
import { Step4Reliability } from "@/components/wizard/Step4Reliability";
import { Step5Security } from "@/components/wizard/Step5Security";
import { Step6Budget } from "@/components/wizard/Step6Budget";
import { formArchitectSchema, FormArchitectValues } from "@/lib/validations/form-schema";
import { AiOutput, WafScores, CostEstimate } from "@/types/database";
import { ArchitectureDiagram } from "@/components/result/ArchitectureDiagram";
import { WafRadarChart } from "@/components/result/WafRadarChart";
import { CostBreakdownChart } from "@/components/result/CostBreakdownChart";
import { WafChecklist } from "@/components/result/WafChecklist";
import { ArchitectureDetail } from "@/components/result/ArchitectureDetail";
import { ArrowLeft, ArrowRight, Loader2, Sparkles, RotateCcw } from "lucide-react";

const STEP_LABELS = [
  "Prompt",
  "Workload",
  "Traffic",
  "Data",
  "Reliability",
  "Security",
  "Budget",
];

const INITIAL_FORM_DATA: FormArchitectValues = {
  projectDescription: "",
  workloadType: "web_app",
  lifecycleStage: "mvp",
  deploymentModel: "serverless",
  monthlyActiveUsers: "low_10k",
  trafficShape: "steady",
  latencyRequirement: "standard",
  primaryDataType: "relational",
  dataScale: "under_10gb",
  cachingStrategy: "none",
  availabilitySla: "sla_99",
  disasterRecovery: "backup_restore",
  dataClassification: "public",
  networkExposure: "fully_public",
  monthlyBudget: "under_50",
  devopsCapacity: "none",
};

interface EvaluationResult {
  formInputs: FormArchitectValues;
  wafScores: WafScores;
  costEstimate: CostEstimate;
  aiOutput: AiOutput;
}

export default function AssessWizardPage() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormArchitectValues>(INITIAL_FORM_DATA);
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);

  const updateField = (field: keyof FormArchitectValues, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleNext = async () => {
    if (currentStep === 0) {
      if (formData.projectDescription.trim().length < 15) {
        setError("Project description must be at least 15 characters for the AI to provide");
        return;
      }
    }

    if (currentStep < STEP_LABELS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    await handleSubmitForm();
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setError("");
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmitForm = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const validatedData = formArchitectSchema.parse(formData);

      const response = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textError = await response.text();
        console.error("Non-JSON Server Response:", textError);
        throw new Error(`Server Error (${response.status}): Endpoint returned HTML/Non-JSON. Check the server terminal logs.`);
      }

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || json.message || "Failed to perform architecture evaluation.");
      }

      setResult(json.data);
    } catch (err: any) {
      console.error("Submit error:", err);
      setError(err.message || "A system error occurred while processing the request.");
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(0);
    setError("");
    setIsSubmitting(false);
  };

  if (result) {
    return (
      <div className="min-h-screen bg-[#000000] text-[#E1DCC9] flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto max-w-6xl px-4 py-10 space-y-8">
          <div className="flex items-center justify-between rounded-2xl border border-[#412D15] bg-[#1F150C]/80 p-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-[#E1DCC9] tracking-tight">Architecture Evaluation Result</h1>
              <p className="text-sm text-[#E1DCC9]/60 line-clamp-2">&quot;{result.formInputs.projectDescription}&quot;</p>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 rounded-xl bg-[#412D15] px-4 py-2.5 text-xs font-semibold text-[#E1DCC9] hover:bg-[#412D15]/70 transition-all border border-[#412D15]"
            >
              <RotateCcw className="h-4 w-4" />
              <span>New Evaluation</span>
            </button>
          </div>

          {result.aiOutput?.executiveSummary && (
            <div className="rounded-2xl border border-[#412D15] bg-[#1F150C]/60 p-6">
              <h2 className="text-sm font-bold text-[#E1DCC9] uppercase tracking-wider mb-2">Executive Summary (Gemini AI)</h2>
              <p className="text-sm text-[#E1DCC9]/80 leading-relaxed">{result.aiOutput.executiveSummary}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ArchitectureDiagram mermaidSyntax={result.aiOutput?.tailoredMermaidSyntax || ""} />
            </div>
            <div>
              <WafRadarChart scores={result.wafScores} />
            </div>
          </div>

          <ArchitectureDetail aiOutput={result.aiOutput} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CostBreakdownChart costEstimate={result.costEstimate} />
            <WafChecklist checklist={result.aiOutput?.wafChecklist || []} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] text-[#E1DCC9] flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto max-w-3xl px-4 py-10 flex flex-col items-center">
        <div className="w-full mb-8">
          <ProgressStepper
            currentStep={currentStep}
            totalSteps={STEP_LABELS.length}
            stepLabels={STEP_LABELS}
          />
        </div>

        <div className="w-full rounded-2xl border border-[#412D15] bg-[#1F150C]/60 p-6 sm:p-8 backdrop-blur-sm shadow-2xl relative overflow-hidden">
          <div className="min-h-[380px]">{renderStepContent()}</div>

          {error && currentStep !== 0 && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-medium">
              {error}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between border-t border-[#412D15]/80 pt-6">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0 || isSubmitting}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                currentStep === 0 || isSubmitting
                  ? "opacity-0 pointer-events-none"
                  : "bg-[#412D15] text-[#E1DCC9] hover:bg-[#412D15]/70 border border-[#412D15]"
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-[#412D15] px-6 py-2.5 text-sm font-semibold text-[#E1DCC9] shadow-lg hover:bg-[#412D15]/70 transition-all disabled:opacity-50 border border-[#E1DCC9]/20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Analyzing With AI...</span>
                </>
              ) : currentStep === STEP_LABELS.length - 1 ? (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Recommendation</span>
                </>
              ) : (
                <>
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );

  function renderStepContent() {
    switch (currentStep) {
      case 0:
        return (
          <StepProjectPrompt
            value={formData.projectDescription}
            onChange={(val) => updateField("projectDescription", val)}
            error={error}
          />
        );
      case 1:
        return <Step1Workload formData={formData} updateField={updateField} />;
      case 2:
        return <Step2Traffic formData={formData} updateField={updateField} />;
      case 3:
        return <Step3Data formData={formData} updateField={updateField} />;
      case 4:
        return <Step4Reliability formData={formData} updateField={updateField} />;
      case 5:
        return <Step5Security formData={formData} updateField={updateField} />;
      case 6:
        return <Step6Budget formData={formData} updateField={updateField} />;
      default:
        return null;
    }
  }
}
