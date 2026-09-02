import { exercises } from "@/data/java/exercises";
import { getAllMastery } from "../mastery/index";
import { storage } from "@/storage";
import type { Exercise, MasteryDimension } from "@/types/exercise";

export interface SelectionContext {
  unitId?: string;
  preferredDimension?: MasteryDimension;
}

export function selectNextExercise(
  context: SelectionContext = {}
): Exercise | null {
  const mastery = getAllMastery();
  const progress = storage.getProgress();
  const attempts = progress?.attempts ?? [];

  let candidates = [...exercises];

  // Filter by unit if specified
  if (context.unitId) {
    candidates = candidates.filter((e) => e.knowledgeUnitId === context.unitId);
  }

  if (candidates.length === 0) return null;

  // Score each exercise
  const scored = candidates.map((exercise) => {
    let score = 0;
    const unitMastery = mastery[exercise.knowledgeUnitId];

    // Priority 1: Weak dimensions
    if (unitMastery) {
      const dimMastery = unitMastery.dimensions[exercise.dimension];
      if (dimMastery && dimMastery.level < 40) {
        score += 30;
      } else if (dimMastery && dimMastery.level < 60) {
        score += 15;
      }
    } else {
      // No mastery data = new unit, high priority
      score += 25;
    }

    // Priority 2: Dimension preference
    if (context.preferredDimension === exercise.dimension) {
      score += 10;
    }

    // Priority 3: Avoid recently attempted exercises
    const recentAttempt = attempts.find(
      (a) => a.exerciseId === exercise.id
    );
    if (recentAttempt) {
      const hoursSince = (Date.now() - recentAttempt.timestamp) / (1000 * 60 * 60);
      if (hoursSince < 1) {
        score -= 20;
      } else if (hoursSince < 24) {
        score -= 5;
      }
    }

    // Priority 4: Variety - prefer different types
    const lastAttempt = attempts[attempts.length - 1];
    if (lastAttempt) {
      const lastExercise = exercises.find((e) => e.id === lastAttempt.exerciseId);
      if (lastExercise && lastExercise.type === exercise.type) {
        score -= 5;
      }
    }

    // Priority 5: Difficulty matching
    if (unitMastery) {
      const level = unitMastery.overallLevel;
      if (level < 30 && exercise.difficulty === 1) score += 5;
      else if (level >= 30 && level < 70 && exercise.difficulty === 2) score += 5;
      else if (level >= 70 && exercise.difficulty === 3) score += 5;
    }

    return { exercise, score };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Return top exercise with some randomness
  const topScore = scored[0].score;
  const topExercises = scored.filter((s) => s.score >= topScore - 5);

  return topExercises[Math.floor(Math.random() * topExercises.length)].exercise;
}

export function selectReviewExercise(): Exercise | null {
  const mastery = getAllMastery();
  const now = Date.now();

  // Find units due for review
  const dueUnits = Object.entries(mastery)
    .filter(([, m]) => m.nextReviewAt && m.nextReviewAt <= now)
    .map(([unitId]) => unitId);

  if (dueUnits.length === 0) return null;

  // Pick a random due unit
  const unitId = dueUnits[Math.floor(Math.random() * dueUnits.length)];

  return selectNextExercise({ unitId });
}
