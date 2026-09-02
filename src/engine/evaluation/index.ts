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
  const trimmed = userAnswer.trim();
  const showUserAnswer =
    trimmed.length > 0 &&
    trimmed.length < 80 &&
    exercise.type !== "multiple_choice";

  const prefix = showUserAnswer
    ? `No era "${trimmed}" — se esperaba "${exercise.correctAnswer}".`
    : `No era esa — se esperaba "${exercise.correctAnswer}".`;

  let tail = "";
  switch (errorType) {
    case "conceptual_confusion":
      tail = " No confundir con el distractor cercano.";
      break;
    case "syntax_error":
      tail = " Revisa mayúsculas, ; y comillas.";
      break;
    case "calculation_error":
      tail = " Revisa el cálculo paso a paso.";
      break;
    case "application_error":
      tail = " Revisa el caso de uso.";
      break;
    default:
      tail = "";
      break;
  }

  return `${prefix} ${base}${tail}`;
}
