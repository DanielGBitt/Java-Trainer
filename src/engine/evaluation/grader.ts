import type { Exercise } from "@/types/exercise";
import type { Attempt, ExerciseRating } from "@/types/attempt";

function normalizeAnswer(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/;$/, "")
    .replace(/\s+/g, " ")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export function evaluateAnswer(
  exercise: Exercise,
  userAnswer: string
): { correct: boolean; rating: ExerciseRating } {
  const normalizedUser = normalizeAnswer(userAnswer);
  const candidates = [exercise.correctAnswer, ...(exercise.alternativeAnswers ?? [])].map(normalizeAnswer);

  const correct = candidates.includes(normalizedUser);

  if (correct) {
    return { correct: true, rating: 3 }; // Easy
  }

  // Partial credit for close answers
  if (exercise.type === "multiple_choice") {
    return { correct: false, rating: 0 };
  }

  // For recall/code_completion, check if close (use primary correctAnswer for partial credit)
  const normalizedCorrect = normalizeAnswer(exercise.correctAnswer);
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
