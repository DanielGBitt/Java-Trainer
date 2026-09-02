"use client";

import { useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { WorldMap } from "@/components/map/WorldMap";
import { buildGameMap } from "@/game/map/builder";
import { initializeGameNodes } from "@/game/progression/unlocker";
import { relationships } from "@/data/java/relationships";
import { getAllMastery } from "@/engine/mastery/index";
import { storage } from "@/storage";

export default function MapPage() {
  const router = useRouter();

  const nodes = useMemo(() => {
    const baseNodes = buildGameMap();
    const mastery = getAllMastery();
    const progress = storage.getProgress();
    const completedNodes = progress?.gameProgress.completedNodes ?? [];

    return initializeGameNodes(baseNodes, completedNodes, mastery, relationships);
  }, []);

  const handleNodeClick = useCallback(
    (nodeId: string) => {
      router.push(`/study/${nodeId}`);
    },
    [router]
  );

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Java World</h1>
      <p className="text-muted-foreground text-sm sm:text-base mb-6">
        Explora los conceptos de Java. Haz clic en un nodo disponible para comenzar.
      </p>
      <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6 overscroll-contain">
        <div className="min-w-[760px]">
          <WorldMap nodes={nodes} onNodeClick={handleNodeClick} />
        </div>
      </div>
    </div>
  );
}
