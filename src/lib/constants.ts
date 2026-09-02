export const UMBRALES_MASTERY = {
  WEAK: 40,
  DECENT: 60,
  STRONG: 80,
  MASTERED: 90,
} as const;

export const MAX_REVIEW_INTERVAL_DAYS = 365;

export const XP_PER_CORRECT = 10;
export const XP_PER_LEVEL = 100;

export const MASTERY_DIMENSIONS = [
  "understanding",
  "recall",
  "syntax",
  "application",
] as const;

export const NODE_ICONS: Record<string, string> = {
  fundamentals: "📦",
  conventions: "📝",
  typing: "🔤",
  primitives: "🔢",
  operators: "➗",
  logic: "🧠",
};

export const CATEGORY_LABELS: Record<string, string> = {
  fundamentals: "Fundamentos",
  conventions: "Convenciones",
  typing: "Tipado",
  primitives: "Tipos Primitivos",
  operators: "Operadores",
  logic: "Lógica",
};

export const CATEGORY_ORDER = [
  "fundamentals",
  "conventions",
  "typing",
  "primitives",
  "operators",
  "logic",
] as const;

export const KNOWLEDGE_TYPE_LABELS: Record<string, string> = {
  definition: "Definición",
  rule: "Regla",
  syntax: "Sintaxis",
  fact: "Dato",
  example: "Ejemplo",
  comparison: "Comparación",
  procedure: "Procedimiento",
  application: "Aplicación",
  common_mistake: "Error común",
} as const;

export const KNOWLEDGE_TYPE_META: Record<
  string,
  { accent: string; bg: string; icon: string }
> = {
  definition: { accent: "border-l-blue-500", bg: "bg-blue-950/20", icon: "BookOpen" },
  rule: { accent: "border-l-amber-500", bg: "bg-amber-950/15", icon: "Ruler" },
  syntax: { accent: "border-l-sky-500", bg: "bg-zinc-900/60", icon: "Terminal" },
  fact: { accent: "border-l-sky-500", bg: "bg-sky-950/15", icon: "Info" },
  example: { accent: "border-l-emerald-500", bg: "bg-zinc-900/60", icon: "Code2" },
  comparison: { accent: "border-l-violet-500", bg: "bg-violet-950/15", icon: "ArrowLeftRight" },
  procedure: { accent: "border-l-cyan-500", bg: "bg-cyan-950/15", icon: "ListOrdered" },
  application: { accent: "border-l-orange-500", bg: "bg-orange-950/15", icon: "FlaskConical" },
  common_mistake: { accent: "border-l-red-500", bg: "bg-red-950/20", icon: "AlertTriangle" },
} as const;
