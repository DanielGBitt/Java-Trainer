import type { Relationship } from "@/types/knowledge";

export const introProgramacionRelationships: Relationship[] = [
  { sourceId: "intro-web-fundamentos", targetId: "intro-html-esqueleto", type: "prerequisite", strength: 1 },
  { sourceId: "intro-html-esqueleto", targetId: "intro-html-semantica", type: "prerequisite", strength: 1 },
  { sourceId: "intro-html-semantica", targetId: "intro-enlaces-imagenes", type: "prerequisite", strength: 1 },
  { sourceId: "intro-enlaces-imagenes", targetId: "intro-style-tablas-media", type: "prerequisite", strength: 1 },
  { sourceId: "intro-style-tablas-media", targetId: "intro-formularios", type: "prerequisite", strength: 1 },
];
