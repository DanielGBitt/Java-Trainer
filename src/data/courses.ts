import type { Course, CourseId } from "@/types/course";

export const COURSE_ORDER: CourseId[] = ["intro-programacion", "logica-programacion", "bases-de-datos"];

export const COURSES: Course[] = [
  {
    id: "intro-programacion",
    title: "Introducción a la Programación",
    description: "Web, HTML5 semántico, enlaces/medios y tablas/formularios con <style>.",
    icon: "📦",
    categories: ["intro-web", "intro-html", "intro-media", "intro-tablas"],
  },
  {
    id: "logica-programacion",
    title: "Lógica de Programación",
    description: "Operadores, comparaciones, aritmética y lógica booleana. Lotes 1-2 Moy: Datos + Reglas/Estilos.",
    icon: "🧠",
    categories: ["fundamentals", "conventions", "operators", "logic"],
  },
  {
    id: "bases-de-datos",
    title: "Bases de Datos",
    description: "Fundamentos, modelado ER y normalización 1FN-3FN. De qué es una BD a datos sin redundancia.",
    icon: "🗄️",
    categories: ["bd-modelado", "bd-normalizacion"],
  },
];

export function getCourseById(id: string) {
  return COURSES.find((c) => c.id === id);
}
