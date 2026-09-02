import type { MasteryDimension } from "./exercise";

export interface DimensionMastery {
  level: number;
  attempts: number;
  correct: number;
  lastAttemptAt: number | null;
}

export interface Mastery {
  knowledgeUnitId: string;
  dimensions: Record<MasteryDimension, DimensionMastery>;
  overallLevel: number;
  lastReviewedAt: number | null;
  nextReviewAt: number | null;
  correctStreak: number;
  errorStreak: number;
  totalAttempts: number;
  totalCorrect: number;
}
