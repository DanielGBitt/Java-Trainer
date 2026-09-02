export type NodeStatus = "locked" | "available" | "in_progress" | "completed";

export interface GameNode {
  id: string;
  knowledgeUnitIds: string[];
  title: string;
  icon: string;
  position: { x: number; y: number };
  connections: string[];
  status: NodeStatus;
}

export interface PlayerProgress {
  unlockedNodes: string[];
  currentNode: string | null;
  xp: number;
  level: number;
  completedNodes: string[];
}
