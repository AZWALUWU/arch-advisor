import { Header } from "@/components/ui/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsBar } from "@/components/landing/StatsBar";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { FeatureShowcaseMulti } from "@/components/landing/FeatureShowcaseMulti";
import { CtaBanner } from "@/components/landing/CtaBanner";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#E1DCC9] flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center">
        {/* Hero */}
        <HeroSection />

        {/* Stats */}
        <StatsBar />

        {/* Divider */}
        <div className="w-full max-w-5xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[#412D15]/60 to-transparent" />
        </div>

        {/* Feature 1: MVP PRD Generator */}
        <FeatureShowcase
          tag="PRD Builder"
          title="Generate Production-Ready MVP PRDs"
          description="Define your app idea, tech stack, and SaaS integrations through a guided 4-step wizard. Get a comprehensive PRD ready for your dev team."
          href="/prd"
          ctaText="Build Your PRD"
          imageSrc="/prd/result-overview-prd-generator.webp"
          imageAlt="MVP PRD Generator - Complete PRD specification"
          features={[
            "User stories with acceptance criteria",
            "Data model drafts and tech stack recommendations",
            "Step-by-step vibe coding roadmap included",
          ]}
        />

        {/* Divider */}
        <div className="w-full max-w-5xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[#412D15]/60 to-transparent" />
        </div>

        {/* Feature 2: Vibe Roadmap */}
        <FeatureShowcase
          tag="Vibe Coding"
          title="Turn Any PRD into an Interactive Roadmap"
          description="Paste your Product Requirement Document and get a non-linear branching flowchart with high-precision AI prompts for every phase."
          href="/roadmap"
          ctaText="Try Roadmap Generator"
          imageSrc="/vibe-roadmap/full-vibe-roadmap-overview.webp"
          imageAlt="Interactive Vibe Roadmap - Branching flowchart with AI prompts"
          reverse
          features={[
            "Non-linear branching flowchart with parallel paths",
            "Copy-paste ready AI prompts for every node",
            "Works with Cursor, Antigravity, Claude, and Windsurf",
          ]}
        />

        {/* Divider */}
        <div className="w-full max-w-5xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[#412D15]/60 to-transparent" />
        </div>

        {/* Feature 3: AWS Architecture Advisor */}
        <FeatureShowcaseMulti
          tag="AWS Architecture"
          title="Production AWS Architecture in Minutes"
          description="Answer 6 simple questions about your workload and get a complete AWS architecture recommendation: network diagrams, WAF 6-pillar security scores, cost estimates, and actionable checklists."
          href="/assess"
          ctaText="Evaluate Your Architecture"
          images={[
            {
              src: "/aws-architedture-advisor/aws-architecture-advisor-diagram.webp",
              alt: "AWS Architecture Topology Diagram",
            },
            {
              src: "/aws-architedture-advisor/aws-architecture-advisor-waf-radar.webp",
              alt: "WAF 6-Pillar Radar Score",
            },
            {
              src: "/aws-architedture-advisor/aws-architecture-advisor-cost-breakdown.webp",
              alt: "AWS Cost Breakdown Estimate",
            },
          ]}
        />

        {/* CTA Banner */}
        <CtaBanner />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#412D15]/30 py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E1DCC9]/40">
          <span>ArchAdvisor — AI Architecture, PRD & Vibe Coding Suite</span>
          <div className="flex items-center gap-4">
            <a href="/roadmap" className="hover:text-[#E1DCC9]/70 transition-colors">Roadmap</a>
            <a href="/prd" className="hover:text-[#E1DCC9]/70 transition-colors">PRD</a>
            <a href="/assess" className="hover:text-[#E1DCC9]/70 transition-colors">Assess</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
