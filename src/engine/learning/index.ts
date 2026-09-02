import { getAllUnits, getPrerequisites } from "./knowledge";
import { getAllMastery } from "../mastery/index";
import { storage } from "@/storage";
import type { KnowledgeUnit } from "@/types/knowledge";

export function getAvailableUnits(): KnowledgeUnit[] {
  const all = getAllUnits();
  const mastery = getAllMastery();
  const progress = storage.getProgress();
  const unlockedNodes = progress?.gameProgress.unlockedNodes ?? [];

  return all.filter((unit) => {
    // If already unlocked, always available
    if (unlockedNodes.some((n) => n.includes(unit.id))) return true;

    // Check prerequisites
    const prereqs = getPrerequisites(unit.id);
    if (prereqs.length === 0) return true;

    return prereqs.every((prereqId) => {
      const m = mastery[prereqId];
      return m && m.overallLevel >= 60;
    });
  });
}

export function getUnitsNeedingReview(): KnowledgeUnit[] {
  const now = Date.now();
  const mastery = getAllMastery();
  const all = getAllUnits();

  return all.filter((unit) => {
    const m = mastery[unit.id];
    if (!m) return false;
    return m.nextReviewAt && m.nextReviewAt <= now;
  });
}

export function getWeakUnits(): KnowledgeUnit[] {
  const mastery = getAllMastery();
  const all = getAllUnits();

  return all.filter((unit) => {
    const m = mastery[unit.id];
    if (!m) return false;
    return m.overallLevel < 40 && m.totalAttempts > 0;
  });
}

export function getProgressStats() {
  const all = getAllUnits();
  const mastery = getAllMastery();
  const progress = storage.getProgress();
  const attempts = progress?.attempts ?? [];

  const totalUnits = all.length;
  const masteredUnits = Object.values(mastery).filter(
    (m) => m.overallLevel >= 80
  ).length;
  const totalAttempts = attempts.length;
  const correctAttempts = attempts.filter((a) => a.correct).length;

  return {
    totalUnits,
    masteredUnits,
    totalAttempts,
    correctAttempts,
    accuracy: totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0,
    xp: progress?.gameProgress.xp ?? 0,
    level: progress?.gameProgress.level ?? 1,
  };
}
