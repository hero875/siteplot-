"use client";

import React from "react";

interface GaugeChartProps {
  value: number; // 0 to 100
  title?: string;
  className?: string;
}

export function GaugeChart({ value, title, className }: GaugeChartProps) {
  // Clamp value between 0 and 100
  const score = Math.max(0, Math.min(100, value));
  
  // Calculate SVG stroke properties
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  // Draw only a 3/4 gauge (270 deg)
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (score / 100) * arcLength;
  
  // Determine color based on value
  let strokeColor = "#ef4444"; // Red
  if (score >= 90) strokeColor = "#10b981"; // Emerald
  else if (score >= 50) strokeColor = "#f59e0b"; // Amber

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <div className="relative w-44 h-44">
        <svg viewBox="0 0 120 120" className="w-full h-full transform -rotate-[225deg]">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="transparent"
            stroke="#27272a"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Active progress circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Central Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold tracking-tight text-white">{score}</span>
          {title && <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mt-1">{title}</span>}
        </div>
      </div>
    </div>
  );
}
