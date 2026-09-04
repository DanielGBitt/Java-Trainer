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
      { id: "logica-informacion-def", type: "definition", content: "Dato = valor sin contexto (42, 12/03, 14:30); información = dato con contexto. Como letras sueltas vs palabras: 'a','b','c' son datos; 'abc' es información con significado." },
      { id: "logica-informacion-rule", type: "rule", content: "Dato + contexto y significado = información; sin contexto no es información." },
      { id: "logica-informacion-ex", type: "example", content: '42 → información: "temperatura 42°C" (qué mide y unidad).' },
      { id: "logica-informacion-comp", type: "comparison", content: "Dato suelto (42, '12/03', '14:30') sin contexto vs información ('temperatura 42°C', 'nacimiento 12/03', 'hora 14:30') con significado claro." },
    ],
  },
  {
    id: "logica-variable",
    title: "Variable",
    category: "fundamentals",
    difficulty: 1,
    tags: ["logica", "variable", "asignacion"],
    knowledge: [
      { id: "logica-variable-def", type: "definition", content: "Variable = contenedor con nombre, tipo y valor que puede cambiar. Como una caja etiquetada: 'edad' (nombre) es de tipo 'entero' (capacidad) y guarda '25' (contenido). Puedes cambiar el contenido, no la etiqueta ni el tipo." },
      { id: "logica-variable-rule", type: "rule", content: "Se declara tipo + nombre = valor; el valor se reasigna con expresiones." },
      { id: "logica-variable-ex", type: "example", content: 'String localidad = "Madrid"; localidad = "Barcelona"; // cambia valor.' },
      { id: "logica-variable-mistake", type: "common_mistake", content: "Declarar sin tipo 'edad = 25;' falla en Java. Siempre: int edad = 25; — el tipo es obligatorio." },
    ],
  },
  {
    id: "logica-constante",
    title: "Constante",
    category: "fundamentals",
    difficulty: 1,
    tags: ["logica", "constante", "final"],
    knowledge: [
      { id: "logica-constante-def", type: "definition", content: "Constante = valor fijo que no cambia durante la ejecución. Como PI = 3.14159 en matemáticas: siempre vale lo mismo, no puedes reasignarla." },
      { id: "logica-constante-rule", type: "rule", content: "En Java se declara con final y nombre SCREAMING_SNAKE_CASE." },
      { id: "logica-constante-ex", type: "example", content: "final int VELOCIDAD_LUZ = 300000; // km/s, no se reasigna." },
      { id: "logica-constante-mistake", type: "common_mistake", content: "Usar 'const' en vez de 'final' es error en Java (const es reserva). Reasignar VELOCIDAD_LUZ = 500; no compila." },
    ],
  },
];

// Lote 2 — Moy §2 Reglas y Estilos
export const moyLote2Units: KnowledgeUnit[] = [
  {
    id: "logica-nomenclatura-reglas",
    title: "Reglas de Nomenclatura",
    category: "conventions",
    difficulty: 1,
    tags: ["logica", "nomenclatura", "reglas", "identificador"],
    knowledge: [
      { id: "logica-nomenclatura-reglas-def", type: "definition", content: "Identificador = nombre sin espacio formado por letras, números, _ y $. Como una contraseña: ciertos caracteres son válidos, otros no. Las reglas evitan ambigüedad al compilador." },
      { id: "logica-nomenclatura-reglas-rule", type: "rule", content: "No inicia con número y no puede ser palabra reservada if/while/for." },
      { id: "logica-nomenclatura-reglas-ex", type: "example", content: "Válido: _contador, $precio. Inválido: 2doNombre, mi edad." },
      { id: "logica-nomenclatura-reglas-mistake", type: "common_mistake", content: "if como variable es ERROR: if = 5 compila mal; usa condicion." },
    ],
  },
  {
    id: "logica-convenciones-estilos",
    title: "Estilos de Escritura",
    category: "conventions",
    difficulty: 1,
    tags: ["logica", "camelCase", "snake_case", "SCREAMING_SNAKE_CASE", "kebab", "l33t", "hungara"],
    knowledge: [
      { id: "logica-convenciones-estilos-def", type: "definition", content: "Estilo = convención de mayúsculas y separadores para nombres." },
      { id: "logica-convenciones-estilos-rule", type: "rule", content: "Java usa: camelCase para variables/métodos (fechaDeNacimiento), SCREAMING_SNAKE_CASE para constantes (MAX_SIZE). snake_case es de Python/C, kebab-case de CSS/HTML, l33t no es ningún lenguaje. strNombre es notación húngara legacy (no recomendada en Java moderno)." },
      { id: "logica-convenciones-estilos-ex", type: "example", content: "fechaDeNacimiento (camelCase) vs FECHA_DE_NACIMIENTO (SCREAMING) vs P44SW0RD/fecha-de-nacimiento no Java." },
      { id: "logica-convenciones-estilos-comp", type: "comparison", content: "camelCase:fechaDeNacimiento vs snake_case:fecha_de_nacimiento vs SCREAMING:FECHA_DE_NACIMIENTO vs kebab:fecha-de-nacimiento" },
    ],
  },
];

export const logicaProgramacionUnits = [...moyLote1Units, ...moyLote2Units, ...operatorsUnits, ...logicUnits];
