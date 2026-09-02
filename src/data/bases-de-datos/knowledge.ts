import type { KnowledgeUnit } from "@/types/knowledge";

export const basesDeDatosUnits: KnowledgeUnit[] = [
  {
    id: "bd-entidad-atributo",
    title: "Entidad y Atributo",
    category: "bd-modelado",
    difficulty: 1,
    tags: ["bd", "entidad", "atributo", "clave"],
    knowledge: [
      { id: "bd-entidad-def", type: "definition", content: "Entidad = objeto del mundo real modelable con identidad propia (Cliente, Pedido, Producto)." },
      { id: "bd-entidad-rule", type: "rule", content: "Toda entidad lleva clave primaria única que la identifica (id) y no puede repetirse." },
      { id: "bd-entidad-ex", type: "example", content: "Cliente(id, nombre, email) → id=7 identifica a Ana; email debe ser único." },
    ],
  },
  {
    id: "bd-relacion",
    title: "Relaciones",
    category: "bd-modelado",
    difficulty: 1,
    tags: ["bd", "relacion", "cardinalidad"],
    knowledge: [
      { id: "bd-rel-def", type: "definition", content: "Relación = vínculo entre entidades con cardinalidad (1:1, 1:N, N:M)." },
      { id: "bd-rel-rule", type: "rule", content: "1:N usa clave foránea en el lado N; N:M requiere tabla intermedia." },
      { id: "bd-rel-ex", type: "example", content: "Cliente 1:N Pedido → Pedido.cliente_id referencia Cliente.id; Pedido-Producto N:M → PedidoProducto." },
    ],
  },
  {
    id: "bd-sql-select",
    title: "SQL SELECT básico",
    category: "bd-sql",
    difficulty: 1,
    tags: ["bd", "sql", "select"],
    knowledge: [
      { id: "bd-sql-def", type: "definition", content: "SELECT recupera filas de una tabla filtrando con WHERE y ordenando con ORDER BY." },
      { id: "bd-sql-syntax", type: "syntax", content: "SELECT columnas FROM tabla WHERE condición;", context: "Sintaxis básica" },
      { id: "bd-sql-ex", type: "example", content: "SELECT nombre FROM Cliente WHERE id = 7; → devuelve Ana." },
    ],
  },
];
