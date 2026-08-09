"use client";

import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface LineChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export function LineChart({
  data,
  index,
  categories,
  colors = ["#8b5cf6", "#f43f5e", "#06b6d4"],
  valueFormatter = (value: number) => value.toString(),
  className,
}: LineChartProps) {
  return (
    <div className={`w-full h-80 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis
            dataKey={index}
            stroke="#71717a"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            stroke="#71717a"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={valueFormatter}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border border-border bg-popover/90 p-3 shadow-md backdrop-blur-md">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">{label}</p>
                    {payload.map((entry: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-sm font-medium">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span>{entry.name}:</span>
                        <span className="text-foreground ml-auto">
                          {valueFormatter(entry.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            iconSize={8}
            content={({ payload }) => (
              <div className="flex gap-4 justify-end text-xs text-muted-foreground mb-4">
                {payload?.map((entry: any, index: number) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span>{entry.value}</span>
                  </div>
                ))}
              </div>
            )}
          />
          {categories.map((category, idx) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[idx % colors.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
