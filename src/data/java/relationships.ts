import type { Relationship } from "@/types/knowledge";

export const relationships: Relationship[] = [
  { sourceId: "logica-informacion", targetId: "logica-variable", type: "prerequisite", strength: 0.9 },
  { sourceId: "logica-variable", targetId: "logica-constante", type: "prerequisite", strength: 0.9 },
  { sourceId: "logica-variable", targetId: "logica-nomenclatura-reglas", type: "prerequisite", strength: 0.7 },
  { sourceId: "logica-nomenclatura-reglas", targetId: "logica-convenciones-estilos", type: "related", strength: 0.8 },
  { sourceId: "java-op-aritmeticos", targetId: "java-modulo", type: "prerequisite", strength: 0.8 },
  { sourceId: "java-op-aritmeticos", targetId: "java-op-comparacion", type: "prerequisite", strength: 0.6 },
  { sourceId: "java-not", targetId: "java-and", type: "prerequisite", strength: 0.8 },
  { sourceId: "java-and", targetId: "java-or", type: "related", strength: 0.9 },
  { sourceId: "java-op-comparacion", targetId: "java-not", type: "prerequisite", strength: 0.5 },
];
