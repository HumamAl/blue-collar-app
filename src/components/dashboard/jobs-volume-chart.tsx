"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { MonthlyMetric } from "@/lib/types";

interface TooltipEntry {
  color?: string;
  name?: string;
  value?: number | string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-background p-3 text-sm shadow-md">
      <p className="font-semibold mb-1.5">{label}</p>
      {payload.map((entry, i) => (
        <p
          key={i}
          className="text-muted-foreground flex items-center gap-2 text-xs"
        >
          <span
            className="inline-block w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          {entry.name}:{" "}
          <span className="font-mono font-semibold text-foreground">
            {typeof entry.value === "number"
              ? entry.value.toLocaleString()
              : entry.value}
          </span>
        </p>
      ))}
    </div>
  );
};

interface JobsVolumeChartProps {
  data: MonthlyMetric[];
  view: "jobs" | "revenue";
}

export function JobsVolumeChart({ data, view }: JobsVolumeChartProps) {
  const formatYAxis = (value: number) => {
    if (view === "revenue") {
      if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
      return `$${value}`;
    }
    if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
    return String(value);
  };

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="fillJobs" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.22} />
            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--border)"
          strokeOpacity={0.6}
        />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={formatYAxis}
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          width={48}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey={view}
          name={view === "jobs" ? "Jobs Dispatched" : "Platform Revenue"}
          stroke="var(--chart-1)"
          strokeWidth={2}
          fill="url(#fillJobs)"
          dot={false}
          activeDot={{ r: 4, fill: "var(--chart-1)", strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
