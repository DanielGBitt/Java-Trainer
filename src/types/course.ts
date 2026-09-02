export type CourseId = "intro-programacion" | "logica-programacion" | "bases-de-datos";

export interface Course {
  id: CourseId;
  title: string;
  description: string;
  icon: string;
  categories: string[];
}
