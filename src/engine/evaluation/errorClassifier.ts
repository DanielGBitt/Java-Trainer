import type { ErrorType } from "@/types/attempt";
import type { Exercise } from "@/types/exercise";
import type { Attempt } from "@/types/attempt";

export function classifyError(
  exercise: Exercise,
  userAnswer: string,
  correctAnswer: string,
  attemptHistory: Attempt[]
): ErrorType {
  const normalizedUser = userAnswer.trim().toLowerCase();
  const normalizedCorrect = correctAnswer.trim().toLowerCase();

  // Check if this is a repeated error
  const recentErrors = attemptHistory.filter(
    (a) => a.knowledgeUnitId === exercise.knowledgeUnitId && !a.correct
  );

  if (recentErrors.length >= 3) {
    return "forgetting";
  }

  // Syntax error detection
  if (exercise.type === "code_completion") {
    if (
      normalizedUser.includes('"') &&
      normalizedCorrect.includes("'")
    ) {
      return "syntax_error";
    }
    if (
      normalizedUser.includes(";") !== normalizedCorrect.includes(";")
    ) {
      return "syntax_error";
    }
  }

  // Multiple choice errors
  if (exercise.type === "multiple_choice") {
    // Check if answer is close but wrong (conceptual confusion)
    const correctIndex = exercise.options?.indexOf(correctAnswer) ?? -1;
    const userIndex = exercise.options?.indexOf(userAnswer) ?? -1;

    if (correctIndex >= 0 && userIndex >= 0) {
      const distance = Math.abs(correctIndex - userIndex);
      if (distance === 1) {
        return "conceptual_confusion";
      }
    }
  }

  // Recall errors
  if (exercise.type === "recall") {
    // Check for common mistakes
    if (
      normalizedUser.includes("string") &&
      normalizedCorrect.includes("char")
    ) {
      return "conceptual_confusion";
    }
    if (
      normalizedUser.includes("=") &&
      normalizedCorrect.includes("==")
    ) {
      return "conceptual_confusion";
    }
  }

  // Check calculation errors
  if (
    normalizedUser.match(/^\d+$/) &&
    normalizedCorrect.match(/^\d+$/)
  ) {
    const diff = Math.abs(parseInt(normalizedUser) - parseInt(normalizedCorrect));
    if (diff <= 2) {
      return "calculation_error";
    }
  }

  // Default: forgetting if no history, otherwise application error
  if (attemptHistory.length === 0) {
    return "forgetting";
  }

  return "application_error";
}
