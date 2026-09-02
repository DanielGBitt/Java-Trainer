import type { GameNode } from "@/types/game";
import type { KnowledgeUnit } from "@/types/knowledge";
import { getUnitById } from "@/engine/learning/knowledge";

interface NodeDefinition {
  id: string;
  title: string;
  icon: string;
  category: string;
  courseId: string;
  unitIds: string[];
  x: number;
  y: number;
}

const NODE_DEFINITIONS: NodeDefinition[] = [
  { id: "node-operators", title: "Operadores", icon: "➗", category: "operators", courseId: "logica-programacion", unitIds: ["java-op-aritmeticos", "java-op-comparacion", "java-modulo"], x: 400, y: 160 },
  { id: "node-logic", title: "Lógica", icon: "🧠", category: "logic", courseId: "logica-programacion", unitIds: ["java-not", "java-and", "java-or"], x: 400, y: 320 },
  /* PLANTILLA INTRO — descomentar al recibir apuntes (grilla x150/400/650 y60-340, ViewBox 800x580)
  { id: "node-fundamentals", title: "Fundamentos", icon: "📦", category: "fundamentals", courseId: "intro-programacion", unitIds: ["java-datos-vs-informacion", "java-variable-concepto", "java-asignacion", "java-constantes", "java-nombres-reglas", "java-tipo-dato"], x: 400, y: 60 },
  { id: "node-conventions", title: "Convenciones", icon: "📝", category: "conventions", courseId: "intro-programacion", unitIds: ["java-camelcase", "java-snake-case", "java-hungarian-notation"], x: 150, y: 180 },
  { id: "node-primitives", title: "Tipos Primitivos", icon: "🔢", category: "primitives", courseId: "intro-programacion", unitIds: ["java-int", "java-double-float", "java-boolean", "java-char", "java-byte-short-long"], x: 650, y: 260 },
  { id: "node-typing", title: "Tipado", icon: "🔤", category: "typing", courseId: "intro-programacion", unitIds: [], x: 150, y: 340 },
  */
  /* PLANTILLA BD — y180/340
  { id: "node-bd-modelado", title: "Modelado", icon: "🗄️", category: "bd-modelado", courseId: "bases-de-datos", unitIds: ["bd-entidad-atributo", "bd-relacion"], x: 400, y: 180 },
  { id: "node-bd-sql", title: "SQL", icon: "📊", category: "bd-sql", courseId: "bases-de-datos", unitIds: ["bd-sql-select"], x: 400, y: 340 },
  */
];

const NODE_CONNECTIONS: [string, string][] = [
  ["node-operators", "node-logic"],
  /* PLANTILLA INTRO: ["node-fundamentals", "node-conventions"], ["node-fundamentals", "node-primitives"], ["node-primitives", "node-typing"], ["node-primitives", "node-operators"], */
  /* PLANTILLA BD: ["node-bd-modelado", "node-bd-sql"], */
];

export function buildGameMap(courseId?: string): GameNode[] {
  const defs = courseId ? NODE_DEFINITIONS.filter((d) => d.courseId === courseId) : NODE_DEFINITIONS;
  return defs.map((def) => ({
    id: def.id,
    knowledgeUnitIds: def.unitIds,
    title: def.title,
    icon: def.icon,
    position: { x: def.x, y: def.y },
    connections: NODE_CONNECTIONS.filter(([a, b]) => a === def.id || b === def.id)
      .flatMap(([a, b]) => (a === def.id ? b : a === def.id ? [] : a))
      .filter((id): id is string => id !== def.id)
      .filter((cid) => !courseId || NODE_DEFINITIONS.find((n) => n.id === cid)?.courseId === courseId),
    status: "locked" as const,
  }));
}

export function getNodeById(nodeId: string): GameNode | undefined {
  return buildGameMap().find((n) => n.id === nodeId);
}

export function getCourseIdForNode(nodeId: string): string | undefined {
  return NODE_DEFINITIONS.find((n) => n.id === nodeId)?.courseId;
}

export function getUnitsForNode(nodeId: string): KnowledgeUnit[] {
  const node = getNodeById(nodeId);
  if (!node) return [];
  return node.knowledgeUnitIds.map((id) => getUnitById(id)).filter((u): u is KnowledgeUnit => u !== undefined);
}
