"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/progress/StatsCard";
import { PlayerAvatar } from "@/components/player/PlayerAvatar";
import { getProgressStats, getUnitsNeedingReview } from "@/engine/learning/index";
import { storage } from "@/storage";

export default function DashboardPage() {
  const stats = useMemo(() => getProgressStats(), []);
  const reviewUnits = useMemo(() => getUnitsNeedingReview(), []);
  const progress = useMemo(() => storage.getProgress(), []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Java Trainer</h1>
          <p className="text-muted-foreground mt-1">
            Tu motor de aprendizaje activo para Java
          </p>
        </div>
        <PlayerAvatar level={stats.level} xp={stats.xp} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Unidades"
          value={`${stats.masteredUnits}/${stats.totalUnits}`}
          description="dominadas"
          icon="📚"
        />
        <StatsCard
          title="Ejercicios"
          value={stats.totalAttempts}
          description="realizados"
          icon="💻"
        />
        <StatsCard
          title="Precisión"
          value={`${stats.accuracy}%`}
          description="respuestas correctas"
          icon="🎯"
        />
        <StatsCard
          title="Por revisar"
          value={reviewUnits.length}
          description="unidades pendientes"
          icon="🔄"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🗺️</span> Mapa del Mundo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Explora los conceptos de Java y desbloquea nuevos nodos.
            </p>
            <Link href="/map">
              <Button className="w-full">Ir al Mapa</Button>
            </Link>
          </CardContent>
        </Card>

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
                <p className="text-sm text-muted-foreground mb-4">
                  No hay revisiones pendientes. ¡Sigue aprendiendo!
                </p>
                <Link href="/map">
                  <Button className="w-full" variant="outline">
                    Explorar Mapa
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
                  <div
                    key={attempt.id}
                    className="flex items-center gap-3 text-sm p-2 rounded-lg bg-muted"
                  >
                    <span>{attempt.correct ? "✅" : "❌"}</span>
                    <span className="text-muted-foreground">
                      {attempt.knowledgeUnitId.replace("java-", "")}
                    </span>
                    <span className="text-muted-foreground/70 ml-auto">
                      {new Date(attempt.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Aún no has realizado ningún ejercicio. ¡Empieza en el mapa!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
