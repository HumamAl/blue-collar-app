// Server component — no "use client"
import type { Metadata } from "next";
import { challenges, executiveSummary } from "@/data/challenges";
import { ExecutiveSummary } from "@/components/challenges/executive-summary";
import { ChallengePageContent } from "@/components/challenges/challenge-page-content";
import { CtaCloser } from "@/components/challenges/cta-closer";

export const metadata: Metadata = {
  title: "My Approach | TradeLink Demo",
  description:
    "How I would tackle the core technical challenges in a trades marketplace — matching, trust, and job lifecycle.",
};

export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 md:px-6 space-y-8">

        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Approach</h1>
          <p className="text-sm text-muted-foreground mt-1">
            How I would tackle the core challenges in this trades marketplace
          </p>
        </div>

        {/* Dark executive summary banner */}
        <ExecutiveSummary
          commonApproach={executiveSummary.commonApproach}
          differentApproach={executiveSummary.differentApproach}
          accentWord={executiveSummary.accentWord}
        />

        {/* Challenge cards with interactive visualizations */}
        <ChallengePageContent challenges={challenges} />

        {/* CTA closer */}
        <CtaCloser />

      </div>
    </div>
  );
}
