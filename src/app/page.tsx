"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/progress/StatsCard";
import { PlayerAvatar } from "@/components/player/PlayerAvatar";
import { getProgressStats, getUnitsNeedingReview } from "@/engine/learning/index";
import { storage } from "@/storage";
import { COURSES, COURSE_ORDER } from "@/data/courses";
import { buildGameMap } from "@/game/map/builder";

export default function DashboardPage() {
  const stats = useMemo(() => getProgressStats(), []);
  const reviewUnits = useMemo(() => getUnitsNeedingReview(), []);
  const progress = useMemo(() => storage.getProgress(), []);
  const orderedCourses = useMemo(() => COURSE_ORDER.map((id) => COURSES.find((c) => c.id === id)!), []);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Java Trainer</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">Elige tu materia — cada mapa es independiente.</p>
        </div>
        <PlayerAvatar level={stats.level} xp={stats.xp} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <StatsCard title="Unidades" value={`${stats.masteredUnits}/${stats.totalUnits}`} description="dominadas" icon="📚" />
        <StatsCard title="Ejercicios" value={stats.totalAttempts} description="realizados" icon="💻" />
        <StatsCard title="Precisión" value={`${stats.accuracy}%`} description="respuestas correctas" icon="🎯" />
        <StatsCard title="Por revisar" value={reviewUnits.length} description="unidades pendientes" icon="🔄" />
      </div>

      <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
        {orderedCourses.map((course) => {
          const nodeCount = buildGameMap(course.id).length;
          const isAvailable = nodeCount > 0;
          return (
            <Card
              key={course.id}
              className={isAvailable ? "border-primary/30" : "border-dashed bg-muted/30 opacity-95"}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>{course.icon}</span> {course.title}
                  {!isAvailable && (
                    <Badge variant="outline" className="ml-auto text-[11px] tracking-wide">
                      Próximamente
                    </Badge>
                  )}
                  {isAvailable && (
                    <Badge className="ml-auto bg-emerald-600 text-white text-[11px]">Disponible</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                <p className="text-xs text-muted-foreground/70 mb-4">
                  {isAvailable ? `${nodeCount} nodos · ${course.categories.join(" · ")}` : "0 nodos — envía apuntes para activar"}
                </p>
                <Link href={`/c/${course.id}/map`}>
                  <Button className="w-full" variant={isAvailable ? "default" : "outline"}>
                    {isAvailable ? "Ir al Mapa" : "Ver mapa (vacío)"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🔄</span> Revisión Rápida
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reviewUnits.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  Tienes {reviewUnits.length} unidad(es) pendientes de revisión.
                </p>
                <Link href={`/practice/${reviewUnits[0].id}`}>
                  <Button className="w-full" variant="outline">
                    Practicar Ahora
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">No hay revisiones pendientes. ¡Sigue aprendiendo!</p>
                <Link href="/c/logica-programacion/map">
                  <Button className="w-full" variant="outline">
                    Ir a Lógica
                  </Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📖</span> Últimos Intentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {progress && progress.attempts.length > 0 ? (
            <div className="space-y-2">
              {progress.attempts
                .slice(-5)
                .reverse()
                .map((attempt) => (
                  <div key={attempt.id} className="flex items-center gap-3 text-sm p-2 rounded-lg bg-muted">
                    <span>{attempt.correct ? "✅" : "❌"}</span>
                    <span className="text-muted-foreground">{attempt.knowledgeUnitId.replace("java-", "")}</span>
                    <span className="text-muted-foreground/70 ml-auto">{new Date(attempt.timestamp).toLocaleTimeString()}</span>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">Aún no has realizado ningún ejercicio. ¡Empieza por Lógica!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
