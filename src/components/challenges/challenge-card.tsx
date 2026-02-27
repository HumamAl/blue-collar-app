// No "use client" — pure JSX, no hooks.

import type { ReactNode } from "react";
import { OutcomeStatement } from "./outcome-statement";

interface ChallengeCardProps {
  title: string;
  description: string;
  outcome: string;
  index: number;
  visualization: ReactNode;
}

export function ChallengeCard({
  title,
  description,
  outcome,
  index,
  visualization,
}: ChallengeCardProps) {
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      className="aesthetic-card p-6 space-y-5"
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Header: step number + title + description */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm font-medium text-primary/60 w-6 shrink-0 tabular-nums select-none">
            {stepNumber}
          </span>
          <h3 className="text-base font-semibold leading-snug">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed pl-[calc(1.5rem+0.75rem)]">
          {description}
        </p>
      </div>

      {/* Visualization */}
      <div className="pl-[calc(1.5rem+0.75rem)]">{visualization}</div>

      {/* Outcome statement */}
      <div className="pl-[calc(1.5rem+0.75rem)]">
        <OutcomeStatement outcome={outcome} />
      </div>
    </div>
  );
}
