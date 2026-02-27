"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import type { CategoryBreakdown } from "@/lib/types";

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

interface TooltipEntry {
  color?: string;
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
      <p className="text-muted-foreground flex items-center gap-2 text-xs">
        <span
          className="inline-block w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: payload[0]?.color }}
        />
        Jobs booked:{" "}
        <span className="font-mono font-semibold text-foreground">
          {typeof payload[0]?.value === "number"
            ? payload[0].value.toLocaleString()
            : payload[0]?.value}
        </span>
      </p>
    </div>
  );
};

interface CategoryBarChartProps {
  data: CategoryBreakdown[];
}

export function CategoryBarChart({ data }: CategoryBarChartProps) {
  // Sort descending by jobs
  const sorted = [...data].sort((a, b) => b.jobs - a.jobs);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={sorted}
        layout="vertical"
        margin={{ top: 4, right: 16, bottom: 0, left: 4 }}
      >
        <CartesianGrid
          horizontal={false}
          strokeDasharray="3 3"
          stroke="var(--border)"
          strokeOpacity={0.6}
        />
        <XAxis
          type="number"
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          dataKey="category"
          type="category"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          width={72}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: "var(--surface-hover)" }}
        />
        <Bar dataKey="jobs" radius={[0, 4, 4, 0]} maxBarSize={18}>
          {sorted.map((entry, index) => (
            <Cell
              key={entry.category}
              fill={CHART_COLORS[index % CHART_COLORS.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
