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
