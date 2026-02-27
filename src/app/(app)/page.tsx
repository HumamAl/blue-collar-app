"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Briefcase,
  Users,
  CalendarCheck,
  Star,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_CONFIG } from "@/lib/config";
import {
  dashboardStats,
  monthlyMetrics,
  categoryBreakdown,
  jobs,
} from "@/data/mock-data";
import type { DashboardStats, MonthlyMetric, Job, JobStatus } from "@/lib/types";

// ── SSR-safe dynamic chart imports ────────────────────────────────────────────
const JobsVolumeChart = dynamic(
  () =>
    import("@/components/dashboard/jobs-volume-chart").then(
      (m) => m.JobsVolumeChart
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[280px] bg-muted/30 rounded-lg animate-pulse" />
    ),
  }
);

const CategoryBarChart = dynamic(
  () =>
    import("@/components/dashboard/category-bar-chart").then(
      (m) => m.CategoryBarChart
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[280px] bg-muted/30 rounded-lg animate-pulse" />
    ),
  }
);

// ── Animated counter hook ─────────────────────────────────────────────────────
function useCountUp(target: number, duration: number = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ── Stat card ─────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  rawValue: number;
  change: number;
  format: "count" | "currency" | "rating" | "percent";
  icon: React.ReactNode;
  suffix?: string;
  index: number;
  description: string;
}

function StatCard({
  label,
  rawValue,
  change,
  format,
  icon,
  suffix,
  index,
  description,
}: StatCardProps) {
  // For animated counter, use integer-scaled version of the value
  const counterTarget =
    format === "rating" ? Math.round(rawValue * 10) : Math.round(rawValue);
  const { count, ref } = useCountUp(counterTarget, 1100 + index * 80);

  const displayValue = () => {
    if (format === "currency") {
      const animated = (count / 1) as number;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(animated);
    }
    if (format === "rating") {
      return (count / 10).toFixed(1);
    }
    if (format === "percent") {
      return `${(count / 10).toFixed(1)}%`;
    }
    return count.toLocaleString();
  };

  const isPositive = change >= 0;
  const changeLabel = `${isPositive ? "+" : ""}${change.toFixed(1)}%`;

  return (
    <div
      ref={ref}
      className="aesthetic-card animate-fade-up-in"
      style={{
        padding: "var(--card-padding)",
        animationDelay: `${index * 50}ms`,
        animationDuration: "150ms",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="p-1.5 rounded-md bg-primary/8 text-primary">{icon}</div>
      </div>

      <div className="flex items-end gap-2 mb-1.5">
        <span className="text-2xl font-bold font-mono tabular-nums tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {displayValue()}
        </span>
        {suffix && (
          <span className="text-sm text-muted-foreground mb-0.5">{suffix}</span>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            "inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full",
            isPositive
              ? "text-success bg-success/10"
              : "text-destructive bg-destructive/10"
          )}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {changeLabel}
        </span>
        <span className="text-xs text-muted-foreground truncate">
          {description}
        </span>
      </div>
    </div>
  );
}

// ── Job status badge ──────────────────────────────────────────────────────────
function JobStatusBadge({ status }: { status: JobStatus }) {
  const config: Record<
    JobStatus,
    { label: string; className: string }
  > = {
    Completed: {
      label: "Completed",
      className: "bg-success/10 text-success border-success/20",
    },
    "In Progress": {
      label: "In Progress",
      className: "bg-warning/10 text-warning border-warning/20",
    },
    Confirmed: {
      label: "Confirmed",
      className: "bg-primary/10 text-primary border-primary/20",
    },
    Requested: {
      label: "Requested",
      className: "bg-muted text-muted-foreground border-border",
    },
    Quoted: {
      label: "Quoted",
      className: "bg-muted text-muted-foreground border-border",
    },
    Cancelled: {
      label: "Cancelled",
      className: "bg-destructive/10 text-destructive border-destructive/20",
    },
    Disputed: {
      label: "Disputed",
      className: "bg-destructive/10 text-destructive border-destructive/20",
    },
    "No-Show": {
      label: "No-Show",
      className: "bg-destructive/10 text-destructive border-destructive/20",
    },
  };

  const { label, className } = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
        className
      )}
    >
      {label}
    </span>
  );
}

// ── Category badge ────────────────────────────────────────────────────────────
function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-primary/6 text-primary border border-primary/15">
      {category}
    </span>
  );
}

// ── Period filter buttons ─────────────────────────────────────────────────────
type Period = "3m" | "6m";

