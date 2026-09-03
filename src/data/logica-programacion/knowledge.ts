import { operatorsUnits } from "@/data/java/operators";
import { logicUnits } from "@/data/java/logic";
import type { KnowledgeUnit } from "@/types/knowledge";

// Lote 1 — Moy §1 Datos/Variable/Constante (logica-* literal según pedido; categories fundamentals)
export const moyLote1Units: KnowledgeUnit[] = [
  {
    id: "logica-informacion",
    title: "Dato vs Información",
    category: "fundamentals",
    difficulty: 1,
    tags: ["logica", "dato", "informacion", "contexto"],
    knowledge: [
      { id: "logica-informacion-def", type: "definition", content: "Dato = valor sin contexto (42, 12/03, 14:30); información = dato con contexto." },
      { id: "logica-informacion-rule", type: "rule", content: "Dato + contexto y significado = información; sin contexto no es información." },
      { id: "logica-informacion-ex", type: "example", content: '42 → información: "temperatura 42°C" (qué mide y unidad).' },
    ],
  },
  {
    id: "logica-variable",
    title: "Variable",
    category: "fundamentals",
    difficulty: 1,
    tags: ["logica", "variable", "asignacion"],
    knowledge: [
      { id: "logica-variable-def", type: "definition", content: "Variable = contenedor con nombre, tipo y valor que puede cambiar." },
      { id: "logica-variable-rule", type: "rule", content: "Se declara tipo + nombre = valor; el valor se reasigna con expresiones." },
      { id: "logica-variable-ex", type: "example", content: 'String localidad = "Madrid"; localidad = "Barcelona"; // cambia valor.' },
    ],
  },
  {
    id: "logica-constante",
    title: "Constante",
    category: "fundamentals",
    difficulty: 1,
    tags: ["logica", "constante", "final"],
    knowledge: [
      { id: "logica-constante-def", type: "definition", content: "Constante = valor fijo que no cambia durante la ejecución." },
      { id: "logica-constante-rule", type: "rule", content: "En Java se declara con final y nombre SCREAMING_SNAKE_CASE." },
      { id: "logica-constante-ex", type: "example", content: "final int VELOCIDAD_LUZ = 300000; // km/s, no se reasigna." },
    ],
  },
];

export const logicaProgramacionUnits = [...moyLote1Units, ...operatorsUnits, ...logicUnits];
