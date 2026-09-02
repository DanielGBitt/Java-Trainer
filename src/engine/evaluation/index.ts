import { evaluateAnswer, createAttempt } from "./grader";
import { classifyError } from "./errorClassifier";
import { updateMasteryAfterAttempt } from "../mastery/dimensions";
import { saveMastery, getMastery } from "../mastery/index";
import { scheduleReview, createNewCard } from "../scheduling/index";
import { storage } from "@/storage";
import type { Exercise, MasteryDimension } from "@/types/exercise";
import type { Attempt, ExerciseRating } from "@/types/attempt";

export interface EvaluationResult {
  attempt: Attempt;
  correct: boolean;
  rating: ExerciseRating;
  feedback: string;
}

export function submitAnswer(
  exercise: Exercise,
  userAnswer: string,
  startTime: number,
  attemptHistory: Attempt[]
): EvaluationResult {
  const { correct, rating } = evaluateAnswer(exercise, userAnswer);

  let errorType: string | undefined;
  if (!correct) {
    errorType = classifyError(exercise, userAnswer, exercise.correctAnswer, attemptHistory);
  }

  const attempt = createAttempt(
    exercise,
    userAnswer,
    correct,
    rating,
    errorType,
    Date.now() - startTime
  );

  // Save attempt to storage
  const progress = storage.getProgress();
  if (progress) {
    storage.updateProgress({
      attempts: [...progress.attempts, attempt],
    });
  }

  // Update mastery
  const mastery = getMastery(exercise.knowledgeUnitId);
  if (mastery) {
    const updated = updateMasteryAfterAttempt(
      mastery,
      attempt,
      exercise.dimension as MasteryDimension
    );
    saveMastery(exercise.knowledgeUnitId, updated);

    // Update FSRS scheduling
    const card = createNewCard();
    card.id = exercise.knowledgeUnitId;
    const reviewResult = scheduleReview(card, rating);

    const updatedMastery = { ...updated };
    updatedMastery.nextReviewAt = reviewResult.card.due.getTime();
    saveMastery(exercise.knowledgeUnitId, updatedMastery);
  }

  // Generate feedback
  const feedback = correct
    ? `Correcto. ${exercise.explanation}`
    : generateErrorFeedback(exercise, userAnswer, errorType);

  return { attempt, correct, rating, feedback };
}

function generateErrorFeedback(
  exercise: Exercise,
  userAnswer: string,
  errorType?: string
): string {
  const base = exercise.explanation;

  switch (errorType) {
    case "forgetting":
      return `Parece que este concepto necesita refuerzo. ${base}`;
    case "conceptual_confusion":
      return `Confusión conceptual detectada. ${base}`;
    case "syntax_error":
      return `Error de sintaxis. ${base}`;
    case "calculation_error":
      return `Error de cálculo. ${base}`;
    case "application_error":
      return `La respuesta no es correcta. ${base}`;
    default:
      return `Incorrecto. ${base}`;
  }
}
