import type { KnowledgeUnit } from "@/types/knowledge";

export const operatorsUnits: KnowledgeUnit[] = [
  {
    id: "java-op-aritmeticos",
    title: "Operadores Aritméticos",
    category: "operators",
    difficulty: 1,
    tags: ["operadores", "aritmética", "+", "-", "*", "/"],
    knowledge: [
      {
        id: "arith-definition",
        type: "definition",
        content: "Los operadores aritméticos realizan operaciones matemáticas sobre valores numéricos.",
      },
      {
        id: "arith-operators",
        type: "syntax",
        content: "+ (suma)\n- (resta)\n* (multiplicación)\n/ (división)\n% (módulo/residuo)",
      },
      {
        id: "arith-division",
        type: "rule",
        content: "La división entre enteros trunca el resultado (no redondea). 7 / 2 = 3, no 3.5.",
      },
      {
        id: "arith-example",
        type: "example",
        content: "int a = 10 + 3;   // 13\nint b = 10 - 3;   // 7\nint c = 10 * 3;   // 30\nint d = 10 / 3;   // 3 (trunca)\nint e = 10 % 3;   // 1 (residuo)",
      },
      {
        id: "arith-precedence",
        type: "rule",
        content: "Precedencia: * / % se evalúan antes de + -. Usa paréntesis para claridad: (a + b) * c.",
      },
    ],
  },
  {
    id: "java-op-comparacion",
    title: "Operadores de Comparación",
    category: "operators",
    difficulty: 2,
    tags: ["operadores", "comparación", "==", ">", "<"],
    knowledge: [
      {
        id: "comp-definition",
        type: "definition",
        content: "Los operadores de comparación comparan dos valores y devuelven un boolean (true o false).",
      },
      {
        id: "comp-operators",
        type: "syntax",
        content: "== (igual a)\n!= (diferente de)\n> (mayor que)\n< (menor que)\n>= (mayor o igual que)\n<= (menor o igual que)",
      },
      {
        id: "comp-boolean-result",
        type: "fact",
        content: "Todos los operadores de comparación producen un valor boolean.",
      },
      {
        id: "comp-assignment-vs-comparison",
        type: "common_mistake",
        content: "= es asignación, == es comparación. if (edad = 18) es ERROR (asigna, no compara). if (edad == 18) es correcto.",
      },
      {
        id: "comp-example",
        type: "example",
        content: "5 == 5      // true\n5 != 3      // true\n5 > 3       // true\n5 < 3       // false\n5 >= 5      // true\n5 <= 4      // false",
      },
    ],
  },
  {
    id: "java-modulo",
    title: "Operador Módulo (%)",
    category: "operators",
    difficulty: 2,
    tags: ["operadores", "módulo", "residuo", "par"],
    knowledge: [
      {
        id: "mod-definition",
        type: "definition",
        content: "El operador % (módulo) devuelve el residuo de la división entera entre dos números.",
      },
      {
        id: "mod-syntax",
        type: "syntax",
        content: "a % b = residuo de a dividido entre b",
      },
      {
        id: "mod-examples",
        type: "example",
        content: "17 % 5 = 2   (17 = 3×5 + 2)\n10 % 2 = 0   (10 es par)\n15 % 4 = 3   (15 = 3×4 + 3)\n7 % 10 = 7   (7 < 10, residuo es 7)",
      },
      {
        id: "mod-par",
        type: "application",
        content: "Para verificar si un número es par: x % 2 == 0. Si el residuo al dividir entre 2 es 0, es par.",
      },
      {
        id: "mod-mistake",
        type: "common_mistake",
        content: "11 % 3 = 2, NO 1. El residuo de 11 entre 3 es 2 (11 = 3×3 + 2).",
      },
    ],
  },
];
