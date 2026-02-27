"use client";

import { useState } from "react";
import {
  FileText,
  Filter,
  Bell,
  MessageSquare,
  CheckCircle2,
  Calendar,
  ChevronRight,
} from "lucide-react";

const steps = [
  {
    id: "post",
    icon: FileText,
    label: "Homeowner Posts Job",
    detail: "Category, location, urgency, description",
    highlight: false,
  },
  {
    id: "filter",
    icon: Filter,
    label: "Category + Radius Filter",
    detail: "Trade match → 15mi radius → active pros only",
    highlight: true, // the "hard" step
  },
  {
    id: "notify",
    icon: Bell,
    label: "Available Pros Notified",
    detail: "Push notification to eligible pros in real time",
    highlight: false,
  },
  {
    id: "quote",
    icon: MessageSquare,
    label: "Pros Send Quotes",
    detail: "Price, ETA, and profile surfaced to homeowner",
    highlight: false,
  },
  {
    id: "select",
    icon: CheckCircle2,
    label: "Homeowner Selects Pro",
    detail: "Booking created, both parties confirmed",
    highlight: false,
  },
  {
    id: "confirm",
    icon: Calendar,
    label: "Booking Confirmed",
    detail: "Scheduled date locked, deposit held",
    highlight: false,
  },
];

export function MatchingFlowViz() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {/* Step-through hint */}
      <p className="text-[11px] text-muted-foreground font-mono">
        Tap a step to see what happens at that stage
      </p>

      {/* Horizontal scroll on mobile, wrapped on desktop */}
      <div className="flex flex-wrap gap-2 items-center">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = activeStep === i;
          const isHighlight = step.highlight;

          return (
            <div key={step.id} className="flex items-center gap-2">
              <button
                onClick={() => setActiveStep(isActive ? null : i)}
                className="flex flex-col items-start gap-1 px-3 py-2.5 rounded-lg border text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                style={{
                  borderColor: isActive
                    ? "var(--primary)"
                    : isHighlight
                    ? "color-mix(in oklch, var(--primary) 40%, transparent)"
                    : "var(--border)",
                  backgroundColor: isActive
                    ? "color-mix(in oklch, var(--primary) 12%, transparent)"
                    : isHighlight
                    ? "color-mix(in oklch, var(--primary) 6%, transparent)"
                    : "var(--card)",
                  transform: isActive ? "scale(1.02)" : "scale(1)",
                  boxShadow: isActive
                    ? "0 2px 8px color-mix(in oklch, var(--primary) 20%, transparent)"
                    : "none",
                }}
              >
                <div className="flex items-center gap-1.5">
                  <Icon
                    className="w-3.5 h-3.5 shrink-0"
                    style={{
                      color: isActive || isHighlight ? "var(--primary)" : "var(--muted-foreground)",
                    }}
                  />
                  <span
                    className="text-xs font-medium leading-none"
                    style={{
                      color: isActive ? "var(--primary)" : "var(--foreground)",
                    }}
                  >
                    {step.label}
                  </span>
                </div>
                {isHighlight && !isActive && (
                  <span
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded-sm"
                    style={{
                      backgroundColor: "color-mix(in oklch, var(--primary) 10%, transparent)",
                      color: "var(--primary)",
                    }}
                  >
                    core logic
                  </span>
                )}
              </button>

              {i < steps.length - 1 && (
                <ChevronRight
                  className="w-3 h-3 shrink-0"
                  style={{ color: "var(--muted-foreground)" }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Detail panel — expands when a step is active */}
      {activeStep !== null && (
        <div
          className="rounded-lg px-4 py-3 mt-1 transition-all duration-200"
          style={{
            backgroundColor: steps[activeStep].highlight
              ? "color-mix(in oklch, var(--primary) 8%, transparent)"
              : "color-mix(in oklch, var(--muted) 60%, transparent)",
            border: "1px solid color-mix(in oklch, var(--border) 80%, transparent)",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            {(() => {
              const Icon = steps[activeStep].icon;
              return (
                <Icon
                  className="w-3.5 h-3.5"
                  style={{ color: "var(--primary)" }}
                />
              );
            })()}
            <span className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
              {steps[activeStep].label}
            </span>
          </div>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            {steps[activeStep].detail}
          </p>
        </div>
      )}
    </div>
  );
}
