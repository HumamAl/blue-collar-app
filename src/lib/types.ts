import type { LucideIcon } from "lucide-react";

// ─── Layout / Navigation ────────────────────────────────────────────────────

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// ─── Challenges Page ────────────────────────────────────────────────────────

export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// ─── Proposal Page ──────────────────────────────────────────────────────────

export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// ─── Marketplace Domain Types ────────────────────────────────────────────────

/**
 * The 10 trade categories available on the platform.
 */
export type TradeCategory =
  | "Plumbing"
  | "Electrical"
  | "HVAC"
  | "Moving"
  | "Painting"
  | "Landscaping"
  | "Cleaning"
  | "Handyman"
  | "Roofing"
  | "Carpentry";

/**
 * Lifecycle status of a job posting from creation through resolution.
 * "Requested" = posted but no pro has quoted yet.
 * "Quoted" = at least one quote received, awaiting homeowner acceptance.
 * "Confirmed" = homeowner accepted a quote, booking created.
 * "In Progress" = pro has started the work on-site.
 * "Completed" = job finished and signed off.
 * "Cancelled" = job cancelled before work started.
 * "Disputed" = homeowner or pro raised a dispute after work.
 * "No-Show" = pro failed to show up for a confirmed booking.
 */
export type JobStatus =
  | "Requested"
  | "Quoted"
  | "Confirmed"
  | "In Progress"
  | "Completed"
  | "Cancelled"
  | "Disputed"
  | "No-Show";

/**
 * Account standing for a pro on the platform.
 * "Active" = verified, in good standing, can receive job requests.
 * "Pending Verification" = documents submitted, awaiting review.
 * "Suspended" = temporarily restricted due to complaint or non-compliance.
 * "License Expired" = trade license lapsed — cannot accept new jobs.
 * "Background Check Failed" = failed criminal background screen.
 */
export type ProStatus =
  | "Active"
  | "Pending Verification"
  | "Suspended"
  | "License Expired"
  | "Background Check Failed";

/**
 * Urgency tier set by the homeowner when posting a job.
 * Emergency jobs carry a 2x rate multiplier.
 */
export type UrgencyLevel = "Standard" | "Same-Day" | "Emergency";

/** Booking-level status (subset of JobStatus — only confirmed engagements). */
export type BookingStatus = "Confirmed" | "In Progress" | "Completed" | "Cancelled";

/** Payout status for pro earnings. */
export type PayoutStatus = "Paid" | "Processing" | "Scheduled" | "Instant Pay";

// ─── Core Entities ───────────────────────────────────────────────────────────

/**
 * A verified service professional ("Pro") registered on the platform.
 */
export interface Pro {
  id: string;
  name: string;
  /** Registered business name, e.g. "Apex Plumbing & Drain LLC" */
  businessName: string;
  trade: TradeCategory;
  status: ProStatus;
  /** Weighted average of all received reviews (1.0–5.0) */
  rating: number;
  reviewCount: number;
  jobsCompleted: number;
  /** Base hourly rate in USD */
  hourlyRate: number;
  /** Human-readable service territory, e.g. "Austin Metro — 15mi radius" */
  serviceArea: string;
  /** Average response time string, e.g. "45 min avg" */
  responseTime: string;
  licensed: boolean;
  insured: boolean;
  backgroundCheck: boolean;
  joinedDate: string;
  /** Two-letter initials for avatar fallback */
  avatarInitials: string;
  /** Percentage of accepted jobs completed without cancellation (0–100) */
  completionRate: number;
}

/**
 * A job request posted by a homeowner.
 */
export interface Job {
  id: string;
  /** Short descriptive title, e.g. "Drain Cleaning — Kitchen Sink" */
  title: string;
  category: TradeCategory;
  status: JobStatus;
  urgency: UrgencyLevel;
  homeowner: string;
  homeownerLocation: string;
  /** Pro name assigned to this job — undefined if unmatched/unquoted */
  pro?: string;
  /** Pro ID for relational lookups — undefined if unmatched */
  proId?: string;
  /** Job amount in USD (includes Emergency 2x multiplier when applicable) */
  amount: number;
  createdAt: string;
  scheduledDate?: string;
  completedDate?: string;
  description: string;
  /** Notes on cancellation or dispute reason, present when relevant */
  statusNote?: string;
}

/**
 * A confirmed booking — created when a homeowner accepts a pro's quote.
 * Every booking corresponds to a Job in "Confirmed" or later status.
 */
export interface Booking {
  id: string;
  /** References Job.id */
  jobId: string;
  /** References Pro.id */
  proId: string;
  proName: string;
  homeowner: string;
  category: TradeCategory;
  service: string;
  status: BookingStatus;
  /** Total job amount charged to homeowner in USD */
  amount: number;
  /** Platform service fee (15% of amount) */
  platformFee: number;
  scheduledDate: string;
  completedDate?: string;
}

/**
 * A homeowner review left after a completed job.
 */
export interface Review {
  id: string;
  /** References Job.id */
  jobId: string;
  proName: string;
  /** References Pro.id */
  proId: string;
  homeowner: string;
  category: TradeCategory;
  /** Integer 1–5 */
  rating: number;
  comment: string;
  date: string;
  service: string;
}

/**
 * Monthly earnings record for a pro, used on the Earnings page.
 */
export interface EarningRecord {
  id: string;
  /** References Pro.id */
  proId: string;
  proName: string;
  category: TradeCategory;
  /** Human-readable period, e.g. "Feb 2026" */
  period: string;
  jobsCompleted: number;
  grossEarnings: number;
  /** Platform service fee deducted (15%) */
  platformFee: number;
  netEarnings: number;
  payoutStatus: PayoutStatus;
  payoutDate?: string;
}

// ─── Chart / Analytics Data Shapes ──────────────────────────────────────────

/**
 * Monthly platform-wide metrics for the main trend chart.
 */
export interface MonthlyMetric {
  month: string;
  jobs: number;
  revenue: number;
  newPros: number;
  disputes: number;
}

/**
 * Per-category breakdown for the category distribution chart.
 */
export interface CategoryBreakdown {
  category: TradeCategory;
  jobs: number;
  revenue: number;
  avgRating: number;
}

// ─── Dashboard KPIs ──────────────────────────────────────────────────────────

/**
 * KPI summary object for the main dashboard stat cards.
 * All "Change" fields are percentage-point deltas vs. prior month.
 */
export interface DashboardStats {
  activeJobs: number;
  /** % change vs prior month */
  activeJobsChange: number;
  activePros: number;
  activeProsChange: number;
  bookingsThisMonth: number;
  bookingsChange: number;
  /** Platform-wide weighted average rating */
  avgRating: number;
  avgRatingChange: number;
  /** Percentage of accepted jobs completed without cancellation or no-show */
  completionRate: number;
  completionRateChange: number;
  /** Platform gross revenue this month in USD */
  monthlyRevenue: number;
  monthlyRevenueChange: number;
  /** Percentage of completed jobs that resulted in a dispute */
  disputeRate: number;
  disputeRateChange: number;
}
