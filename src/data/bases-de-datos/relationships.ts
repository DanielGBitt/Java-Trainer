import type { Relationship } from "@/types/knowledge";

export const basesDeDatosRelationships: Relationship[] = [
  { sourceId: "bd-entidad-atributo", targetId: "bd-relacion", type: "prerequisite", strength: 1 },
  { sourceId: "bd-relacion", targetId: "bd-sql-select", type: "prerequisite", strength: 1 },
];
