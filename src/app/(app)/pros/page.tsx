"use client";

import { useState, useMemo } from "react";
import { Search, Star, MapPin, ChevronDown, ChevronUp, ShieldCheck, BadgeCheck, UserCheck } from "lucide-react";
import { pros } from "@/data/mock-data";
import type { Pro, TradeCategory, ProStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ─── Pro Status Badge ─────────────────────────────────────────────────────────

function ProStatusBadge({ status }: { status: ProStatus }) {
  const config: Record<ProStatus, { label: string; className: string }> = {
    Active:                    { label: "Active",                    className: "text-[color:var(--success)] bg-[color:var(--success)]/10 border-0" },
    "Pending Verification":    { label: "Pending Review",            className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-0" },
    Suspended:                 { label: "Suspended",                 className: "text-destructive bg-destructive/10 border-0" },
    "License Expired":         { label: "License Expired",           className: "text-destructive bg-destructive/10 border-0" },
    "Background Check Failed": { label: "BG Check Failed",          className: "text-destructive bg-destructive/10 border-0" },
  };
  const c = config[status];
  return (
    <Badge variant="outline" className={cn("text-xs font-medium rounded-full px-2.5 py-0.5 shrink-0", c.className)}>
      {c.label}
    </Badge>
  );
}

// ─── Trade Badge ──────────────────────────────────────────────────────────────

function TradeBadge({ trade }: { trade: TradeCategory }) {
  return (
    <Badge variant="outline" className="text-xs font-medium rounded-full border-border/60 text-foreground bg-muted/50">
      {trade}
    </Badge>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  if (rating === 0) {
    return <span className="text-xs text-muted-foreground">No ratings yet</span>;
  }
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={cn(
              "w-3.5 h-3.5",
              i <= Math.round(rating)
                ? "fill-[color:var(--warning)] text-[color:var(--warning)]"
                : "text-border fill-border"
            )}
          />
        ))}
      </div>
      <span className="text-sm font-semibold tabular-nums">{rating.toFixed(1)}</span>
      <span className="text-xs text-muted-foreground">({count})</span>
    </div>
  );
}

// ─── Trust Badges ─────────────────────────────────────────────────────────────

function TrustBadges({ pro }: { pro: Pro }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className={cn("flex items-center gap-1 text-xs font-medium", pro.licensed ? "text-[color:var(--success)]" : "text-muted-foreground line-through")}>
        <ShieldCheck className="w-3.5 h-3.5" />
        Licensed
      </span>
      <span className={cn("flex items-center gap-1 text-xs font-medium", pro.insured ? "text-[color:var(--success)]" : "text-muted-foreground line-through")}>
        <BadgeCheck className="w-3.5 h-3.5" />
        Insured
      </span>
      <span className={cn("flex items-center gap-1 text-xs font-medium", pro.backgroundCheck ? "text-[color:var(--success)]" : "text-muted-foreground line-through")}>
        <UserCheck className="w-3.5 h-3.5" />
        Background Check
      </span>
    </div>
  );
}

// ─── Completion Rate Bar ──────────────────────────────────────────────────────

