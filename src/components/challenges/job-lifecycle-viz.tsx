"use client";

import { useState } from "react";
import {
  FileText,
  DollarSign,
  CheckCircle2,
  Wrench,
  Star,
  XCircle,
  AlertCircle,
  UserX,
  ChevronRight,
} from "lucide-react";

type StateStatus = "completed" | "active" | "upcoming" | "branch";

interface JobState {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  icon: React.ElementType;
  status: StateStatus;
  branch?: boolean;
  branchOf?: string;
}

const states: JobState[] = [
  {
    id: "requested",
    label: "Requested",
    shortLabel: "Requested",
    description: "Homeowner posts job. Platform filters eligible pros by category and location.",
    icon: FileText,
    status: "completed",
  },
  {
    id: "quoted",
    label: "Quoted",
    shortLabel: "Quoted",
    description: "One or more pros send price quotes. Homeowner reviews profiles side by side.",
    icon: DollarSign,
    status: "active",
  },
  {
    id: "confirmed",
    label: "Confirmed",
    shortLabel: "Confirmed",
    description: "Homeowner accepts a quote. Booking is created, deposit held in escrow.",
    icon: CheckCircle2,
    status: "upcoming",
  },
  {
    id: "in-progress",
    label: "In Progress",
    shortLabel: "In Progress",
    description: "Pro has checked in on-site. Timer starts, homeowner sees live status.",
    icon: Wrench,
    status: "upcoming",
  },
  {
    id: "completed",
    label: "Completed",
    shortLabel: "Completed",
    description: "Job signed off by homeowner. Payment released to pro minus platform fee.",
    icon: Star,
    status: "upcoming",
  },
];

const branchStates: JobState[] = [
  {
    id: "cancelled",
    label: "Cancelled",
    shortLabel: "Cancelled",
    description: "Job cancelled before work started. Deposit refunded per cancellation policy.",
    icon: XCircle,
    status: "branch",
    branchOf: "confirmed",
  },
  {
    id: "disputed",
    label: "Disputed",
    shortLabel: "Disputed",
    description: "Homeowner or pro raises a dispute after work. Platform mediates resolution.",
    icon: AlertCircle,
    status: "branch",
    branchOf: "completed",
  },
  {
    id: "no-show",
    label: "No-Show",
    shortLabel: "No-Show",
    description: "Pro fails to appear. Auto-reassignment flow triggered, homeowner protected.",
    icon: UserX,
    status: "branch",
    branchOf: "confirmed",
  },
];

const allStatesById: Record<string, JobState> = {};
[...states, ...branchStates].forEach((s) => {
  allStatesById[s.id] = s;
});

export function JobLifecycleViz() {
  const [activeId, setActiveId] = useState<string>("quoted");

  const activeState = allStatesById[activeId];

  return (
    <div className="space-y-4">
      {/* Main flow */}
      <div>
        <p className="text-[11px] text-muted-foreground font-mono mb-2">
          Main lifecycle — tap any state
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          {states.map((state, i) => {
            const Icon = state.icon;
            const isActive = activeId === state.id;

            return (
              <div key={state.id} className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveId(state.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  style={{
                    borderColor: isActive
                      ? "var(--primary)"
                      : state.status === "completed"
                      ? "color-mix(in oklch, var(--success) 35%, transparent)"
                      : state.status === "active"
                      ? "color-mix(in oklch, var(--primary) 50%, transparent)"
                      : "var(--border)",
                    backgroundColor: isActive
                      ? "color-mix(in oklch, var(--primary) 12%, transparent)"
                      : state.status === "completed"
                      ? "color-mix(in oklch, var(--success) 7%, transparent)"
                      : state.status === "active"
                      ? "color-mix(in oklch, var(--primary) 6%, transparent)"
                      : "var(--card)",
                    color: isActive
                      ? "var(--primary)"
                      : state.status === "completed"
                      ? "var(--success)"
                      : "var(--foreground)",
                    transform: isActive ? "scale(1.04)" : "scale(1)",
                  }}
                >
                  <Icon className="w-3 h-3 shrink-0" />
                  <span>{state.shortLabel}</span>
                </button>
                {i < states.length - 1 && (
                  <ChevronRight
                    className="w-3 h-3 shrink-0"
                    style={{ color: "var(--muted-foreground)" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Branch states */}
      <div>
        <p className="text-[11px] text-muted-foreground font-mono mb-2">
          Exception branches — real states, not edge cases
        </p>
        <div className="flex flex-wrap gap-1.5">
          {branchStates.map((state) => {
            const Icon = state.icon;
            const isActive = activeId === state.id;

            return (
              <button
                key={state.id}
                onClick={() => setActiveId(state.id)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                style={{
                  borderColor: isActive
                    ? "color-mix(in oklch, var(--destructive) 50%, transparent)"
                    : "color-mix(in oklch, var(--warning) 30%, transparent)",
                  backgroundColor: isActive
                    ? "color-mix(in oklch, var(--destructive) 8%, transparent)"
                    : "color-mix(in oklch, var(--warning) 5%, transparent)",
                  color: isActive ? "var(--destructive)" : "var(--warning-foreground)",
                  transform: isActive ? "scale(1.04)" : "scale(1)",
                }}
              >
                <Icon className="w-3 h-3 shrink-0" />
                <span>{state.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      {activeState && (
        <div
          className="rounded-lg px-4 py-3 transition-all duration-200"
          style={{
            backgroundColor: activeState.branch
              ? "color-mix(in oklch, var(--warning) 6%, transparent)"
              : "color-mix(in oklch, var(--primary) 6%, transparent)",
            border: `1px solid ${
              activeState.branch
                ? "color-mix(in oklch, var(--warning) 20%, transparent)"
                : "color-mix(in oklch, var(--primary) 20%, transparent)"
            }`,
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            {(() => {
              const Icon = activeState.icon;
              return (
                <Icon
                  className="w-3.5 h-3.5 shrink-0"
                  style={{
                    color: activeState.branch ? "var(--warning)" : "var(--primary)",
                  }}
                />
              );
            })()}
            <span
              className="text-xs font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              {activeState.label}
            </span>
            {activeState.branchOf && (
              <span
                className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm"
                style={{
                  backgroundColor: "color-mix(in oklch, var(--warning) 10%, transparent)",
                  color: "var(--muted-foreground)",
                }}
              >
                branch from {activeState.branchOf}
              </span>
            )}
          </div>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            {activeState.description}
          </p>
        </div>
      )}

      {/* Both-parties note */}
      <p
        className="text-[11px] font-mono"
        style={{ color: "var(--muted-foreground)" }}
      >
        Every state visible identically to homeowner and pro — no divergent views.
      </p>
    </div>
  );
}
