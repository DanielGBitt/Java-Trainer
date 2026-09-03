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

const moyLote1Relationships: Relationship[] = [
  { sourceId: "logica-informacion", targetId: "logica-variable", type: "prerequisite", strength: 1 },
  { sourceId: "logica-variable", targetId: "logica-constante", type: "prerequisite", strength: 1 },
  { sourceId: "logica-constante", targetId: "java-op-aritmeticos", type: "prerequisite", strength: 0.8 },
];

export const logicaProgramacionRelationships: Relationship[] = [
  ...moyLote1Relationships,
  ...javaRelationships.filter((r) => LOGICA_UNIT_IDS.has(r.sourceId) && LOGICA_UNIT_IDS.has(r.targetId)),
];
