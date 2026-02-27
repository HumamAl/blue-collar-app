"use client";

import type { ReactNode } from "react";
import type { Challenge } from "@/data/challenges";
import { ChallengeCard } from "./challenge-card";
import { MatchingFlowViz } from "./matching-flow-viz";
import { TrustLayerViz } from "./trust-layer-viz";
import { JobLifecycleViz } from "./job-lifecycle-viz";

const visualizations: Record<string, ReactNode> = {
  "matching-flow": <MatchingFlowViz />,
  "trust-layer": <TrustLayerViz />,
  "job-lifecycle": <JobLifecycleViz />,
};

interface ChallengePageContentProps {
  challenges: Challenge[];
}

export function ChallengePageContent({ challenges }: ChallengePageContentProps) {
  return (
    <div className="flex flex-col gap-5">
      {challenges.map((challenge, index) => (
        <ChallengeCard
          key={challenge.id}
          title={challenge.title}
          description={challenge.description}
          outcome={challenge.outcome}
          index={index}
          visualization={visualizations[challenge.id] ?? null}
        />
      ))}
    </div>
  );
}
