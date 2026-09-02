"use client";

import { useMemo, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { WorldMap } from "@/components/map/WorldMap";
import { Button } from "@/components/ui/button";
import { buildGameMap } from "@/game/map/builder";
import { initializeGameNodes } from "@/game/progression/unlocker";
import { getAllMastery } from "@/engine/mastery/index";
import { storage } from "@/storage";
import { COURSES } from "@/data/courses";

export default function CourseMapPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const router = useRouter();
  const course = COURSES.find((c) => c.id === courseId);

  const nodes = useMemo(() => {
    const baseNodes = buildGameMap(courseId);
    const mastery = getAllMastery();
    const progress = storage.getProgress();
    const completedNodes = progress?.gameProgress.completedNodes ?? [];
    return initializeGameNodes(baseNodes, completedNodes, mastery, []);
  }, [courseId]);

  const handleNodeClick = useCallback(
    (nodeId: string) => {
      router.push(`/c/${courseId}/study/${nodeId}`);
    },
    [router, courseId]
  );

  if (!course) {
    return <div className="p-6 text-center">Curso no encontrado</div>;
  }

  if (nodes.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
          {course.icon} {course.title}
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mb-6">{course.description}</p>
        <div className="py-16 text-center space-y-4 border border-dashed rounded-lg bg-muted/30">
          <p className="text-6xl">🧩</p>
          <h2 className="text-lg font-semibold text-foreground">Contenido aún no disponible</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Envía tus apuntes de {course.title} para generar el primer tema. Mientras tanto puedes practicar
            Lógica de Programación.
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <Link href="/c/logica-programacion/map">
              <Button>Ir a Lógica</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Volver al inicio</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
        {course.icon} {course.title}
      </h1>
      <p className="text-muted-foreground text-sm sm:text-base mb-6">{course.description}</p>
      <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6 overscroll-contain">
        <div className="min-w-[760px]">
          <WorldMap nodes={nodes} onNodeClick={handleNodeClick} />
        </div>
      </div>
    </div>
  );
}
