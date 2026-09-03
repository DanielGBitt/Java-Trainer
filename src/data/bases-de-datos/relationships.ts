import type { Relationship } from "@/types/knowledge";

export const basesDeDatosRelationships: Relationship[] = [
  { sourceId: "bd-base-datos", targetId: "bd-componentes", type: "prerequisite", strength: 1 },
  { sourceId: "bd-componentes", targetId: "bd-tipos", type: "prerequisite", strength: 1 },
  { sourceId: "bd-tipos", targetId: "bd-entidad", type: "prerequisite", strength: 1 },
  { sourceId: "bd-entidad", targetId: "bd-atributo", type: "prerequisite", strength: 1 },
  { sourceId: "bd-atributo", targetId: "bd-modelo-er", type: "prerequisite", strength: 1 },
  { sourceId: "bd-atributo", targetId: "bd-normalizacion-1fn", type: "prerequisite", strength: 0.8 },
  { sourceId: "bd-modelo-er", targetId: "bd-normalizacion-1fn", type: "prerequisite", strength: 1 },
  { sourceId: "bd-normalizacion-1fn", targetId: "bd-normalizacion-2fn", type: "prerequisite", strength: 1 },
  { sourceId: "bd-normalizacion-2fn", targetId: "bd-normalizacion-3fn", type: "prerequisite", strength: 1 },
  { sourceId: "bd-tipos", targetId: "bd-modelo-er", type: "related", strength: 0.6 },
  { sourceId: "bd-normalizacion-1fn", targetId: "bd-normalizacion-3fn", type: "related", strength: 0.5 },
];
