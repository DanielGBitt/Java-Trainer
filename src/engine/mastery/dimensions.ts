import type { Mastery, DimensionMastery } from "@/types/mastery";
import type { MasteryDimension } from "@/types/exercise";
import type { Attempt } from "@/types/attempt";
import { MASTERY_DIMENSIONS } from "@/lib/constants";

export function createInitialMastery(unitId: string): Mastery {
  const dimensions = {} as Record<MasteryDimension, DimensionMastery>;
  for (const dim of MASTERY_DIMENSIONS) {
    dimensions[dim] = {
      level: 0,
      attempts: 0,
      correct: 0,
      lastAttemptAt: null,
    };
  }
  return {
    knowledgeUnitId: unitId,
    dimensions,
    overallLevel: 0,
    lastReviewedAt: null,
    nextReviewAt: null,
    correctStreak: 0,
    errorStreak: 0,
    totalAttempts: 0,
    totalCorrect: 0,
  };
}

export function updateMasteryAfterAttempt(
  current: Mastery,
  attempt: Attempt,
  dimension: MasteryDimension
): Mastery {
  const dim = { ...current.dimensions[dimension] };
  dim.attempts += 1;
  dim.lastAttemptAt = attempt.timestamp;

  if (attempt.correct) {
    dim.correct += 1;
    // Increment level based on difficulty and current level
    const increment = attempt.rating === 3 ? 20 : attempt.rating === 2 ? 15 : 10;
    dim.level = Math.min(100, dim.level + increment);
  } else {
    // Decrease level on error
    const decrement = current.errorStreak >= 2 ? 25 : 15;
    dim.level = Math.max(0, dim.level - decrement);
  }

  const newDimensions = { ...current.dimensions, [dimension]: dim };

  return {
    ...current,
    dimensions: newDimensions,
    overallLevel: calculateOverallLevel({ ...current, dimensions: newDimensions }),
    lastReviewedAt: attempt.timestamp,
    correctStreak: attempt.correct ? current.correctStreak + 1 : 0,
    errorStreak: attempt.correct ? 0 : current.errorStreak + 1,
    totalAttempts: current.totalAttempts + 1,
    totalCorrect: current.totalCorrect + (attempt.correct ? 1 : 0),
  };
}

export function calculateOverallLevel(mastery: Mastery): number {
  const dims = Object.values(mastery.dimensions);
  if (dims.length === 0) return 0;
  const sum = dims.reduce((acc, d) => acc + d.level, 0);
  return Math.round(sum / dims.length);
}

export function getWeakDimensions(
  mastery: Mastery,
  threshold: number = 40
): MasteryDimension[] {
  const weak: MasteryDimension[] = [];
  for (const [key, dim] of Object.entries(mastery.dimensions)) {
    if (dim.level < threshold && dim.attempts > 0) {
      weak.push(key as MasteryDimension);
    }
  }
  return weak;
}

export function getStrongDimensions(
  mastery: Mastery,
  threshold: number = 80
): MasteryDimension[] {
  const strong: MasteryDimension[] = [];
  for (const [key, dim] of Object.entries(mastery.dimensions)) {
    if (dim.level >= threshold) {
      strong.push(key as MasteryDimension);
    }
  }
  return strong;
}
