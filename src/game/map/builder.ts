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
  { id: "node-datos", title: "Datos", icon: "📦", category: "fundamentals", courseId: "logica-programacion", unitIds: ["logica-informacion", "logica-variable", "logica-constante"], x: 400, y: 60 },
  { id: "node-estilo", title: "Estilo", icon: "📝", category: "conventions", courseId: "logica-programacion", unitIds: ["logica-nomenclatura-reglas", "logica-convenciones-estilos"], x: 650, y: 110 },
  { id: "node-operators", title: "Operadores", icon: "➗", category: "operators", courseId: "logica-programacion", unitIds: ["java-op-aritmeticos", "java-op-comparacion", "java-modulo"], x: 400, y: 160 },
  { id: "node-logic", title: "Lógica", icon: "🧠", category: "logic", courseId: "logica-programacion", unitIds: ["java-not", "java-and", "java-or"], x: 400, y: 320 },
  { id: "node-intro-web", title: "Fundamentos Web", icon: "🌐", category: "intro-web", courseId: "intro-programacion", unitIds: ["intro-web-fundamentos", "intro-html-esqueleto"], x: 400, y: 60 },
  { id: "node-intro-html", title: "HTML Semántico", icon: "📄", category: "intro-html", courseId: "intro-programacion", unitIds: ["intro-html-semantica", "intro-enlaces-imagenes"], x: 400, y: 180 },
  { id: "node-intro-tablas", title: "Tablas y Formularios", icon: "📋", category: "intro-tablas", courseId: "intro-programacion", unitIds: ["intro-style-tablas-media", "intro-formularios"], x: 400, y: 340 },
  { id: "node-bd-modelado", title: "Modelado", icon: "🗄️", category: "bd-modelado", courseId: "bases-de-datos", unitIds: ["bd-base-datos", "bd-componentes", "bd-tipos", "bd-entidad", "bd-atributo", "bd-modelo-er"], x: 400, y: 180 },
  { id: "node-bd-normalizacion", title: "Normalización", icon: "♻️", category: "bd-normalizacion", courseId: "bases-de-datos", unitIds: ["bd-normalizacion-1fn", "bd-normalizacion-2fn", "bd-normalizacion-3fn"], x: 400, y: 340 },
];

const NODE_CONNECTIONS: [string, string][] = [
  ["node-datos", "node-estilo"],
  ["node-estilo", "node-operators"],
  ["node-operators", "node-logic"],
  ["node-intro-web", "node-intro-html"],
  ["node-intro-html", "node-intro-tablas"],
  ["node-bd-modelado", "node-bd-normalizacion"],
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
