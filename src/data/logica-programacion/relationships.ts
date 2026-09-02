import type { Relationship } from "@/types/knowledge";
import { relationships as javaRelationships } from "@/data/java/relationships";

const LOGICA_UNIT_IDS = new Set([
  "java-op-aritmeticos",
  "java-op-comparacion",
  "java-modulo",
  "java-not",
  "java-and",
  "java-or",
]);

export const logicaProgramacionRelationships: Relationship[] = javaRelationships.filter(
  (r) => LOGICA_UNIT_IDS.has(r.sourceId) && LOGICA_UNIT_IDS.has(r.targetId)
);
