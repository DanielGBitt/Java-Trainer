import type { Exercise } from "@/types/exercise";
import { exercises as javaExercises } from "@/data/java/exercises";

const LOGICA_UNIT_PREFIXES = ["java-op-", "java-not", "java-and", "java-or", "java-modulo"];

export const logicaProgramacionExercises: Exercise[] = javaExercises.filter((e) =>
  LOGICA_UNIT_PREFIXES.some((p) => e.knowledgeUnitId.startsWith(p))
);
