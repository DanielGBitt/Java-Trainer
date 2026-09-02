import type { Mastery } from "./mastery";
import type { Attempt } from "./attempt";
import type { PlayerProgress } from "./game";

export interface ProgressData {
  version: 1;
  mastery: Record<string, Mastery>;
  attempts: Attempt[];
  gameProgress: PlayerProgress;
  settings: {
    lastSessionAt: number;
  };
}

export interface StorageProvider {
  getProgress(): ProgressData | null;
  saveProgress(data: ProgressData): void;
  updateProgress(partial: Partial<ProgressData>): void;
  resetProgress(): void;
  exportProgress(): string;
  importProgress(json: string): void;
}
