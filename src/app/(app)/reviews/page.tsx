"use client";

import { useState, useMemo } from "react";
import { Search, Star } from "lucide-react";
import { reviews } from "@/data/mock-data";
import type { Review, TradeCategory } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ─── Category Badge ───────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: TradeCategory }) {
  return (
    <Badge variant="outline" className="text-xs font-medium rounded-full border-border/60 text-foreground bg-muted/50">
      {category}
    </Badge>
  );
}

// ─── Star display ─────────────────────────────────────────────────────────────

function StarDisplay({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sz = size === "lg" ? "w-5 h-5" : size === "md" ? "w-4 h-4" : "w-3 h-3";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            sz,
            i <= rating
              ? "fill-[color:var(--warning)] text-[color:var(--warning)]"
              : "text-border fill-border"
          )}
        />
      ))}
    </div>
  );
}

// ─── Formatters ───────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Derived stats ────────────────────────────────────────────────────────────

function computeDistribution(data: Review[]) {
  const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  data.forEach((r) => { dist[r.rating] = (dist[r.rating] ?? 0) + 1; });
  return dist;
}

const overallAvg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
const overallDist = computeDistribution(reviews);

// ─── Constants ────────────────────────────────────────────────────────────────

const TRADE_CATEGORIES: TradeCategory[] = [
  "Plumbing", "Electrical", "HVAC", "Moving", "Painting",
  "Landscaping", "Cleaning", "Handyman", "Roofing", "Carpentry",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReviewsPage() {
  const [search, setSearch]             = useState("");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const displayed = useMemo(() => {
    return reviews
      .filter((r) => {
        const matchesRating   = ratingFilter   === "all" || r.rating   === parseInt(ratingFilter);
        const matchesCategory = categoryFilter === "all" || r.category === categoryFilter;
        const q = search.toLowerCase();
        const matchesSearch =
          q === "" ||
          r.proName.toLowerCase().includes(q) ||
          r.homeowner.toLowerCase().includes(q) ||
          r.service.toLowerCase().includes(q) ||
          r.comment.toLowerCase().includes(q);
        return matchesRating && matchesCategory && matchesSearch;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [search, ratingFilter, categoryFilter]);

  const filteredAvg  = displayed.length
    ? displayed.reduce((s, r) => s + r.rating, 0) / displayed.length
    : 0;
  const filteredDist = computeDistribution(displayed);

  const isFiltered = ratingFilter !== "all" || categoryFilter !== "all" || search !== "";
  const displayedAvg  = isFiltered ? filteredAvg  : overallAvg;
  const displayedDist = isFiltered ? filteredDist : overallDist;
  const distTotal     = Object.values(displayedDist).reduce((s, v) => s + v, 0);

  return (
    <div className="page-container space-y-6">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight aesthetic-heading">Reviews</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Homeowner reviews left after completed jobs — quality signal for every pro on the platform.
          </p>
        </div>
      </div>

      {/* ── Rating Summary ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Overall score */}
        <Card className="aesthetic-card md:col-span-1">
          <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
            <p className="text-5xl font-bold tabular-nums text-foreground mb-2">
              {displayedAvg.toFixed(1)}
            </p>
            <StarDisplay rating={Math.round(displayedAvg)} size="lg" />
            <p className="text-sm text-muted-foreground mt-2">
              {displayed.length} {displayed.length === 1 ? "review" : "reviews"}
              {isFiltered && " (filtered)"}
            </p>
          </CardContent>
        </Card>

        {/* Distribution bars */}
        <Card className="aesthetic-card md:col-span-2">
          <CardContent className="p-5 space-y-2.5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
              Rating Distribution
            </p>
            {[5, 4, 3, 2, 1].map((star) => {
              const count = displayedDist[star] ?? 0;
              const pct   = distTotal > 0 ? (count / distTotal) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-14 shrink-0">
                    <span className="text-xs tabular-nums text-muted-foreground w-3">{star}</span>
                    <Star className="w-3 h-3 fill-[color:var(--warning)] text-[color:var(--warning)]" />
                  </div>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[color:var(--warning)] transition-all duration-200"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs tabular-nums text-muted-foreground w-12 text-right">
                    {count} ({pct.toFixed(0)}%)
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* ── Filter Bar ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews, pros, homeowners..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Rating filter as pill buttons */}
        <div className="flex items-center gap-1 border border-border/60 rounded-lg p-1">
          {["all", "5", "4", "3", "2", "1"].map((val) => {
            const label = val === "all" ? "All" : `${val}★`;
            const isActive = ratingFilter === val;
            return (
              <button
                key={val}
                onClick={() => setRatingFilter(val)}
                className={cn(
                  "text-xs font-medium px-2.5 py-1.5 rounded-md transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

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
          {displayed.length} {displayed.length === 1 ? "review" : "reviews"}
        </span>
      </div>

      {/* ── Review Feed ─────────────────────────────────────────────── */}
      {displayed.length === 0 ? (
        <div className="aesthetic-card flex items-center justify-center h-48">
          <p className="text-sm text-muted-foreground">No reviews match this filter. Try adjusting the rating or trade.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayed.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Review Card ─────────────────────────────────────────────────────────────

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const ratingColor =
    review.rating >= 4
      ? "text-[color:var(--success)]"
      : review.rating === 3
      ? "text-[color:var(--warning)]"
      : "text-destructive";

  return (
    <Card
      className="aesthetic-card"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <CardContent className="p-4 space-y-3">
        {/* Header: pro + rating */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
              {review.proName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground leading-tight">{review.proName}</p>
              <p className="text-xs text-muted-foreground truncate">{review.service}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <StarDisplay rating={review.rating} size="sm" />
            <span className={cn("text-sm font-bold tabular-nums", ratingColor)}>
              {review.rating}.0
            </span>
          </div>
        </div>

        {/* Review comment */}
        <p className="text-sm text-foreground leading-relaxed">{review.comment}</p>

        {/* Footer: homeowner + date + category */}
        <div className="flex items-center justify-between pt-1 border-t border-border/40">
          <div>
            <p className="text-xs font-medium text-foreground">{review.homeowner}</p>
            <p className="text-xs text-muted-foreground">{formatDate(review.date)}</p>
          </div>
          <CategoryBadge category={review.category} />
        </div>
      </CardContent>
    </Card>
  );
}
