"use client";

import type { Mastery } from "@/types/mastery";
import { MasteryBar } from "./MasteryBar";
import type { MasteryDimension } from "@/types/exercise";

interface WeaknessListProps {
  mastery: Record<string, Mastery>;
}

export function WeaknessList({ mastery }: WeaknessListProps) {
  const weaknesses: { unitId: string; dimension: MasteryDimension; level: number }[] = [];

  Object.entries(mastery).forEach(([unitId, m]) => {
    Object.entries(m.dimensions).forEach(([dim, d]) => {
      if (d.level < 40 && d.attempts > 0) {
        weaknesses.push({
          unitId,
          dimension: dim as MasteryDimension,
          level: d.level,
        });
      }
    });
  });

  weaknesses.sort((a, b) => a.level - b.level);

  if (weaknesses.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center py-4">
        No hay debilidades detectadas aún. ¡Sigue practicando!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {weaknesses.slice(0, 5).map((w, i) => (
        <div key={`${w.unitId}-${w.dimension}-${i}`} className="space-y-1">
          <p className="text-xs text-gray-500">
            {w.unitId.replace("java-", "")} → {w.dimension}
          </p>
          <MasteryBar dimension={w.dimension} level={w.level} />
        </div>
      ))}
    </div>
  );
}