// ── Main dashboard page ───────────────────────────────────────────────────────
export default function DashboardPage() {
  const [chartView, setChartView] = useState<"jobs" | "revenue">("jobs");
  const [period, setPeriod] = useState<Period>("6m");

  const stats: DashboardStats = dashboardStats;

  // Filter chart data based on selected period
  const chartData: MonthlyMetric[] = useMemo(() => {
    if (period === "3m") return monthlyMetrics.slice(-3);
    return monthlyMetrics;
  }, [period]);

  // Most recent 10 jobs for the activity feed
  const recentJobs: Job[] = useMemo(() => {
    return [...jobs]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 10);
  }, []);

  const statCards = [
    {
      label: "Active Jobs",
      rawValue: stats.activeJobs,
      change: stats.activeJobsChange,
      format: "count" as const,
      icon: <Briefcase className="w-4 h-4" />,
      description: "4 emergency · 3 same-day",
    },
    {
      label: "Verified Pros",
      rawValue: stats.activePros,
      change: stats.activeProsChange,
      format: "count" as const,
      icon: <Users className="w-4 h-4" />,
      description: "3 pending review",
    },
    {
      label: "Bookings This Month",
      rawValue: stats.bookingsThisMonth,
      change: stats.bookingsChange,
      format: "count" as const,
      icon: <CalendarCheck className="w-4 h-4" />,
      description: "91.3% completion rate",
    },
    {
      label: "Platform Rating",
      rawValue: stats.avgRating,
      change: stats.avgRatingChange,
      format: "rating" as const,
      icon: <Star className="w-4 h-4" />,
      suffix: "/ 5.0",
      description: "across all trades",
    },
    {
      label: "Monthly Revenue",
      rawValue: stats.monthlyRevenue,
      change: stats.monthlyRevenueChange,
      format: "currency" as const,
      icon: <DollarSign className="w-4 h-4" />,
      description: "$38.8k platform fees",
    },
  ];

  return (
    <div className="page-container space-y-6">
      {/* ── Page Header ────────────────────────────────────────────── */}
      <div>
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ letterSpacing: "var(--heading-tracking)" }}
        >
          Marketplace Pulse
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Platform-wide operations — jobs, pros, and revenue for Feb 2026
        </p>
      </div>

      {/* ── KPI Stat Cards ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((card, index) => (
          <StatCard key={card.label} {...card} index={index} />
        ))}
      </div>

      {/* ── Chart Row: Jobs Volume + Category Breakdown ────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Primary chart — Jobs Volume Trend */}
        <div className="lg:col-span-2 aesthetic-card" style={{ padding: 0 }}>
          <div className="px-5 pt-5 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold">
                {chartView === "jobs"
                  ? "Jobs Dispatched"
                  : "Platform Revenue"}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {chartView === "jobs"
                  ? "Total jobs closed and in-progress per month"
                  : "Gross revenue across all trade categories"}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Chart view toggle */}
              <div className="flex gap-1 p-1 bg-muted rounded-lg">
                {(["jobs", "revenue"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setChartView(v)}
                    className={cn(
                      "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                      chartView === v
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    style={{ transitionDuration: "var(--dur-fast)" }}
                  >
                    {v === "jobs" ? "Job Volume" : "Revenue"}
                  </button>
                ))}
              </div>

              {/* Period filter */}
              <div className="flex gap-1">
                {(["3m", "6m"] as Period[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={cn(
                      "px-2.5 py-1 text-xs rounded-md border transition-colors",
                      period === p
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border/60 text-muted-foreground hover:bg-muted/50"
                    )}
                    style={{ transitionDuration: "var(--dur-fast)" }}
                  >
                    {p === "3m" ? "3 Mo" : "6 Mo"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="px-2 pb-4">
            <JobsVolumeChart data={chartData} view={chartView} />
          </div>
        </div>

        {/* Secondary chart — Category Breakdown */}
        <div className="aesthetic-card" style={{ padding: 0 }}>
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-base font-semibold">Jobs by Trade</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Booking volume across all 10 categories
            </p>
          </div>
          <div className="px-2 pb-4">
            <CategoryBarChart data={categoryBreakdown} />
          </div>
        </div>
      </div>

      {/* ── Recent Job Activity Feed ────────────────────────────────── */}
      <div className="aesthetic-card" style={{ padding: 0 }}>
        <div className="px-5 pt-5 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">Recent Job Activity</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Latest bookings across all trades — last 10 jobs
            </p>
          </div>
          <a
            href="/jobs"
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
            style={{ transitionDuration: "var(--dur-fast)" }}
          >
            View all jobs
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Table header */}
        <div className="px-5 pb-1">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-3 text-xs font-medium text-muted-foreground uppercase tracking-wide border-b border-border pb-2">
            <span>Job</span>
            <span className="hidden md:block">Trade</span>
            <span>Status</span>
            <span className="hidden sm:block">Pro</span>
            <span className="text-right">Amount</span>
          </div>
        </div>

        {/* Job rows */}
        <div className="divide-y divide-border/60">
          {recentJobs.map((job) => (
            <div
              key={job.id}
              className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-3 px-5 py-3 items-center aesthetic-hover"
            >
              {/* Job title + homeowner */}
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{job.title}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {job.homeowner} · {job.homeownerLocation}
                </p>
              </div>

              {/* Trade category */}
              <div className="hidden md:block">
                <CategoryBadge category={job.category} />
              </div>

              {/* Status */}
              <div>
                <JobStatusBadge status={job.status} />
              </div>

              {/* Pro name */}
              <div className="hidden sm:block min-w-0">
                {job.pro ? (
                  <p className="text-sm text-muted-foreground truncate max-w-[120px]">
                    {job.pro}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground italic">
                    Unassigned
                  </p>
                )}
              </div>

              {/* Amount */}
              <div className="text-right">
                {job.amount > 0 ? (
                  <p className="text-sm font-mono font-semibold tabular-nums">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }).format(job.amount)}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">—</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Proposal Banner ────────────────────────────────────────── */}
      <div className="linear-card p-4 border-primary/15 bg-gradient-to-r from-primary/5 to-transparent flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">
            This is a live demo built for{" "}
            {APP_CONFIG.clientName ?? APP_CONFIG.projectName}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Humam · Full-Stack Developer · Available now
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/challenges"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            style={{ transitionDuration: "var(--dur-fast)" }}
          >
            My approach →
          </a>
          <a
            href="/proposal"
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors"
            style={{ transitionDuration: "var(--dur-fast)" }}
          >
            Work with me
          </a>
        </div>
      </div>
    </div>
  );
}
