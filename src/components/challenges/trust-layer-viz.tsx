"use client";

import { useState } from "react";
import {
  X,
  Check,
  Star,
  Shield,
  BadgeCheck,
  Clock,
  ThumbsUp,
  AlertTriangle,
} from "lucide-react";

const beforeItems = [
  { icon: AlertTriangle, text: "Name and profile photo only" },
  { icon: AlertTriangle, text: "Star rating (no review count)" },
  { icon: AlertTriangle, text: "No license verification shown" },
  { icon: AlertTriangle, text: "No background check indicator" },
  { icon: AlertTriangle, text: "No completion rate or response time" },
];

const afterItems = [
  { icon: BadgeCheck, text: "License verified badge (state + number)" },
  { icon: Shield, text: "Checkr background check: Clear" },
  { icon: Star, text: "4.8 stars from 94 verified reviews" },
  { icon: ThumbsUp, text: "97% completion rate — 312 jobs" },
  { icon: Clock, text: "Avg response time: 38 min" },
];

export function TrustLayerViz() {
  const [view, setView] = useState<"before" | "after">("before");

  const isBefore = view === "before";

  return (
    <div className="space-y-3">
      {/* Toggle control */}
      <div
        className="inline-flex rounded-lg p-0.5 gap-0.5"
        style={{
          backgroundColor: "var(--muted)",
          border: "1px solid var(--border)",
        }}
      >
        <button
          onClick={() => setView("before")}
          className="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          style={{
            backgroundColor: isBefore ? "var(--card)" : "transparent",
            color: isBefore ? "var(--destructive)" : "var(--muted-foreground)",
            boxShadow: isBefore ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
          }}
        >
          Bare listing
        </button>
        <button
          onClick={() => setView("after")}
          className="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          style={{
            backgroundColor: !isBefore ? "var(--card)" : "transparent",
            color: !isBefore ? "var(--success)" : "var(--muted-foreground)",
            boxShadow: !isBefore ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
          }}
        >
          Verified profile
        </button>
      </div>

      {/* Card mock */}
      <div
        className="rounded-lg border p-4 transition-all duration-200"
        style={{
          borderColor: isBefore
            ? "color-mix(in oklch, var(--destructive) 20%, transparent)"
            : "color-mix(in oklch, var(--success) 25%, transparent)",
          backgroundColor: isBefore
            ? "color-mix(in oklch, var(--destructive) 5%, transparent)"
            : "color-mix(in oklch, var(--success) 5%, transparent)",
        }}
      >
        {/* Pro card header */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
            style={{
              backgroundColor: "color-mix(in oklch, var(--primary) 15%, transparent)",
              color: "var(--primary)",
            }}
          >
            MR
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
              Marcus Rivera
            </p>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              Plumbing · Austin Metro
            </p>
          </div>
          {!isBefore && (
            <span
              className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: "color-mix(in oklch, var(--success) 12%, transparent)",
                color: "var(--success)",
                border: "1px solid color-mix(in oklch, var(--success) 25%, transparent)",
              }}
            >
              Verified Pro
            </span>
          )}
        </div>

        {/* Items list */}
        <ul className="space-y-2">
          {(isBefore ? beforeItems : afterItems).map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={i} className="flex items-center gap-2">
                {isBefore ? (
                  <X
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: "var(--destructive)" }}
                  />
                ) : (
                  <Check
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: "var(--success)" }}
                  />
                )}
                <Icon
                  className="w-3 h-3 shrink-0"
                  style={{
                    color: isBefore ? "var(--muted-foreground)" : "var(--primary)",
                  }}
                />
                <span
                  className="text-xs"
                  style={{
                    color: isBefore ? "var(--muted-foreground)" : "var(--foreground)",
                  }}
                >
                  {item.text}
                </span>
              </li>
            );
          })}
        </ul>

        {/* CTA row */}
        <div
          className="mt-3 pt-3 flex items-center justify-between"
          style={{
            borderTop: "1px solid color-mix(in oklch, var(--border) 60%, transparent)",
          }}
        >
          <span
            className="text-xs font-medium"
            style={{ color: "var(--muted-foreground)" }}
          >
            {isBefore ? "Would you open your door?" : "$85/hr · Same-Day Available"}
          </span>
          <span
            className="text-xs font-semibold px-3 py-1 rounded-md"
            style={{
              backgroundColor: isBefore
                ? "color-mix(in oklch, var(--muted) 80%, transparent)"
                : "var(--primary)",
              color: isBefore ? "var(--muted-foreground)" : "var(--primary-foreground)",
            }}
          >
            {isBefore ? "Maybe…" : "Book Now"}
          </span>
        </div>
      </div>
    </div>
  );
}
