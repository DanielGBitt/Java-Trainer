export type ExerciseType =
  | "multiple_choice"
  | "recall"
  | "code_completion";

export type MasteryDimension =
  | "understanding"
  | "recall"
  | "syntax"
  | "application";

export interface Exercise {
  id: string;
  knowledgeUnitId: string;
  type: ExerciseType;
  dimension: MasteryDimension;
  difficulty: 1 | 2 | 3;
  question: string;
  options?: string[];
  correctAnswer: string;
  alternativeAnswers?: string[];
  explanation: string;
  codeSnippet?: string;
  hints?: string[];
}
