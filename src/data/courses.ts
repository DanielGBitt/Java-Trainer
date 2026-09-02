import type { Course } from "@/types/course";

export const COURSES: Course[] = [
  {
    id: "intro-programacion",
    title: "Introducción a la Programación",
    description: "Datos, variables, asignación, constantes, nombres y tipos primitivos.",
    icon: "📦",
    categories: ["fundamentals", "conventions", "typing", "primitives"],
  },
  {
    id: "logica-programacion",
    title: "Lógica de Programación",
    description: "Operadores, comparaciones, aritmética y lógica booleana.",
    icon: "🧠",
    categories: ["operators", "logic"],
  },
  {
    id: "bases-de-datos",
    title: "Bases de Datos",
    description: "Modelado y SQL (placeholder hasta primer aporte).",
    icon: "🗄️",
    categories: ["bd-modelado", "bd-sql"],
  },
];

export function getCourseById(id: string) {
  return COURSES.find((c) => c.id === id);
}
