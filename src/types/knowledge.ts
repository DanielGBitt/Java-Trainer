export type KnowledgeType =
  | "definition"
  | "rule"
  | "syntax"
  | "fact"
  | "example"
  | "comparison"
  | "procedure"
  | "application"
  | "common_mistake";

export interface KnowledgeItem {
  id: string;
  type: KnowledgeType;
  content: string;
  context?: string;
  correctedContent?: string;
  correctionExplanation?: string;
}

export interface KnowledgeUnit {
  id: string;
  title: string;
  category: string;
  difficulty: 1 | 2 | 3;
  knowledge: KnowledgeItem[];
  tags: string[];
}

export interface Relationship {
  sourceId: string;
  targetId: string;
  type: "prerequisite" | "related";
  strength: number;
}
