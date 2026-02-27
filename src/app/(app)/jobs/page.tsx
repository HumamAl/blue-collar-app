"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, AlertTriangle, Zap, Download } from "lucide-react";
import { jobs } from "@/data/mock-data";
import type { Job, TradeCategory, JobStatus } from "@/lib/types";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// ─── Status Badge ─────────────────────────────────────────────────────────────

function JobStatusBadge({ status }: { status: JobStatus }) {
  const config: Record<JobStatus, { label: string; className: string }> = {
    Completed:   { label: "Completed",   className: "text-[color:var(--success)] bg-[color:var(--success)]/10 border-0" },
    "In Progress": { label: "In Progress", className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-0" },
    Confirmed:   { label: "Confirmed",   className: "text-primary bg-primary/10 border-0" },
    Disputed:    { label: "Disputed",    className: "text-destructive bg-destructive/10 border-0" },
    Cancelled:   { label: "Cancelled",   className: "text-destructive bg-destructive/10 border-0" },
    "No-Show":   { label: "No-Show",     className: "text-destructive bg-destructive/10 border-0" },
    Requested:   { label: "Requested",   className: "text-muted-foreground bg-muted border-0" },
    Quoted:      { label: "Quoted",      className: "text-muted-foreground bg-muted border-0" },
  };
  const c = config[status];
  return (
    <Badge variant="outline" className={cn("text-xs font-medium rounded-full px-2.5 py-0.5", c.className)}>
      {c.label}
    </Badge>
  );
}

// ─── Category Badge ───────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: TradeCategory }) {
  return (
    <Badge variant="outline" className="text-xs font-medium rounded-full border-border/60 text-foreground bg-muted/50">
      {category}
    </Badge>
  );
}

// ─── Urgency Badge ────────────────────────────────────────────────────────────

