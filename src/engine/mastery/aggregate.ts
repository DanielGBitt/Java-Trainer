import type { Mastery, DimensionMastery } from "@/types/mastery";
import type { MasteryDimension } from "@/types/exercise";
import { getMastery } from "./index";
import { MASTERY_DIMENSIONS } from "@/lib/constants";

export function getAggregateMastery(unitIds: string[]): Mastery | null {
  const masteries = unitIds
    .map((id) => getMastery(id))
    .filter((m): m is Mastery => m !== null);

  if (masteries.length === 0) return null;

  const dimensions = {} as Record<MasteryDimension, DimensionMastery>;
  for (const dim of MASTERY_DIMENSIONS) {
    const values = masteries.map((m) => m.dimensions[dim]);
    dimensions[dim] = {
      level: Math.round(
        values.reduce((sum, v) => sum + v.level, 0) / values.length
      ),
      attempts: values.reduce((sum, v) => sum + v.attempts, 0),
      correct: values.reduce((sum, v) => sum + v.correct, 0),
      lastAttemptAt: Math.max(...values.map((v) => v.lastAttemptAt ?? 0)),
    };
  }

  return {
    knowledgeUnitId: unitIds[0],
    dimensions,
    overallLevel: Math.round(
      masteries.reduce((sum, m) => sum + m.overallLevel, 0) / masteries.length
    ),
    lastReviewedAt: Math.max(
      ...masteries.map((m) => m.lastReviewedAt ?? 0)
    ),
    nextReviewAt: Math.min(
      ...masteries.map((m) => m.nextReviewAt ?? Infinity)
    ),
    correctStreak: Math.min(...masteries.map((m) => m.correctStreak)),
    errorStreak: Math.max(...masteries.map((m) => m.errorStreak)),
    totalAttempts: masteries.reduce((sum, m) => sum + m.totalAttempts, 0),
    totalCorrect: masteries.reduce((sum, m) => sum + m.totalCorrect, 0),
  };
}
