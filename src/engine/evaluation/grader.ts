import type { Exercise } from "@/types/exercise";
import type { Attempt, ExerciseRating } from "@/types/attempt";

export function evaluateAnswer(
  exercise: Exercise,
  userAnswer: string
): { correct: boolean; rating: ExerciseRating } {
  const normalizedUser = userAnswer.trim().toLowerCase();
  const normalizedCorrect = exercise.correctAnswer.trim().toLowerCase();

  const correct = normalizedUser === normalizedCorrect;

  if (correct) {
    return { correct: true, rating: 3 }; // Easy
  }

  // Partial credit for close answers
  if (exercise.type === "multiple_choice") {
    return { correct: false, rating: 0 };
  }

  // For recall/code_completion, check if close
  if (
    normalizedUser.includes(normalizedCorrect) ||
    normalizedCorrect.includes(normalizedUser)
  ) {
    return { correct: false, rating: 1 }; // Hard
  }

  return { correct: false, rating: 0 }; // Again
}

export function createAttempt(
  exercise: Exercise,
  userAnswer: string,
  correct: boolean,
  rating: ExerciseRating,
  errorType?: string,
  timeSpentMs: number = 0
): Attempt {
  return {
    id: `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    exerciseId: exercise.id,
    knowledgeUnitId: exercise.knowledgeUnitId,
    correct,
    userAnswer,
    rating,
    errorType: errorType as Attempt["errorType"],
    timestamp: Date.now(),
    timeSpentMs,
  };
}
