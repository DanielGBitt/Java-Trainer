import type { GameNode, NodeStatus } from "@/types/game";
import type { Mastery } from "@/types/mastery";
import type { Relationship } from "@/types/knowledge";

export function checkNodeStatus(
  node: GameNode,
  completedNodes: string[],
  masteryMap: Record<string, Mastery>,
  allRelationships: Relationship[]
): NodeStatus {
  // If already completed
  if (completedNodes.includes(node.id)) {
    return "completed";
  }

  // Find prerequisite relationships that target this node's knowledge units
  const incomingConnections = allRelationships.filter((r) => {
    return node.knowledgeUnitIds.includes(r.targetId);
  });

  if (incomingConnections.length === 0) {
    return "available";
  }

  // Check if prerequisites are met
  const prereqUnitIds = incomingConnections
    .filter((r) => r.type === "prerequisite")
    .map((r) => r.sourceId);

  if (prereqUnitIds.length === 0) {
    return "available";
  }

  // Check mastery of prerequisite units
  const metPrereqs = prereqUnitIds.filter((unitId) => {
    const m = masteryMap[unitId];
    return m && m.overallLevel >= 60;
  });

  const ratio = metPrereqs.length / prereqUnitIds.length;

  if (ratio >= 1) {
    return "available";
  } else if (ratio >= 0.5) {
    return "available"; // Partially unlocked with warning
  }

  return "locked";
}

export function initializeGameNodes(
  nodes: GameNode[],
  completedNodes: string[],
  masteryMap: Record<string, Mastery>,
  allRelationships: Relationship[]
): GameNode[] {
  return nodes.map((node) => ({
    ...node,
    status: checkNodeStatus(node, completedNodes, masteryMap, allRelationships),
  }));
}
