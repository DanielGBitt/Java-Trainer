"use client";

import type { MasteryDimension } from "@/types/exercise";

interface MasteryBarProps {
  dimension: MasteryDimension;
  level: number;
}

const DIMENSION_LABELS: Record<MasteryDimension, string> = {
  understanding: "Comprensión",
  recall: "Recuerdo",
  syntax: "Sintaxis",
  application: "Aplicación",
};

const DIMENSION_COLORS: Record<MasteryDimension, string> = {
  understanding: "bg-blue-500",
  recall: "bg-green-500",
  syntax: "bg-purple-500",
  application: "bg-orange-500",
};

export function MasteryBar({ dimension, level }: MasteryBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{DIMENSION_LABELS[dimension]}</span>
        <span className="text-gray-500">{level}%</span>
      </div>
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 ${DIMENSION_COLORS[dimension]} transition-all duration-500`}
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}
