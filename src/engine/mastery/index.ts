import type { Mastery } from "@/types/mastery";
import { storage } from "@/storage";

export function getMastery(unitId: string): Mastery | null {
  const progress = storage.getProgress();
  if (!progress) return null;
  return progress.mastery[unitId] ?? null;
}

export function getAllMastery(): Record<string, Mastery> {
  const progress = storage.getProgress();
  if (!progress) return {};
  return progress.mastery;
}

export function saveMastery(unitId: string, mastery: Mastery): void {
  const progress = storage.getProgress();
  if (!progress) return;
  storage.updateProgress({
    mastery: { ...progress.mastery, [unitId]: mastery },
  });
}

export function getDueUnits(now: Date = new Date()): string[] {
  const all = getAllMastery();
  const due: string[] = [];
  for (const [unitId, mastery] of Object.entries(all)) {
    if (mastery.nextReviewAt && mastery.nextReviewAt <= now.getTime()) {
      due.push(unitId);
    }
  }
  return due;
}
