import type { ExerciseRating } from "@/types/attempt";

export interface ReviewCard {
  id: string;
  due: Date;
  stability: number;
  difficulty: number;
  elapsedDays: number;
  scheduledDays: number;
  reps: number;
  lapses: number;
  state: number;
}

export interface ReviewResult {
  card: ReviewCard;
  log: unknown;
}

export interface SchedulerAdapter {
  scheduleReview(card: ReviewCard, rating: ExerciseRating): ReviewResult;
  getDueCards(cards: ReviewCard[], now: Date): ReviewCard[];
  createNewCard(): ReviewCard;
}
