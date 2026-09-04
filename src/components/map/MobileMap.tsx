"use client";

import type { GameNode } from "@/types/game";
import { GameNodeComponent } from "./GameNode";
import { ArrowDown } from "lucide-react";

interface MobileMapProps {
  nodes: GameNode[];
  onNodeClick: (nodeId: string) => void;
}

export function MobileMap({ nodes, onNodeClick }: MobileMapProps) {
  return (
    <div className="flex flex-col items-center gap-1 py-4">
      {nodes.map((node, index) => (
        <div key={node.id} className="flex flex-col items-center w-full">
          <div className="w-full max-w-[280px]">
            <GameNodeComponent node={node} onClick={onNodeClick} />
          </div>
          {index < nodes.length - 1 && (
            <ArrowDown className="my-1 text-muted-foreground/50 size-5" />
          )}
        </div>
      ))}
    </div>
  );
}
