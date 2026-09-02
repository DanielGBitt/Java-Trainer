import type { KnowledgeUnit } from "@/types/knowledge";

export const fundamentalsUnits: KnowledgeUnit[] = [
  {
    id: "java-datos-vs-informacion",
    title: "Datos vs Información",
    category: "fundamentals",
    difficulty: 1,
    tags: ["conceptos", "intro"],
    knowledge: [
      {
        id: "dvsi-definition",
        type: "definition",
        content: "Un dato es un valor sin contexto. Información es un dato con significado.",
      },
      {
        id: "dvsi-example",
        type: "example",
        content: "42 es un dato. 'La temperatura es 42°C' es información. La diferencia es el contexto que le da significado al valor.",
      },
      {
        id: "dvsi-application",
        type: "application",
        content: "En programación: 30 es un dato. int temperatura = 30; es información porque tiene nombre y contexto.",
      },
    ],
  },
  {
    id: "java-variable-concepto",
    title: "Variable",
    category: "fundamentals",
    difficulty: 1,
    tags: ["variables", "concepto", "memoria"],
    knowledge: [
      {
        id: "var-definition",
        type: "definition",
        content: "Una variable es un espacio en memoria que almacena un valor con un nombre y un tipo.",
      },
      {
        id: "var-parts",
        type: "fact",
        content: "Toda variable tiene: nombre (identificador), tipo (qué tipo de dato guarda) y valor (qué contiene).",
      },
      {
        id: "var-analogy",
        type: "example",
        content: "Una variable es como una caja etiquetada: la etiqueta es el nombre, el tamaño de la caja es el tipo, y lo que hay dentro es el valor.",
      },
      {
        id: "var-syntax",
        type: "syntax",
        content: "tipo nombre = valor;",
        context: "Declaración y asignación en una sola línea",
      },
    ],
  },
  {
    id: "java-asignacion",
    title: "Asignación",
    category: "fundamentals",
    difficulty: 1,
    tags: ["variables", "asignacion", "="],
    knowledge: [
      {
        id: "asig-definition",
        type: "definition",
        content: "La asignación es el proceso de guardar un valor en una variable usando el operador =.",
      },
      {
        id: "asig-syntax",
        type: "syntax",
        content: "A = valor;",
        context: "El operador = asigna el valor de la derecha a la variable de la izquierda",
      },
      {
        id: "asig-evaluation",
        type: "procedure",
        content: "Las expresiones del lado derecho se evalúan primero. En B = A + 1, se calcula A + 1 y luego se guarda en B.",
      },
      {
        id: "asig-example",
        type: "example",
        content: "int A = 2;\nint B = A + 1;\n// Ahora B vale 3, porque se evaluó 2 + 1 = 3",
      },
    ],
  },
  {
    id: "java-constantes",
    title: "Constantes (final)",
    category: "fundamentals",
    difficulty: 2,
    tags: ["constantes", "final", "SCREAMING_SNAKE_CASE"],
    knowledge: [
      {
        id: "const-definition",
        type: "definition",
        content: "Una constante es una variable cuyo valor no puede cambiarse después de su inicialización.",
      },
      {
        id: "const-syntax",
        type: "syntax",
        content: "final tipo NOMBRE = valor;",
        context: "La palabra clave final marca la constante",
      },
      {
        id: "const-naming",
        type: "rule",
        content: "Las constantes se escriben en SCREAMING_SNAKE_CASE: TODO EN MAYÚSCULAS CON GUIONES BAJOS.",
      },
      {
        id: "const-example",
        type: "example",
        content: "final int VELOCIDAD_LUZ = 300000;\n// VELOCIDAD_LUZ no puede modificarse después",
      },
      {
        id: "const-mistake",
        type: "common_mistake",
        content: "Intentar reasignar una constante: VELOCIDAD_LUZ = 0; → Error de compilación.",
      },
    ],
  },
  {
    id: "java-nombres-reglas",
    title: "Reglas para nombres",
    category: "fundamentals",
    difficulty: 1,
    tags: ["nombres", "identificadores", "reglas"],
    knowledge: [
      {
        id: "names-rule1",
        type: "rule",
        content: "No pueden contener espacios: 'mi variable' es incorrecto.",
      },
      {
        id: "names-rule2",
        type: "rule",
        content: "No pueden comenzar con un número: '2nombre' es incorrecto.",
      },
      {
        id: "names-rule3",
        type: "rule",
        content: "No se pueden usar palabras reservadas del lenguaje: 'class', 'int', 'if', 'public', etc.",
      },
      {
        id: "names-rule4",
        type: "rule",
        content: "Solo pueden contener letras, números, _ y $. Son sensibles a mayúsculas: edad ≠ Edad ≠ EDAD.",
      },
      {
        id: "names-valid",
        type: "example",
        content: "Nombres válidos: miEdad, _contador, $precio, nombre2",
      },
      {
        id: "names-invalid",
        type: "common_mistake",
        content: "Nombres inválidos: 2doNombre (empieza con número), mi nombre (espacio), int (reservada).",
      },
    ],
  },
  {
    id: "java-tipo-dato",
    title: "Tipos de dato",
    category: "fundamentals",
    difficulty: 2,
    tags: ["tipos", "clasificacion"],
    knowledge: [
      {
        id: "tipos-definition",
        type: "definition",
        content: "Un tipo de dato define qué种类 de valores puede contener una variable y qué operaciones se pueden realizar con ella.",
      },
      {
        id: "tipos-categories",
        type: "fact",
        content: "Java tiene 8 tipos primitivos (byte, short, int, long, float, double, boolean, char) y tipos de referencia (objetos, arrays, etc.).",
      },
      {
        id: "tipos-strong",
        type: "definition",
        content: "Java tiene tipado fuerte: no permite operaciones entre tipos incompatibles sin conversión explícita.",
      },
      {
        id: "tipos-static",
        type: "definition",
        content: "Java tiene tipado estático: el tipo de cada variable se verifica en tiempo de compilación, no en tiempo de ejecución.",
      },
    ],
  },
];
