import type { GameNode } from "@/types/game";
import type { KnowledgeUnit } from "@/types/knowledge";
import { getUnitById } from "@/engine/learning/knowledge";

interface NodeDefinition {
  id: string;
  title: string;
  icon: string;
  category: string;
  unitIds: string[];
  x: number;
  y: number;
}

const NODE_DEFINITIONS: NodeDefinition[] = [
  { id: "node-fundamentals", title: "Fundamentos", icon: "📦", category: "fundamentals", unitIds: ["java-datos-vs-informacion", "java-variable-concepto", "java-asignacion", "java-constantes", "java-nombres-reglas", "java-tipo-dato"], x: 400, y: 60 },
  { id: "node-conventions", title: "Convenciones", icon: "📝", category: "conventions", unitIds: ["java-camelcase", "java-snake-case", "java-hungarian-notation"], x: 150, y: 180 },
  { id: "node-primitives", title: "Tipos Primitivos", icon: "🔢", category: "primitives", unitIds: ["java-int", "java-double-float", "java-boolean", "java-char", "java-byte-short-long"], x: 650, y: 260 },
  { id: "node-operators", title: "Operadores", icon: "➗", category: "operators", unitIds: ["java-op-aritmeticos", "java-op-comparacion", "java-modulo"], x: 400, y: 340 },
  { id: "node-logic", title: "Lógica", icon: "🧠", category: "logic", unitIds: ["java-not", "java-and", "java-or"], x: 400, y: 440 },
];

const NODE_CONNECTIONS: [string, string][] = [
  ["node-fundamentals", "node-conventions"],
  ["node-fundamentals", "node-primitives"],
  ["node-primitives", "node-operators"],
  ["node-operators", "node-logic"],
];

export function buildGameMap(): GameNode[] {
  return NODE_DEFINITIONS.map((def) => ({
    id: def.id,
    knowledgeUnitIds: def.unitIds,
    title: def.title,
    icon: def.icon,
    position: { x: def.x, y: def.y },
    connections: NODE_CONNECTIONS
      .filter(([a, b]) => a === def.id || b === def.id)
      .flatMap(([a, b]) => (a === def.id ? b : a === def.id ? [] : a))
      .filter((id): id is string => id !== def.id),
    status: "locked" as const,
  }));
}

export function getNodeById(nodeId: string): GameNode | undefined {
  return buildGameMap().find((n) => n.id === nodeId);
}

export function getUnitsForNode(nodeId: string): KnowledgeUnit[] {
  const node = getNodeById(nodeId);
  if (!node) return [];
  return node.knowledgeUnitIds
    .map((id) => getUnitById(id))
    .filter((u): u is KnowledgeUnit => u !== undefined);
}
