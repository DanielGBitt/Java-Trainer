"use client";

interface ConnectionLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active?: boolean;
}

export function ConnectionLine({ x1, y1, x2, y2, active = false }: ConnectionLineProps) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={active ? "#22c55e" : "#475569"}
      strokeWidth={active ? 3.5 : 2}
      strokeDasharray={active ? "none" : "8 4"}
    />
  );
}
