import type { KnowledgeUnit } from "@/types/knowledge";

export const conventionsUnits: KnowledgeUnit[] = [
  {
    id: "java-camelcase",
    title: "camelCase",
    category: "conventions",
    difficulty: 1,
    tags: ["convenciones", "nombres"],
    knowledge: [
      {
        id: "cc-definition",
        type: "definition",
        content: "camelCase es una convención donde la primera palabra empieza en minúscula y las siguientes en mayúscula.",
      },
      {
        id: "cc-syntax",
        type: "rule",
        content: "Se usa para nombres de variables, métodos y parámetros en Java.",
      },
      {
        id: "cc-example",
        type: "example",
        content: "miNombre, calcularTotal, edadMaxima, esActivo",
      },
      {
        id: "cc-contrast",
        type: "comparison",
        content: "camelCase: miVariable (variable)\nSCREAMING_SNAKE_CASE: MI_CONSTANTE (constante)\nNo confundir con kebab-case (mi-variable) que NO se usa en Java.",
      },
    ],
  },
  {
    id: "java-snake-case",
    title: "snake_case / SCREAMING_SNAKE_CASE",
    category: "conventions",
    difficulty: 1,
    tags: ["convenciones", "nombres"],
    knowledge: [
      {
        id: "sc-definition",
        type: "definition",
        content: "snake_case usa guiones bajos para separar palabras. SCREAMING_SNAKE_CASE es igual pero en mayúsculas.",
      },
      {
        id: "sc-usage",
        type: "rule",
        content: "En Java, SCREAMING_SNAKE_CASE se usa para constantes. snake_case NO es convención estándar en Java.",
      },
      {
        id: "sc-example",
        type: "example",
        content: "final double GRAVEDAD = 9.81;\nfinal String NOMBRE_BASE = \"usuarios\";\nfinal int MAX_INTENTOS = 3;",
      },
      {
        id: "sc-comparison",
        type: "comparison",
        content: "Java: miVariable (camelCase) vs Python: mi_variable (snake_case)\nJava usa camelCase; Python usa snake_case.",
      },
    ],
  },
  {
    id: "java-hungarian-notation",
    title: "Hungarian Notation",
    category: "conventions",
    difficulty: 2,
    tags: ["convenciones", "nombres", "legacy"],
    knowledge: [
      {
        id: "hn-definition",
        type: "definition",
        content: "Hungarian Notation es una convención donde el nombre codifica el tipo de la variable.",
      },
      {
        id: "hn-example",
        type: "example",
        content: "strNombre (string), intEdad (int), bActivo (boolean), arr Lista (array)",
      },
      {
        id: "hn-status",
        type: "fact",
        content: "En Java moderno NO se recomienda Hungarian Notation. Los IDE muestran el tipo. Pero es útil para entender código legacy.",
      },
      {
        id: "hn-convention",
        type: "comparison",
        content: "Hungarian: strNombre → codifica tipo\nJava moderno: nombre → solo semántico\nPrefiere nombrar por qué hace, no por qué tipo es.",
      },
    ],
  },
];
