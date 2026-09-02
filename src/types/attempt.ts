export type ErrorType =
  | "forgetting"
  | "conceptual_confusion"
  | "syntax_error"
  | "application_error"
  | "calculation_error"
  | "misinterpretation";

export type ExerciseRating = 0 | 1 | 2 | 3;

export interface Attempt {
  id: string;
  exerciseId: string;
  knowledgeUnitId: string;
  correct: boolean;
  userAnswer: string;
  rating: ExerciseRating;
  errorType?: ErrorType;
  timestamp: number;
  timeSpentMs: number;
}
