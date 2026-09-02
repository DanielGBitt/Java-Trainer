import type { KnowledgeUnit } from "@/types/knowledge";

export const primitivesUnits: KnowledgeUnit[] = [
  {
    id: "java-int",
    title: "int",
    category: "primitives",
    difficulty: 1,
    tags: ["primitivo", "entero"],
    knowledge: [
      {
        id: "int-definition",
        type: "definition",
        content: "int es un tipo primitivo para números enteros de 32 bits.",
      },
      {
        id: "int-size",
        type: "fact",
        content: "Ocupa 4 bytes en memoria.",
      },
      {
        id: "int-range",
        type: "fact",
        content: "Rango: -2,147,483,648 a 2,147,483,647 (aproximadamente -2 mil millones a +2 mil millones).",
      },
      {
        id: "int-default",
        type: "fact",
        content: "Valor por defecto de int en un atributo de clase: 0.",
      },
      {
        id: "int-example",
        type: "example",
        content: "int edad = 25;\nint temperatura = -10;\nint contador = 0;",
      },
    ],
  },
  {
    id: "java-double-float",
    title: "double / float",
    category: "primitives",
    difficulty: 2,
    tags: ["primitivo", "decimal", "flotante"],
    knowledge: [
      {
        id: "double-definition",
        type: "definition",
        content: "double y float son tipos primitivos para números decimales (punto flotante).",
      },
      {
        id: "float-size",
        type: "fact",
        content: "float: 4 bytes, precisión de ~7 dígitos decimales.",
      },
      {
        id: "double-size",
        type: "fact",
        content: "double: 8 bytes, precisión de ~15 dígitos decimales. Es el tipo decimal por defecto en Java.",
      },
      {
        id: "float-suffix",
        type: "syntax",
        content: "Para float se usa sufijo F: float precio = 9.99F;",
      },
      {
        id: "double-default",
        type: "fact",
        content: "double es el tipo por defecto: 9.99 sin sufijo es double.",
      },
      {
        id: "float-double-comparison",
        type: "comparison",
        content: "float: menor precisión, menos memoria → útil para gráficos 3D\ndouble: mayor precisión, más memoria → preferido en la mayoría de casos",
      },
    ],
  },
  {
    id: "java-boolean",
    title: "boolean",
    category: "primitives",
    difficulty: 1,
    tags: ["primitivo", "booleano", "verdadero", "falso"],
    knowledge: [
      {
        id: "bool-definition",
        type: "definition",
        content: "boolean es un tipo primitivo que solo puede tener dos valores: true o false.",
      },
      {
        id: "bool-size",
        type: "fact",
        content: "En la especificación no se define un tamaño fijo, pero típicamente ocupa 1 byte en memoria.",
      },
      {
        id: "bool-values",
        type: "fact",
        content: "Solo acepta los literales true y false. NO es 1 o 0, NO es 'true' (String).",
      },
      {
        id: "bool-example",
        type: "example",
        content: "boolean activo = true;\nboolean esMayor = edad >= 18;\nboolean tienePermiso = false;",
      },
      {
        id: "bool-mistake",
        type: "common_mistake",
        content: 'boolean activo = "true"; // ERROR: "true" es String, no boolean\nboolean activo = true; // CORRECTO',
      },
      {
        id: "bool-expression",
        type: "application",
        content: "Las comparaciones (==, >, <, etc.) y operadores lógicos (&&, ||, !) producen valores boolean.",
      },
    ],
  },
  {
    id: "java-char",
    title: "char",
    category: "primitives",
    difficulty: 2,
    tags: ["primitivo", "carácter"],
    knowledge: [
      {
        id: "char-definition",
        type: "definition",
        content: "char es un tipo primitivo que almacena un solo carácter Unicode.",
      },
      {
        id: "char-size",
        type: "fact",
        content: "Ocupa 2 bytes (16 bits). Puede representar caracteres en español, emojis, etc.",
      },
      {
        id: "char-syntax",
        type: "syntax",
        content: "Se declara con comillas simples: char letra = 'A';",
      },
      {
        id: "char-example",
        type: "example",
        content: "char letra = 'A';\nchar numero = '7';\nchar espacio = ' ';\nchar simbolo = '@';",
      },
      {
        id: "char-vs-string",
        type: "comparison",
        content: "char: comillas simples 'A', un solo carácter\nString: comillas dobles \"A\", puede tener múltiples caracteres",
      },
    ],
  },
  {
    id: "java-byte-short-long",
    title: "byte / short / long",
    category: "primitives",
    difficulty: 2,
    tags: ["primitivo", "entero", "tamaños"],
    knowledge: [
      {
        id: "byte-definition",
        type: "definition",
        content: "byte: entero de 8 bits. Rango: -128 a 127. Útil para datos binarios.",
      },
      {
        id: "short-definition",
        type: "definition",
        content: "short: entero de 16 bits. Rango: -32,768 a 32,767.",
      },
      {
        id: "long-definition",
        type: "definition",
        content: "long: entero de 64 bits. Rango: muy grande (~9.2 × 10^18). Se usa sufijo L.",
      },
      {
        id: "byte-size",
        type: "fact",
        content: "byte: 1 byte, short: 2 bytes, int: 4 bytes, long: 8 bytes.",
      },
      {
        id: "long-syntax",
        type: "syntax",
        content: "Para long se usa sufijo L: long poblacion = 8_000_000_000L;",
      },
      {
        id: "comparison-table",
        type: "comparison",
        content: "byte:   1 byte,  -128 a 127\nshort:  2 bytes, -32,768 a 32,767\nint:    4 bytes, -2 mil M a +2 mil M\nlong:   8 bytes, rango enorme\n\nUso típico: byte para archivos, int para todo lo demás, long para IDs grandes.",
      },
    ],
  },
];
