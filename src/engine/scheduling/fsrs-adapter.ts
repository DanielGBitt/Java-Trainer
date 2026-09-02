import { fsrs, Rating, createEmptyCard, type Grade } from "ts-fsrs";
import type { ExerciseRating } from "@/types/attempt";
import type { SchedulerAdapter, ReviewCard, ReviewResult } from "./types";

export class FSRSAdapter implements SchedulerAdapter {
  private scheduler;

  constructor() {
    this.scheduler = fsrs({
      request_retention: 0.9,
      maximum_interval: 36500,
    });
  }

  createNewCard(): ReviewCard {
    const card = createEmptyCard();
    return {
      id: "",
      due: card.due,
      stability: card.stability,
      difficulty: card.difficulty,
      elapsedDays: card.elapsed_days,
      scheduledDays: card.scheduled_days,
      reps: card.reps,
      lapses: card.lapses,
      state: card.state,
    };
  }

  scheduleReview(card: ReviewCard, rating: ExerciseRating): ReviewResult {
    const fsrsCard = {
      due: card.due,
      stability: card.stability,
      difficulty: card.difficulty,
      elapsed_days: card.elapsedDays,
      scheduled_days: card.scheduledDays,
      reps: card.reps,
      lapses: card.lapses,
      state: card.state as 0 | 1 | 2 | 3,
      learning_steps: 0,
    };

    const fsrsRating = this.mapRating(rating);
    const result = this.scheduler.next(fsrsCard, new Date(), fsrsRating);

    return {
      card: {
        id: card.id,
        due: result.card.due,
        stability: result.card.stability,
        difficulty: result.card.difficulty,
        elapsedDays: result.card.elapsed_days,
        scheduledDays: result.card.scheduled_days,
        reps: result.card.reps,
        lapses: result.card.lapses,
        state: result.card.state,
      },
      log: result.log,
    };
  }

  getDueCards(cards: ReviewCard[], now: Date = new Date()): ReviewCard[] {
    return cards.filter((card) => card.due <= now);
  }

  private mapRating(rating: ExerciseRating): Grade {
    const map: Record<ExerciseRating, Grade> = {
      0: Rating.Again as Grade,
      1: Rating.Hard as Grade,
      2: Rating.Good as Grade,
      3: Rating.Easy as Grade,
    };
    return map[rating];
  }
}
