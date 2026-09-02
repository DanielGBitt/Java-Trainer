"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MasteryBar } from "@/components/progress/MasteryBar";
import { getNodeById, getUnitsForNode } from "@/game/map/builder";
import { getUnitById } from "@/engine/learning/knowledge";
import { getAggregateMastery } from "@/engine/mastery/aggregate";
import { CATEGORY_LABELS, KNOWLEDGE_TYPE_LABELS } from "@/lib/constants";
import { relationships } from "@/data/java/relationships";
import { buildGameMap } from "@/game/map/builder";

export default function StudyPage() {
  const params = useParams();
  const nodeId = params.nodeId as string;

  const node = useMemo(() => getNodeById(nodeId), [nodeId]);
  const units = useMemo(() => getUnitsForNode(nodeId), [nodeId]);
  const unitIds = useMemo(() => units.map((u) => u.id), [units]);
  const mastery = useMemo(() => getAggregateMastery(unitIds), [unitIds]);

  const related = useMemo(() => {
    const allRelated = relationships.filter(
      (r) => unitIds.includes(r.sourceId) || unitIds.includes(r.targetId)
    );
    const seen = new Set<string>();
    return allRelated.filter((r) => {
      const key = [r.sourceId, r.targetId].sort().join("-");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [unitIds]);

  if (!node || units.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-4 sm:p-6 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Nodo no encontrado
        </h1>
        <Link href="/map">
          <Button>Volver al Mapa</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      <div>
        <Link
          href="/map"
          className="text-sm text-primary hover:text-primary/80 mb-2 inline-block"
        >
          ← Volver al Mapa
        </Link>
        <h1 className="text-3xl font-bold text-foreground">{node.title}</h1>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="secondary">
            {CATEGORY_LABELS[units[0].category] ?? units[0].category}
          </Badge>
        </div>
      </div>

      {mastery && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tu Progreso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
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
              <span className="text-2xl font-bold text-foreground">
                {mastery.overallLevel}%
              </span>
              <span className="text-sm text-muted-foreground ml-2">general</span>
            </div>
          </CardContent>
        </Card>
      )}

      {units.map((unit) => (
        <Card key={unit.id}>
          <CardHeader>
            <CardTitle className="text-lg">{unit.title}</CardTitle>
            <Badge variant="outline">
              Dificultad: {unit.difficulty}/3
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {unit.knowledge.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-lg bg-muted/50 border border-border"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {KNOWLEDGE_TYPE_LABELS[item.type] ?? item.type}
                  </Badge>
                </div>
                <p className="text-sm text-foreground whitespace-pre-wrap">
                  {item.content}
                </p>
                {item.context && (
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    {item.context}
                  </p>
                )}
                {item.correctedContent && (
                  <div className="mt-3 p-3 bg-amber-950/50 border border-amber-800 rounded">
                    <p className="text-xs font-medium text-amber-300 mb-1">
                      Corrección:
                    </p>
                    <p className="text-sm text-amber-100">
                      {item.correctedContent}
                    </p>
                    {item.correctionExplanation && (
                      <p className="text-xs text-amber-300/80 mt-1">
                        {item.correctionExplanation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {related.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Conceptos Relacionados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {(() => {
                const nodeDeduped = new Map<string, { badgeLabel: string; href: string }>();
                related.forEach((r) => {
                  const relatedUnitId = unitIds.includes(r.sourceId) ? r.targetId : r.sourceId;
                  const relatedUnit = getUnitById(relatedUnitId);
                  const allNodes = buildGameMap();
                  const targetNode = allNodes.find((n) =>
                    n.knowledgeUnitIds.includes(relatedUnitId)
                  );
                  const href = targetNode ? `/study/${targetNode.id}` : "#";
                  const key = targetNode ? targetNode.id : relatedUnitId;
                  if (!nodeDeduped.has(key)) {
                    nodeDeduped.set(key, { badgeLabel: relatedUnit?.title ?? relatedUnitId, href });
                  }
                });
                return Array.from(nodeDeduped.entries()).map(([key, { badgeLabel, href }]) => (
                  <Link key={key} href={href}>
                    <Badge variant="secondary" className="hover:bg-muted cursor-pointer">
                      {badgeLabel}
                    </Badge>
                  </Link>
                ));
              })()}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
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