function UrgencyBadge({ urgency }: { urgency: Job["urgency"] }) {
  if (urgency === "Standard") return null;
  if (urgency === "Emergency") {
    return (
      <Badge variant="outline" className="text-xs font-medium rounded-full border-0 text-destructive bg-destructive/10 gap-1">
        <Zap className="w-3 h-3" />
        Emergency
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-xs font-medium rounded-full border-0 text-[color:var(--warning)] bg-[color:var(--warning)]/10 gap-1">
      <AlertTriangle className="w-3 h-3" />
      Same-Day
    </Badge>
  );
}

// ─── Sort column helper ───────────────────────────────────────────────────────

type SortKey = "id" | "category" | "status" | "homeowner" | "amount" | "createdAt";

function formatCurrency(amount: number) {
  return amount === 0
    ? "—"
    : `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── All distinct trade categories from the dataset ──────────────────────────
const TRADE_CATEGORIES: TradeCategory[] = [
  "Plumbing", "Electrical", "HVAC", "Moving", "Painting",
  "Landscaping", "Cleaning", "Handyman", "Roofing", "Carpentry",
];

const JOB_STATUSES: JobStatus[] = [
  "Requested", "Quoted", "Confirmed", "In Progress",
  "Completed", "Cancelled", "Disputed", "No-Show",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function JobBoardPage() {
  const [search, setSearch]         = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter]     = useState<string>("all");
  const [sortKey, setSortKey]       = useState<SortKey>("createdAt");
  const [sortDir, setSortDir]       = useState<"asc" | "desc">("desc");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const displayed = useMemo(() => {
    return jobs
      .filter((job) => {
        const matchesCategory = categoryFilter === "all" || job.category === categoryFilter;
        const matchesStatus   = statusFilter   === "all" || job.status   === statusFilter;
        const q = search.toLowerCase();
        const matchesSearch   =
          q === "" ||
          job.id.toLowerCase().includes(q) ||
          job.title.toLowerCase().includes(q) ||
          job.homeowner.toLowerCase().includes(q) ||
          (job.pro ?? "").toLowerCase().includes(q);
        return matchesCategory && matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        let av: string | number, bv: string | number;
        if (sortKey === "amount")    { av = a.amount;    bv = b.amount; }
        else if (sortKey === "createdAt") { av = a.createdAt; bv = b.createdAt; }
        else if (sortKey === "category")  { av = a.category;  bv = b.category; }
        else if (sortKey === "status")    { av = a.status;     bv = b.status; }
        else if (sortKey === "homeowner") { av = a.homeowner;  bv = b.homeowner; }
        else                              { av = a.id;         bv = b.id; }
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, categoryFilter, statusFilter, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function SortIndicator({ column }: { column: SortKey }) {
    if (sortKey !== column) return null;
    return sortDir === "asc"
      ? <ChevronUp className="w-3 h-3 inline ml-1" />
      : <ChevronDown className="w-3 h-3 inline ml-1" />;
  }

  return (
    <div className="page-container space-y-6">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight aesthetic-heading">Job Board</h1>
          <p className="text-sm text-muted-foreground mt-1">
            All job requests across every trade category — from posting through completion.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button size="sm" className="gap-1.5">
            Post New Job
          </Button>
        </div>
      </div>

      {/* ── Filter Bar ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs, homeowners, pros..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-40">
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
          <SelectTrigger className="w-38">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {JOB_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length} {displayed.length === 1 ? "job" : "jobs"}
        </span>
      </div>

      {/* ── Table ───────────────────────────────────────────────────── */}
      <div className="aesthetic-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors"
                  onClick={() => handleSort("id")}
                >
                  Job ID <SortIndicator column="id" />
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide min-w-[200px]">
                  Title
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors"
                  onClick={() => handleSort("category")}
                >
                  Trade <SortIndicator column="category" />
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors"
                  onClick={() => handleSort("status")}
                >
                  Status <SortIndicator column="status" />
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors"
                  onClick={() => handleSort("homeowner")}
                >
                  Homeowner <SortIndicator column="homeowner" />
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Pro Assigned
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors text-right"
                  onClick={() => handleSort("amount")}
                >
                  Amount <SortIndicator column="amount" />
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors"
                  onClick={() => handleSort("createdAt")}
                >
                  Posted <SortIndicator column="createdAt" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center text-sm text-muted-foreground">
                    No jobs match this filter. Try adjusting the trade category or status.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((job) => (
                  <React.Fragment key={job.id}>
                    <TableRow
                      className="cursor-pointer hover:bg-[color:var(--surface-hover)] transition-colors"
                      onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
                    >
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {job.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-foreground leading-tight">
                            {job.title}
                          </span>
                          <UrgencyBadge urgency={job.urgency} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <CategoryBadge category={job.category} />
                      </TableCell>
                      <TableCell>
                        <JobStatusBadge status={job.status} />
                      </TableCell>
                      <TableCell className="text-sm text-foreground">
                        <div>
                          <div className="font-medium">{job.homeowner}</div>
                          <div className="text-xs text-muted-foreground">{job.homeownerLocation}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {job.pro ? (
                          <span className="text-foreground">{job.pro}</span>
                        ) : (
                          <span className="text-muted-foreground italic text-xs">Unassigned</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm tabular-nums font-medium">
                        {formatCurrency(job.amount)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(job.createdAt)}
                      </TableCell>
                    </TableRow>

                    {expandedId === job.id && (
                      <TableRow key={`${job.id}-expanded`}>
                        <TableCell colSpan={8} className="bg-muted/30 px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                                Service Description
                              </p>
                              <p className="text-foreground leading-relaxed">{job.description}</p>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                                  Urgency
                                </p>
                                <p className="text-foreground">{job.urgency}</p>
                              </div>
                              {job.scheduledDate && (
                                <div>
                                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                                    Scheduled Date
                                  </p>
                                  <p className="text-foreground">{formatDate(job.scheduledDate)}</p>
                                </div>
                              )}
                              {job.completedDate && (
                                <div>
                                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                                    Completed Date
                                  </p>
                                  <p className="text-foreground">{formatDate(job.completedDate)}</p>
                                </div>
                              )}
                            </div>
                            {job.statusNote && (
                              <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                                  Status Note
                                </p>
                                <p className="text-foreground italic">{job.statusNote}</p>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