function CompletionBar({ rate }: { rate: number }) {
  if (rate === 0) return null;
  const fillClass =
    rate >= 90
      ? "bg-[color:var(--success)]"
      : rate >= 80
      ? "bg-[color:var(--warning)]"
      : "bg-destructive";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", fillClass)}
          style={{ width: `${rate}%` }}
        />
      </div>
      <span className="text-xs tabular-nums text-muted-foreground font-mono w-8 text-right">{rate}%</span>
    </div>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TRADE_CATEGORIES: TradeCategory[] = [
  "Plumbing", "Electrical", "HVAC", "Moving", "Painting",
  "Landscaping", "Cleaning", "Handyman", "Roofing", "Carpentry",
];

const PRO_STATUSES: ProStatus[] = [
  "Active", "Pending Verification", "Suspended", "License Expired", "Background Check Failed",
];

type SortOption = "rating" | "jobs" | "hourlyRate";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProDirectoryPage() {
  const [search, setSearch]             = useState("");
  const [tradeFilter, setTradeFilter]   = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy]             = useState<SortOption>("rating");
  const [sortDir, setSortDir]           = useState<"asc" | "desc">("desc");

  const displayed = useMemo(() => {
    return pros
      .filter((pro) => {
        const matchesTrade  = tradeFilter  === "all" || pro.trade  === tradeFilter;
        const matchesStatus = statusFilter === "all" || pro.status === statusFilter;
        const q = search.toLowerCase();
        const matchesSearch =
          q === "" ||
          pro.name.toLowerCase().includes(q) ||
          pro.businessName.toLowerCase().includes(q) ||
          pro.serviceArea.toLowerCase().includes(q) ||
          pro.id.toLowerCase().includes(q);
        return matchesTrade && matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        const av = sortBy === "rating" ? a.rating : sortBy === "jobs" ? a.jobsCompleted : a.hourlyRate;
        const bv = sortBy === "rating" ? b.rating : sortBy === "jobs" ? b.jobsCompleted : b.hourlyRate;
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, tradeFilter, statusFilter, sortBy, sortDir]);

  function handleSortToggle(key: SortOption) {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("desc");
    }
  }

  return (
    <div className="page-container space-y-6">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight aesthetic-heading">Pro Directory</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Verified service professionals — browse credentials, ratings, and service coverage.
          </p>
        </div>
        <Button size="sm">Invite Pro</Button>
      </div>

      {/* ── Filter Bar ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search pros, businesses, service areas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={tradeFilter} onValueChange={setTradeFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All Trades" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Trades</SelectItem>
            {TRADE_CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {PRO_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort toggle group */}
        <div className="flex items-center gap-1 border border-border/60 rounded-lg p-1">
          {(["rating", "jobs", "hourlyRate"] as SortOption[]).map((key) => {
            const label = key === "rating" ? "Top Rated" : key === "jobs" ? "Most Jobs" : "By Rate";
            const isActive = sortBy === key;
            return (
              <button
                key={key}
                onClick={() => handleSortToggle(key)}
                className={cn(
                  "flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-md transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {label}
                {isActive && (
                  sortDir === "desc"
                    ? <ChevronDown className="w-3 h-3" />
                    : <ChevronUp className="w-3 h-3" />
                )}
              </button>
            );
          })}
        </div>

        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length} {displayed.length === 1 ? "pro" : "pros"}
        </span>
      </div>

      {/* ── Card Grid ───────────────────────────────────────────────── */}
      {displayed.length === 0 ? (
        <div className="aesthetic-card flex items-center justify-center h-48">
          <p className="text-sm text-muted-foreground">No pros match this filter. Try adjusting trade or status.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map((pro, index) => (
            <Card
              key={pro.id}
              className={cn(
                "aesthetic-card p-0 overflow-hidden cursor-pointer",
                (pro.status === "License Expired" || pro.status === "Background Check Failed") &&
                  "border-destructive/40"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader className="p-4 pb-3">
                {/* Avatar + name */}
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 text-white",
                      pro.status === "Active"
                        ? "bg-primary"
                        : pro.status === "Pending Verification"
                        ? "bg-[color:var(--warning)]"
                        : "bg-muted-foreground"
                    )}
                  >
                    {pro.avatarInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground leading-tight">{pro.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{pro.businessName}</p>
                      </div>
                      <ProStatusBadge status={pro.status} />
                    </div>
                  </div>
                </div>

                {/* Trade + Rating */}
                <div className="flex items-center justify-between mt-3">
                  <TradeBadge trade={pro.trade} />
                  <StarRating rating={pro.rating} count={pro.reviewCount} />
                </div>
              </CardHeader>

              <CardContent className="px-4 pb-4 space-y-3">
                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-muted/50 rounded-md py-2">
                    <p className="text-sm font-bold tabular-nums text-foreground">{pro.jobsCompleted}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Jobs</p>
                  </div>
                  <div className="bg-muted/50 rounded-md py-2">
                    <p className="text-sm font-bold tabular-nums text-foreground">${pro.hourlyRate}/hr</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Rate</p>
                  </div>
                  <div className="bg-muted/50 rounded-md py-2">
                    <p className="text-sm font-bold tabular-nums text-foreground leading-tight">{pro.responseTime}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Response</p>
                  </div>
                </div>

                {/* Completion rate */}
                {pro.completionRate > 0 && (
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1.5">Completion Rate</p>
                    <CompletionBar rate={pro.completionRate} />
                  </div>
                )}

                {/* Service area */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{pro.serviceArea}</span>
                </div>

                {/* Trust badges */}
                <div className="pt-2 border-t border-border/40">
                  <TrustBadges pro={pro} />
                </div>

                {/* Edge case alert */}
                {pro.status === "License Expired" && (
                  <p className="text-xs text-destructive font-medium bg-destructive/10 rounded px-2 py-1.5">
                    Trade license lapsed — cannot accept new jobs until renewed.
                  </p>
                )}
                {pro.status === "Background Check Failed" && (
                  <p className="text-xs text-destructive font-medium bg-destructive/10 rounded px-2 py-1.5">
                    Background check failed — account restricted pending review.
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
