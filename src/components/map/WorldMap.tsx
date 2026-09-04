"use client";

import { useMemo, useState, useEffect } from "react";
import type { GameNode } from "@/types/game";
import { GameNodeComponent } from "./GameNode";
import { ConnectionLine } from "./ConnectionLine";
import { MobileMap } from "./MobileMap";

interface WorldMapProps {
  nodes: GameNode[];
  onNodeClick: (nodeId: string) => void;
}

export function WorldMap({ nodes, onNodeClick }: WorldMapProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const nodeMap = useMemo(() => {
    const map = new Map<string, GameNode>();
    nodes.forEach((n) => map.set(n.id, n));
    return map;
  }, [nodes]);

  const connections = useMemo(() => {
    const conns: { from: GameNode; to: GameNode }[] = [];
    const seen = new Set<string>();

    nodes.forEach((node) => {
      node.connections.forEach((connId) => {
        const key = [node.id, connId].sort().join("-");
        if (seen.has(key)) return;
        seen.add(key);
        const target = nodeMap.get(connId);
        if (target) {
          conns.push({ from: node, to: target });
        }
      });
    });

    return conns;
  }, [nodes, nodeMap]);

  if (isMobile) {
    return <MobileMap nodes={nodes} onNodeClick={onNodeClick} />;
  }

  return (
    <div className="relative w-full overflow-auto">
      <svg
        viewBox="0 0 800 580"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connection lines */}
        {connections.map(({ from, to }) => (
          <ConnectionLine
            key={`${from.id}-${to.id}`}
            x1={from.position.x}
            y1={from.position.y + 20}
            x2={to.position.x}
            y2={to.position.y - 20}
            active={
              from.status === "completed" && to.status !== "locked"
            }
          />
        ))}

        {/* Nodes */}
        {nodes.map((node) => (
          <foreignObject
            key={node.id}
            x={node.position.x - 75}
            y={node.position.y - 45}
            width={150}
            height={90}
          >
            <GameNodeComponent node={node} onClick={onNodeClick} />
          </foreignObject>
        ))}
      </svg>
    </div>
  );
}
