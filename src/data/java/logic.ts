import type { KnowledgeUnit } from "@/types/knowledge";

export const logicUnits: KnowledgeUnit[] = [
  {
    id: "java-not",
    title: "NOT (!)",
    category: "logic",
    difficulty: 2,
    tags: ["lógica", "negación", "!"],
    knowledge: [
      {
        id: "not-definition",
        type: "definition",
        content: "El operador ! (NOT) invierte el valor boolean: true → false, false → true. Como un interruptor de luz: si está encendido (!true), lo apagas; si está apagado (!false), lo enciendes.",
      },
      {
        id: "not-syntax",
        type: "syntax",
        content: "!valorBoolean",
      },
      {
        id: "not-example",
        type: "example",
        content: "!true   → false\n!false  → true\n!(5 > 3) → false (porque 5>3 es true, y !true es false)",
      },
      {
        id: "not-application",
        type: "application",
        content: "Útil para invertir condiciones: if (!esAdmin) significa 'si NO es administrador'.",
      },
      {
        id: "not-mistake",
        type: "common_mistake",
        content: "!!true es doble negación innecesaria. No confundir ! (NOT lógico) con ~ (NOT bitwise) — son operadores distintos.",
      },
    ],
  },
  {
    id: "java-and",
    title: "AND (&&)",
    category: "logic",
    difficulty: 2,
    tags: ["lógica", "conjunction", "&&"],
    knowledge: [
      {
        id: "and-definition",
        type: "definition",
        content: "El operador && (AND) devuelve true solo si AMBOS operandos son true. Como una puerta con dos candados: necesitas AMBAS llaves para abrirla. Si una falla, no abre.",
      },
      {
        id: "and-truth-table",
        type: "fact",
        content: "true  && true  → true\ntrue  && false → false\nfalse && true  → false\nfalse && false → false",
      },
      {
        id: "and-short-circuit",
        type: "rule",
        content: "Evaluación cortocircuitada: si el primer operando es false, NO evalúa el segundo (porque ya sabe que el resultado es false).",
      },
      {
        id: "and-example",
        type: "example",
        content: "int edad = 25;\nboolean tieneID = true;\n\nif (edad >= 18 && tieneID) {\n    System.out.println(\"Acceso permitido\");\n}",
      },
      {
        id: "and-combined",
        type: "application",
        content: "Expresiones combinadas: edad >= 18 && edad < 70 → true solo si edad está entre 18 y 69.",
      },
    ],
  },
  {
    id: "java-or",
    title: "OR (||)",
    category: "logic",
    difficulty: 2,
    tags: ["lógica", "disjunction", "||"],
    knowledge: [
      {
        id: "or-definition",
        type: "definition",
        content: "El operador || (OR) devuelve true si AL MENOS UNO de los operandos es true. Como una puerta con dos interruptores: con que UNO esté encendido, hay luz.",
      },
      {
        id: "or-truth-table",
        type: "fact",
        content: "true  || true  → true\ntrue  || false → true\nfalse || true  → true\nfalse || false → false",
      },
      {
        id: "or-short-circuit",
        type: "rule",
        content: "Evaluación cortocircuitada: si el primer operando es true, NO evalúa el segundo.",
      },
      {
        id: "or-example",
        type: "example",
        content: "boolean esAdmin = false;\nboolean esModerador = true;\n\nif (esAdmin || esModerador) {\n    System.out.println(\"Tiene permisos\");\n}",
      },
      {
        id: "or-equivalence",
        type: "application",
        content: "!A || B es equivalente a A <= B en lógica. Útil para simplificar expresiones.",
      },
    ],
  },
];
