import type { KnowledgeUnit } from "@/types/knowledge";

export const typingUnits: KnowledgeUnit[] = [
  {
    id: "java-tipado",
    title: "Tipado en Java",
    category: "typing",
    difficulty: 2,
    tags: ["tipado", "fuerte", "estatico"],
    knowledge: [
      {
        id: "tipado-fuerte",
        type: "definition",
        content: "Tipado fuerte: el lenguaje no permite operaciones entre tipos incompatibles sin conversión explícita.",
      },
      {
        id: "tipado-fuerte-ejemplo",
        type: "example",
        content: 'int x = "hola"; // ERROR en Java (tipado fuerte)\n// Java NO convierte automáticamente String a int',
      },
      {
        id: "tipado-debil",
        type: "comparison",
        content: "Tipado fuerte (Java): error en compilación si mezclas tipos\nTipado débil (JavaScript): convierte silenciosamente, puede dar resultados inesperados",
      },
      {
        id: "tipado-estatico",
        type: "definition",
        content: "Tipado estático: el tipo de cada variable se verifica en tiempo de compilación. Si declares int edad = 25;, edad siempre será int.",
      },
      {
        id: "tipado-dinamico",
        type: "comparison",
        content: "Estático (Java): tipo se conoce al compilar\nDinámico (Python, JS): tipo se determina en ejecución\nJava es estático + fuerte.",
      },
      {
        id: "tipado-java",
        type: "fact",
        content: "Java es un lenguaje de tipado FUERTE y ESTÁTICO. Esto significa más seguridad pero menos flexibilidad que lenguajes dinámicos.",
      },
    ],
  },
];
