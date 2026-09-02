import { allKnowledgeUnits } from "@/data/java/knowledgeUnits";
import { relationships } from "@/data/java/relationships";
import type { KnowledgeUnit, Relationship } from "@/types/knowledge";

export function getAllUnits(): KnowledgeUnit[] {
  return allKnowledgeUnits;
}

export function getUnitById(id: string): KnowledgeUnit | undefined {
  return allKnowledgeUnits.find((u) => u.id === id);
}

export function getUnitsByCategory(category: string): KnowledgeUnit[] {
  return allKnowledgeUnits.filter((u) => u.category === category);
}

export function getRelatedUnits(unitId: string): Relationship[] {
  return relationships.filter(
    (r) => r.sourceId === unitId || r.targetId === unitId
  );
}

export function getPrerequisites(unitId: string): string[] {
  return relationships
    .filter((r) => r.targetId === unitId && r.type === "prerequisite")
    .map((r) => r.sourceId);
}

export function getDependents(unitId: string): string[] {
  return relationships
    .filter((r) => r.sourceId === unitId && r.type === "prerequisite")
    .map((r) => r.targetId);
}

export function getAllCategories(): string[] {
  const cats = new Set(allKnowledgeUnits.map((u) => u.category));
  return Array.from(cats);
}
