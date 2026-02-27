"use client";

import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, TrendingUp, DollarSign, Banknote, Briefcase } from "lucide-react";
import { earningRecords } from "@/data/mock-data";
import type { EarningRecord, PayoutStatus, TradeCategory } from "@/lib/types";
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
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ─── Payout Status Badge ──────────────────────────────────────────────────────

function PayoutStatusBadge({ status }: { status: PayoutStatus }) {
  const config: Record<PayoutStatus, { label: string; className: string }> = {
    Paid:         { label: "Paid",         className: "text-[color:var(--success)] bg-[color:var(--success)]/10 border-0" },
    Processing:   { label: "Processing",   className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-0" },
    Scheduled:    { label: "Scheduled",    className: "text-primary bg-primary/10 border-0" },
    "Instant Pay":{ label: "Instant Pay",  className: "text-[color:var(--chart-5)] bg-[color:var(--chart-5)]/10 border-0" },
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

// ─── Formatters ───────────────────────────────────────────────────────────────

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PAYOUT_STATUSES: PayoutStatus[] = ["Paid", "Processing", "Scheduled", "Instant Pay"];

const TRADE_CATEGORIES: TradeCategory[] = [
  "Plumbing", "Electrical", "HVAC", "Moving", "Painting",
  "Landscaping", "Cleaning", "Handyman", "Roofing", "Carpentry",
];

const PERIODS = [...new Set(earningRecords.map((e) => e.period))];

type SortKey = "proName" | "category" | "period" | "jobsCompleted" | "grossEarnings" | "platformFee" | "netEarnings" | "payoutStatus";

// ─── Derived summary stats ────────────────────────────────────────────────────

const totalGross     = earningRecords.reduce((s, e) => s + e.grossEarnings, 0);
const totalFees      = earningRecords.reduce((s, e) => s + e.platformFee, 0);
const totalNet       = earningRecords.reduce((s, e) => s + e.netEarnings, 0);
const totalJobs      = earningRecords.reduce((s, e) => s + e.jobsCompleted, 0);
const avgPerJob      = totalGross / totalJobs;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EarningsPage() {
  const [search, setSearch]             = useState("");
  const [periodFilter, setPeriodFilter] = useState<string>("all");
  const [payoutFilter, setPayoutFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortKey, setSortKey]           = useState<SortKey>("grossEarnings");
  const [sortDir, setSortDir]           = useState<"asc" | "desc">("desc");

  const displayed = useMemo(() => {
    return earningRecords
      .filter((e) => {
        const matchesPeriod   = periodFilter   === "all" || e.period        === periodFilter;
        const matchesPayout   = payoutFilter   === "all" || e.payoutStatus  === payoutFilter;
        const matchesCategory = categoryFilter === "all" || e.category      === categoryFilter;
        const q = search.toLowerCase();
        const matchesSearch =
          q === "" ||
          e.proName.toLowerCase().includes(q) ||
          e.id.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q);
        return matchesPeriod && matchesPayout && matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        let av: string | number, bv: string | number;
        if      (sortKey === "grossEarnings") { av = a.grossEarnings;  bv = b.grossEarnings; }
        else if (sortKey === "platformFee")   { av = a.platformFee;    bv = b.platformFee; }
        else if (sortKey === "netEarnings")   { av = a.netEarnings;    bv = b.netEarnings; }
        else if (sortKey === "jobsCompleted") { av = a.jobsCompleted;  bv = b.jobsCompleted; }
        else if (sortKey === "proName")       { av = a.proName;        bv = b.proName; }
        else if (sortKey === "category")      { av = a.category;       bv = b.category; }
        else if (sortKey === "period")        { av = a.period;         bv = b.period; }
        else                                  { av = a.payoutStatus;   bv = b.payoutStatus; }
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, periodFilter, payoutFilter, categoryFilter, sortKey, sortDir]);

  const filteredGross = displayed.reduce((s, e) => s + e.grossEarnings, 0);
  const filteredFees  = displayed.reduce((s, e) => s + e.platformFee, 0);
  const filteredNet   = displayed.reduce((s, e) => s + e.netEarnings, 0);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
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
          <h1 className="text-2xl font-bold tracking-tight aesthetic-heading">Earnings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Pro earnings by period — gross, platform fee deductions, and net payout status.
          </p>
        </div>
        <Button size="sm">Run Payout</Button>
      </div>

      {/* ── Summary Cards ───────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="aesthetic-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Gross Earnings</p>
            </div>
            <p className="text-2xl font-bold tabular-nums text-foreground">{formatCurrency(totalGross)}</p>
            <p className="text-xs text-muted-foreground mt-1">all periods</p>
          </CardContent>
        </Card>
        <Card className="aesthetic-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Platform Fees</p>
            </div>
            <p className="text-2xl font-bold tabular-nums text-[color:var(--success)]">{formatCurrency(totalFees)}</p>
            <p className="text-xs text-muted-foreground mt-1">15% service fee</p>
          </CardContent>
        </Card>
        <Card className="aesthetic-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Banknote className="w-4 h-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Net to Pros</p>
            </div>
            <p className="text-2xl font-bold tabular-nums text-foreground">{formatCurrency(totalNet)}</p>
            <p className="text-xs text-muted-foreground mt-1">after fees</p>
          </CardContent>
        </Card>
        <Card className="aesthetic-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Avg per Job</p>
            </div>
            <p className="text-2xl font-bold tabular-nums text-foreground">{formatCurrency(avgPerJob)}</p>
            <p className="text-xs text-muted-foreground mt-1">{totalJobs} jobs total</p>
          </CardContent>
        </Card>
      </div>

      {/* ── Filter Bar ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search pros, trade categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={periodFilter} onValueChange={setPeriodFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="All Periods" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Periods</SelectItem>
            {PERIODS.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={payoutFilter} onValueChange={setPayoutFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All Payouts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payouts</SelectItem>
            {PAYOUT_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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

        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length} {displayed.length === 1 ? "record" : "records"}
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
                  onClick={() => handleSort("proName")}
                >
                  Pro Name <SortIndicator column="proName" />
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors"
                  onClick={() => handleSort("category")}
                >
                  Trade <SortIndicator column="category" />
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors"
                  onClick={() => handleSort("period")}
                >
                  Period <SortIndicator column="period" />
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors text-right"
                  onClick={() => handleSort("jobsCompleted")}
                >
                  Jobs <SortIndicator column="jobsCompleted" />
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors text-right"
                  onClick={() => handleSort("grossEarnings")}
                >
                  Gross <SortIndicator column="grossEarnings" />
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors text-right"
                  onClick={() => handleSort("platformFee")}
                >
                  Platform Fee <SortIndicator column="platformFee" />
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors text-right"
                  onClick={() => handleSort("netEarnings")}
                >
                  Net Payout <SortIndicator column="netEarnings" />
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors"
                  onClick={() => handleSort("payoutStatus")}
                >
                  Payout Status <SortIndicator column="payoutStatus" />
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Payout Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-32 text-center text-sm text-muted-foreground">
                    No earning records match this filter. Try adjusting the period or payout status.
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {displayed.map((record) => (
                    <TableRow
                      key={record.id}
                      className="hover:bg-[color:var(--surface-hover)] transition-colors"
                    >
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium text-foreground">{record.proName}</p>
                          <p className="text-xs text-muted-foreground font-mono">{record.proId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <CategoryBadge category={record.category} />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground font-medium">
                        {record.period}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm tabular-nums font-semibold text-foreground">
                        {record.jobsCompleted}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm tabular-nums font-semibold text-foreground">
                        {formatCurrency(record.grossEarnings)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm tabular-nums text-[color:var(--success)] font-semibold">
                        {formatCurrency(record.platformFee)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm tabular-nums font-bold text-foreground">
                        {formatCurrency(record.netEarnings)}
                      </TableCell>
                      <TableCell>
                        <PayoutStatusBadge status={record.payoutStatus} />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {record.payoutDate ? formatDate(record.payoutDate) : "—"}
                      </TableCell>
                    </TableRow>
                  ))}

                  {/* ── Filtered totals row ────────────────────────── */}
                  {displayed.length > 1 && (
                    <TableRow className="bg-muted/30 hover:bg-muted/40 transition-colors border-t border-border">
                      <TableCell colSpan={3} className="text-xs font-semibold text-muted-foreground uppercase tracking-wide py-3">
                        Filtered Total ({displayed.length} records)
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm tabular-nums font-bold text-foreground">
                        {displayed.reduce((s, e) => s + e.jobsCompleted, 0)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm tabular-nums font-bold text-foreground">
                        {formatCurrency(filteredGross)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm tabular-nums font-bold text-[color:var(--success)]">
                        {formatCurrency(filteredFees)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm tabular-nums font-bold text-foreground">
                        {formatCurrency(filteredNet)}
                      </TableCell>
                      <TableCell colSpan={2} />
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
