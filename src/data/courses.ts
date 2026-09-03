import type { Course, CourseId } from "@/types/course";

export const COURSE_ORDER: CourseId[] = ["intro-programacion", "logica-programacion", "bases-de-datos"];

export const COURSES: Course[] = [
  {
    id: "intro-programacion",
    title: "Introducción a la Programación",
    description: "Próximamente — envía tus apuntes para generar el primer tema.",
    icon: "📦",
    categories: [],
  },
  {
    id: "logica-programacion",
    title: "Lógica de Programación",
    description: "Operadores, comparaciones, aritmética y lógica booleana. Lote 1 Moy: Dato/Variable/Constante.",
    icon: "🧠",
    categories: ["fundamentals", "operators", "logic"],
  },
  {
    id: "bases-de-datos",
    title: "Bases de Datos",
    description: "Próximamente — envía tus apuntes para generar el primer tema.",
    icon: "🗄️",
    categories: [],
  },
];

export function getCourseById(id: string) {
  return COURSES.find((c) => c.id === id);
}
