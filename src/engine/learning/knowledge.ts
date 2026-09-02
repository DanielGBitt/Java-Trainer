import { allKnowledgeUnits } from "@/data/java/knowledgeUnits";
import { relationships } from "@/data/java/relationships";
import { basesDeDatosUnits } from "@/data/bases-de-datos/knowledge";
import { basesDeDatosRelationships } from "@/data/bases-de-datos/relationships";
import type { KnowledgeUnit, Relationship } from "@/types/knowledge";

const allUnits: KnowledgeUnit[] = [...allKnowledgeUnits, ...basesDeDatosUnits];
const allRelationships: Relationship[] = [...relationships, ...basesDeDatosRelationships];

export function getAllUnits(): KnowledgeUnit[] {
  return allUnits;
}

export function getUnitById(id: string): KnowledgeUnit | undefined {
  return allUnits.find((u) => u.id === id);
}

export function getUnitsByCategory(category: string): KnowledgeUnit[] {
  return allUnits.filter((u) => u.category === category);
}

export function getRelatedUnits(unitId: string): Relationship[] {
  return allRelationships.filter(
    (r) => r.sourceId === unitId || r.targetId === unitId
  );
}

export function getPrerequisites(unitId: string): string[] {
  return allRelationships
    .filter((r) => r.targetId === unitId && r.type === "prerequisite")
    .map((r) => r.sourceId);
}

export function getDependents(unitId: string): string[] {
  return allRelationships
    .filter((r) => r.sourceId === unitId && r.type === "prerequisite")
    .map((r) => r.targetId);
}

export function getAllCategories(): string[] {
  const cats = new Set(allUnits.map((u) => u.category));
  return Array.from(cats);
}
