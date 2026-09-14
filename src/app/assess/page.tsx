"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { ArrowLeft, ArrowRight, Loader2, Sparkles } from "lucide-react";

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

export default function AssessWizardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormArchitectValues>(INITIAL_FORM_DATA);
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const updateField = (field: keyof FormArchitectValues, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleNext = async () => {
    // Validation Step 0 (Project Prompt)
    if (currentStep === 0) {
      if (formData.projectDescription.trim().length < 15) {
        setError("Project description must be at least 15 characters for the AI to provide");
        return;
      }
    }

    // If not the last step, proceed to the next step
    if (currentStep < STEP_LABELS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    // If it is the last step (Step 6), execute the AI API submission
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

      // Periksa apakah response berformat JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textError = await response.text();
        console.error("Non-JSON Server Response:", textError);
        throw new Error(`Server Error (${response.status}): Endpoint returned HTML/Non-JSON. Check the server terminal logs.`);
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || "Failed to perform architecture evaluation.");
      }

      if (!result.evaluationId) {
        throw new Error("Evaluation ID not found in server response.");
      }

      router.push(`/result/${result.evaluationId}`);
    } catch (err: any) {
      console.error("Submit error:", err);
      setError(err.message || "A system error occurred while processing the request.");
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
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
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto max-w-3xl px-4 py-10 flex flex-col items-center">
        {/* Stepper Bar Header */}
        <div className="w-full mb-8">
          <ProgressStepper
            currentStep={currentStep}
            totalSteps={STEP_LABELS.length}
            stepLabels={STEP_LABELS}
          />
        </div>

        {/* Wizard Form Card Wrapper */}
        <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm shadow-2xl relative overflow-hidden">
          {/* Active Step Content */}
          <div className="min-h-[380px]">{renderStepContent()}</div>

          {/* Error Banner */}
          {error && currentStep !== 0 && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-medium">
              {error}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-800/80 pt-6">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0 || isSubmitting}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                currentStep === 0 || isSubmitting
                  ? "opacity-0 pointer-events-none"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 hover:bg-orange-500 transition-all disabled:opacity-50"
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
}
