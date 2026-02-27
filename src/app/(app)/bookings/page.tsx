"use client";

import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, Download, CheckCircle2, Clock, Circle, XCircle } from "lucide-react";
import { bookings } from "@/data/mock-data";
import type { Booking, BookingStatus, TradeCategory } from "@/lib/types";
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

// ─── Booking Status Badge ─────────────────────────────────────────────────────

function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const config: Record<BookingStatus, { label: string; className: string }> = {
    Completed:   { label: "Completed",   className: "text-[color:var(--success)] bg-[color:var(--success)]/10 border-0" },
    "In Progress": { label: "In Progress", className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-0" },
    Confirmed:   { label: "Confirmed",   className: "text-primary bg-primary/10 border-0" },
    Cancelled:   { label: "Cancelled",   className: "text-destructive bg-destructive/10 border-0" },
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

// ─── Status Pipeline ──────────────────────────────────────────────────────────

const PIPELINE_STAGES: BookingStatus[] = ["Confirmed", "In Progress", "Completed"];

function StatusPipeline({ status }: { status: BookingStatus }) {
  if (status === "Cancelled") {
    return (
      <div className="flex items-center gap-1">
        <XCircle className="w-3.5 h-3.5 text-destructive" />
        <span className="text-xs text-destructive font-medium">Cancelled</span>
      </div>
    );
  }

  const currentIdx = PIPELINE_STAGES.indexOf(status);

  return (
    <div className="flex items-center gap-0.5">
      {PIPELINE_STAGES.map((stage, i) => {
        const isDone    = i < currentIdx;
        const isCurrent = i === currentIdx;
        return (
          <div key={stage} className="flex items-center gap-0.5">
            {i > 0 && (
              <div
                className={cn(
                  "w-4 h-px",
                  isDone || isCurrent ? "bg-primary" : "bg-border"
                )}
              />
            )}
            {isDone ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-[color:var(--success)]" />
            ) : isCurrent ? (
              <Clock className="w-3.5 h-3.5 text-[color:var(--warning)]" />
            ) : (
              <Circle className="w-3.5 h-3.5 text-border" />
            )}
          </div>
        );
      })}
    </div>
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

const BOOKING_STATUSES: BookingStatus[] = ["Confirmed", "In Progress", "Completed", "Cancelled"];

const TRADE_CATEGORIES: TradeCategory[] = [
  "Plumbing", "Electrical", "HVAC", "Moving", "Painting",
  "Landscaping", "Cleaning", "Handyman", "Roofing", "Carpentry",
];

type SortKey = "id" | "proName" | "homeowner" | "amount" | "platformFee" | "scheduledDate" | "status";

// ─── Summary stats derived from all bookings ──────────────────────────────────

const totalAmount      = bookings.reduce((s, b) => s + b.amount, 0);
const totalFees        = bookings.reduce((s, b) => s + b.platformFee, 0);
const completedCount   = bookings.filter((b) => b.status === "Completed").length;
const inProgressCount  = bookings.filter((b) => b.status === "In Progress").length;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BookingsPage() {
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortKey, setSortKey]           = useState<SortKey>("scheduledDate");
  const [sortDir, setSortDir]           = useState<"asc" | "desc">("desc");

  const displayed = useMemo(() => {
    return bookings
      .filter((b) => {
        const matchesStatus   = statusFilter   === "all" || b.status   === statusFilter;
        const matchesCategory = categoryFilter === "all" || b.category === categoryFilter;
        const q = search.toLowerCase();
        const matchesSearch =
          q === "" ||
          b.id.toLowerCase().includes(q) ||
          b.proName.toLowerCase().includes(q) ||
          b.homeowner.toLowerCase().includes(q) ||
          b.service.toLowerCase().includes(q) ||
          b.jobId.toLowerCase().includes(q);
        return matchesStatus && matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        let av: string | number, bv: string | number;
        if (sortKey === "amount")          { av = a.amount;        bv = b.amount; }
        else if (sortKey === "platformFee"){ av = a.platformFee;   bv = b.platformFee; }
        else if (sortKey === "scheduledDate") { av = a.scheduledDate; bv = b.scheduledDate; }
        else if (sortKey === "proName")    { av = a.proName;       bv = b.proName; }
        else if (sortKey === "homeowner")  { av = a.homeowner;     bv = b.homeowner; }
        else if (sortKey === "status")     { av = a.status;        bv = b.status; }
        else                               { av = a.id;            bv = b.id; }
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, statusFilter, categoryFilter, sortKey, sortDir]);

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
          <h1 className="text-2xl font-bold tracking-tight aesthetic-heading">Bookings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Confirmed engagements between homeowners and service pros — including platform fee breakdown.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* ── Summary Cards ───────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="aesthetic-card">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total Bookings</p>
            <p className="text-2xl font-bold tabular-nums text-foreground">{bookings.length}</p>
            <p className="text-xs text-muted-foreground mt-1">{completedCount} completed</p>
          </CardContent>
        </Card>
        <Card className="aesthetic-card">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Gross Value</p>
            <p className="text-2xl font-bold tabular-nums text-foreground">{formatCurrency(totalAmount)}</p>
            <p className="text-xs text-muted-foreground mt-1">across all bookings</p>
          </CardContent>
        </Card>
        <Card className="aesthetic-card">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Platform Fees</p>
            <p className="text-2xl font-bold tabular-nums text-[color:var(--success)]">{formatCurrency(totalFees)}</p>
            <p className="text-xs text-muted-foreground mt-1">15% service fee</p>
          </CardContent>
        </Card>
        <Card className="aesthetic-card">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">In Progress</p>
            <p className="text-2xl font-bold tabular-nums text-[color:var(--warning)]">{inProgressCount}</p>
            <p className="text-xs text-muted-foreground mt-1">active right now</p>
          </CardContent>
        </Card>
      </div>

      {/* ── Filter Bar ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings, pros, homeowners..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {BOOKING_STATUSES.map((s) => (
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
          {displayed.length} {displayed.length === 1 ? "booking" : "bookings"}
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
                  Booking ID <SortIndicator column="id" />
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide min-w-[160px]">
                  Service
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors"
                  onClick={() => handleSort("proName")}
                >
                  Pro <SortIndicator column="proName" />
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors"
                  onClick={() => handleSort("homeowner")}
                >
                  Homeowner <SortIndicator column="homeowner" />
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Trade
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors"
                  onClick={() => handleSort("status")}
                >
                  Status <SortIndicator column="status" />
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide min-w-[120px]">
                  Lifecycle
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide text-right cursor-pointer select-none hover:text-foreground transition-colors"
                  onClick={() => handleSort("amount")}
                >
                  Amount <SortIndicator column="amount" />
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide text-right cursor-pointer select-none hover:text-foreground transition-colors"
                  onClick={() => handleSort("platformFee")}
                >
                  Platform Fee <SortIndicator column="platformFee" />
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors"
                  onClick={() => handleSort("scheduledDate")}
                >
                  Scheduled <SortIndicator column="scheduledDate" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="h-32 text-center text-sm text-muted-foreground">
                    No bookings match this filter. Try adjusting the status or trade category.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((booking) => (
                  <TableRow
                    key={booking.id}
                    className="hover:bg-[color:var(--surface-hover)] transition-colors"
                  >
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      <div>
                        <div>{booking.id}</div>
                        <div className="text-[10px] text-muted-foreground/70">{booking.jobId}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-foreground">
                      {booking.service}
                    </TableCell>
                    <TableCell className="text-sm text-foreground">
                      {booking.proName}
                    </TableCell>
                    <TableCell className="text-sm text-foreground">
                      {booking.homeowner}
                    </TableCell>
                    <TableCell>
                      <CategoryBadge category={booking.category} />
                    </TableCell>
                    <TableCell>
                      <BookingStatusBadge status={booking.status} />
                    </TableCell>
                    <TableCell>
                      <StatusPipeline status={booking.status} />
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm tabular-nums font-medium">
                      {formatCurrency(booking.amount)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm tabular-nums text-[color:var(--success)] font-medium">
                      {formatCurrency(booking.platformFee)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(booking.scheduledDate)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
