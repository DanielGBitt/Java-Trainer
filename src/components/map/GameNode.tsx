"use client";

import type { GameNode } from "@/types/game";
import { cn } from "@/lib/utils";

interface GameNodeProps {
  node: GameNode;
  onClick: (nodeId: string) => void;
}

const STATUS_STYLES: Record<string, string> = {
  locked: "bg-muted text-muted-foreground cursor-not-allowed border-border",
  available: "bg-amber-950 text-amber-200 hover:bg-amber-900 border-amber-800 cursor-pointer",
  in_progress: "bg-blue-950 text-blue-200 border-blue-800 cursor-pointer",
  completed: "bg-green-950 text-green-200 border-green-800 cursor-pointer",
};

export function GameNodeComponent({ node, onClick }: GameNodeProps) {
  const isLocked = node.status === "locked";

  return (
    <button
      onClick={() => !isLocked && onClick(node.id)}
      disabled={isLocked}
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center gap-1 rounded-xl border-2 px-4 py-3 transition-all",
        "shadow-sm hover:shadow-md dark:shadow-black/40",
        STATUS_STYLES[node.status]
      )}
    >
      <span className="text-2xl">{node.icon}</span>
      <span className="text-sm font-semibold text-center leading-tight">
        {node.title}
      </span>
      {node.status === "completed" && (
        <span className="absolute -top-2 -right-2 text-lg">✅</span>
      )}
      {node.status === "locked" && (
        <span className="absolute -top-2 -right-2 text-lg">🔒</span>
      )}
    </button>
  );
}
