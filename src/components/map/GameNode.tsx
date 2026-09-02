"use client";

import type { GameNode } from "@/types/game";
import { cn } from "@/lib/utils";

interface GameNodeProps {
  node: GameNode;
  onClick: (nodeId: string) => void;
}

const STATUS_STYLES: Record<string, string> = {
  locked: "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400",
  available: "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-400 cursor-pointer",
  in_progress: "bg-blue-100 text-blue-800 border-blue-400 cursor-pointer",
  completed: "bg-green-100 text-green-800 border-green-400 cursor-pointer",
};

export function GameNodeComponent({ node, onClick }: GameNodeProps) {
  const isLocked = node.status === "locked";

  return (
    <button
      onClick={() => !isLocked && onClick(node.id)}
      disabled={isLocked}
      className={cn(
        "relative flex flex-col items-center gap-1 rounded-xl border-2 px-4 py-3 transition-all",
        "shadow-sm hover:shadow-md",
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
