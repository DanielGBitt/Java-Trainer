"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/progress/StatsCard";
import { WeaknessList } from "@/components/progress/WeaknessList";
import { PlayerAvatar } from "@/components/player/PlayerAvatar";
import { getProgressStats } from "@/engine/learning/index";
import { getAllMastery } from "@/engine/mastery/index";
import { storage } from "@/storage";
import { CATEGORY_LABELS } from "@/lib/constants";

export default function ProgressPage() {
  const stats = useMemo(() => getProgressStats(), []);
  const mastery = useMemo(() => getAllMastery(), []);
  const progress = useMemo(() => storage.getProgress(), []);

  const masteryByCategory = useMemo(() => {
    const byCategory: Record<string, { overall: number; count: number }> = {};

    Object.values(mastery).forEach((m) => {
      // Find unit category
      const unitId = m.knowledgeUnitId;
      const category = unitId.split("-")[1] ?? "other";

      if (!byCategory[category]) {
        byCategory[category] = { overall: 0, count: 0 };
      }
      byCategory[category].overall += m.overallLevel;
      byCategory[category].count += 1;
    });

    return Object.entries(byCategory).map(([cat, data]) => ({
      category: cat,
      label: CATEGORY_LABELS[cat] ?? cat,
      average: Math.round(data.overall / data.count),
      count: data.count,
    }));
  }, [mastery]);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Progreso</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Tu avance en Java Trainer
          </p>
        </div>
        <PlayerAvatar level={stats.level} xp={stats.xp} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <StatsCard
          title="Total Unidades"
          value={stats.totalUnits}
          icon="📚"
        />
        <StatsCard
          title="Dominadas"
          value={stats.masteredUnits}
          description="≥ 80% mastery"
          icon="🏆"
        />
        <StatsCard
          title="Ejercicios"
          value={stats.totalAttempts}
          icon="💻"
        />
        <StatsCard
          title="Precisión"
          value={`${stats.accuracy}%`}
          icon="🎯"
        />
      </div>

      {/* Mastery by Category */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📊</span> Progreso por Categoría
          </CardTitle>
        </CardHeader>
        <CardContent>
          {masteryByCategory.length > 0 ? (
            <div className="space-y-4">
              {masteryByCategory.map((cat) => (
                <div key={cat.category} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">
                      {cat.label}
                    </span>
                    <span className="text-muted-foreground">
                      {cat.count} unidades
                    </span>
                  </div>
                  <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-primary transition-all duration-500"
                      style={{ width: `${cat.average}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-right">
                    {cat.average}% promedio
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Aún no hay datos de mastery. ¡Empieza a practicar!
            </p>
          )}
        </CardContent>
      </Card>

      {/* Weaknesses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🔍</span> Debilidades Detectadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <WeaknessList mastery={mastery} />
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📋</span> Actividad Reciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          {progress && progress.attempts.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {progress.attempts
                .slice(-20)
                .reverse()
                .map((attempt) => (
                  <div
                    key={attempt.id}
                    className="flex items-center gap-3 text-sm p-2 rounded-lg bg-muted"
                  >
                    <span>{attempt.correct ? "✅" : "❌"}</span>
                    <span className="text-muted-foreground flex-1">
                      {attempt.knowledgeUnitId.replace("java-", "")}
                    </span>
                    <span className="text-xs text-muted-foreground/70">
                      {new Date(attempt.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No hay actividad reciente.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>💾</span> Datos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              variant="outline"
              onClick={() => {
                const data = storage.exportProgress();
                const blob = new Blob([data], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "java-trainer-progress.json";
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              Exportar Progreso
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                if (
                  confirm(
                    "¿Estás seguro? Esto borrará todo tu progreso."
                  )
                ) {
                  storage.resetProgress();
                  window.location.reload();
                }
              }}
            >
              Reiniciar Progreso
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
