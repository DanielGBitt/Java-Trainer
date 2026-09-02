"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MasteryBar } from "@/components/progress/MasteryBar";
import { getUnitById } from "@/engine/learning/knowledge";
import { getMastery } from "@/engine/mastery/index";
import { getRelatedUnits } from "@/engine/learning/knowledge";
import { CATEGORY_LABELS } from "@/lib/constants";

export default function StudyPage() {
  const params = useParams();
  const nodeId = params.nodeId as string;

  const unit = useMemo(() => getUnitById(nodeId), [nodeId]);
  const mastery = useMemo(() => getMastery(nodeId), [nodeId]);
  const related = useMemo(() => getRelatedUnits(nodeId), [nodeId]);

  if (!unit) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Unidad no encontrada
        </h1>
        <Link href="/map">
          <Button>Volver al Mapa</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div>
        <Link
          href="/map"
          className="text-sm text-blue-600 hover:text-blue-800 mb-2 inline-block"
        >
          ← Volver al Mapa
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{unit.title}</h1>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="secondary">
            {CATEGORY_LABELS[unit.category] ?? unit.category}
          </Badge>
          <Badge variant="outline">
            Dificultad: {unit.difficulty}/3
          </Badge>
        </div>
      </div>

      {/* Mastery Progress */}
      {mastery && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tu Progreso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              {(
                Object.entries(mastery.dimensions) as [
                  string,
                  { level: number }
                ][]
              ).map(([dim, d]) => (
                <MasteryBar
                  key={dim}
                  dimension={dim as "understanding" | "recall" | "syntax" | "application"}
                  level={d.level}
                />
              ))}
            </div>
            <div className="text-center pt-2">
              <span className="text-2xl font-bold text-gray-900">
                {mastery.overallLevel}%
              </span>
              <span className="text-sm text-gray-500 ml-2">general</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Knowledge Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contenido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {unit.knowledge.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-lg bg-gray-50 border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {item.type}
                </Badge>
              </div>
              <p className="text-sm text-gray-800 whitespace-pre-wrap">
                {item.content}
              </p>
              {item.context && (
                <p className="text-xs text-gray-500 mt-2 italic">
                  {item.context}
                </p>
              )}
              {item.correctedContent && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-xs font-medium text-yellow-800 mb-1">
                    Corrección:
                  </p>
                  <p className="text-sm text-yellow-900">
                    {item.correctedContent}
                  </p>
                  {item.correctionExplanation && (
                    <p className="text-xs text-yellow-700 mt-1">
                      {item.correctionExplanation}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Related Units */}
      {related.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Conceptos Relacionados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {related.map((r) => {
                const relatedId =
                  r.sourceId === nodeId ? r.targetId : r.sourceId;
                const relatedUnit = getUnitById(relatedId);
                return (
                  <Link key={relatedId} href={`/study/${relatedId}`}>
                    <Badge variant="secondary" className="hover:bg-gray-200 cursor-pointer">
                      {relatedUnit?.title ?? relatedId}
                    </Badge>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Link href={`/practice/${nodeId}`} className="flex-1">
          <Button className="w-full" size="lg">
            Practicar
          </Button>
        </Link>
        <Link href="/map" className="flex-1">
          <Button className="w-full" size="lg" variant="outline">
            Volver al Mapa
          </Button>
        </Link>
      </div>
    </div>
  );
}
