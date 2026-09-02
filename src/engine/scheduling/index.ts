import { FSRSAdapter } from "./fsrs-adapter";
import type { SchedulerAdapter, ReviewCard, ReviewResult } from "./types";
import type { ExerciseRating } from "@/types/attempt";

const adapter: SchedulerAdapter = new FSRSAdapter();

export function createNewCard(): ReviewCard {
  return adapter.createNewCard();
}

export function scheduleReview(
  card: ReviewCard,
  rating: ExerciseRating
): ReviewResult {
  return adapter.scheduleReview(card, rating);
}

export function getDueCards(
  cards: ReviewCard[],
  now: Date = new Date()
): ReviewCard[] {
  return adapter.getDueCards(cards, now);
}

export type { SchedulerAdapter, ReviewCard, ReviewResult };
