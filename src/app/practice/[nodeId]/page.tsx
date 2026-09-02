"use client";

import { useMemo, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MultipleChoice } from "@/components/exercises/MultipleChoice";
import { RecallQuestion } from "@/components/exercises/RecallQuestion";
import { CodeCompletion } from "@/components/exercises/CodeCompletion";
import { Feedback } from "@/components/exercises/Feedback";
import { MasteryBar } from "@/components/progress/MasteryBar";
import { selectNextExercise } from "@/engine/adaptive/selector";
import { submitAnswer } from "@/engine/evaluation/index";
import { getNodeById, getUnitsForNode } from "@/game/map/builder";
import { getAggregateMastery } from "@/engine/mastery/aggregate";
import type { Exercise } from "@/types/exercise";
import type { Attempt } from "@/types/attempt";

export default function PracticePage() {
  const params = useParams();
  const nodeId = params.nodeId as string;

  const node = useMemo(() => getNodeById(nodeId), [nodeId]);
  const units = useMemo(() => getUnitsForNode(nodeId), [nodeId]);
  const unitIds = useMemo(() => units.map((u) => u.id), [units]);
  const mastery = useMemo(() => getAggregateMastery(unitIds), [unitIds]);

  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(
    () => selectNextExercise({ unitIds })
  );
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    message: string;
    correctAnswer?: string;
  } | null>(null);
  const [attemptHistory, setAttemptHistory] = useState<Attempt[]>([]);
  const startTimeRef = useRef<number | null>(null);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    total: 0,
  });

  const handleAnswer = useCallback(
    (answer: string) => {
      if (!currentExercise) return;

      if (startTimeRef.current === null) {
        startTimeRef.current = Date.now();
      }

      const result = submitAnswer(
        currentExercise,
        answer,
        startTimeRef.current,
        attemptHistory
      );

      setFeedback({
        correct: result.correct,
        message: result.feedback,
        correctAnswer: result.correct
          ? undefined
          : currentExercise.correctAnswer,
      });

      setAttemptHistory((prev) => [...prev, result.attempt]);
      setSessionStats((prev) => ({
        correct: prev.correct + (result.correct ? 1 : 0),
        total: prev.total + 1,
      }));
    },
    [currentExercise, attemptHistory]
  );

  const handleNextExercise = useCallback(() => {
    const exercise = selectNextExercise({ unitIds });
    setCurrentExercise(exercise);
    setFeedback(null);
    startTimeRef.current = Date.now();
  }, [unitIds]);

  if (!node || units.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Nodo no encontrado
        </h1>
        <Link href="/map">
          <Button>Volver al Mapa</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href={`/study/${nodeId}`}
            className="text-sm text-blue-600 hover:text-blue-800 mb-1 inline-block"
          >
            ← Volver a {node.title}
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Practicar: {node.title}
          </h1>
        </div>
        <div className="text-right text-sm text-gray-500">
          <p>
            {sessionStats.correct}/{sessionStats.total} correctas
          </p>
          {sessionStats.total > 0 && (
            <p>
              {Math.round(
                (sessionStats.correct / sessionStats.total) * 100
              )}
              % precisión
            </p>
          )}
        </div>
      </div>

      {mastery && (
        <Card>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(
                Object.entries(mastery.dimensions) as [
                  string,
                  { level: number }
                ][]
              ).map(([dim, d]) => (
                <MasteryBar
                  key={dim}
                  dimension={dim as "understanding" | "recall" | "syntax" | "application"}
                  level={d.level}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {currentExercise ? (
        <div className="space-y-4">
          {!feedback ? (
            <>
              {currentExercise.type === "multiple_choice" && (
                <MultipleChoice
                  exercise={currentExercise}
                  onAnswer={handleAnswer}
                />
              )}
              {currentExercise.type === "recall" && (
                <RecallQuestion
                  exercise={currentExercise}
                  onAnswer={handleAnswer}
                />
              )}
              {currentExercise.type === "code_completion" && (
                <CodeCompletion
                  exercise={currentExercise}
                  onAnswer={handleAnswer}
                />
              )}
            </>
          ) : (
            <>
              <Feedback
                correct={feedback.correct}
                feedback={feedback.message}
                correctAnswer={feedback.correctAnswer}
              />
              <div className="flex gap-4">
                <Button
                  onClick={handleNextExercise}
                  className="flex-1"
                  size="lg"
                >
                  Siguiente Ejercicio
                </Button>
                <Link href="/map" className="flex-1">
                  <Button
                    className="w-full"
                    size="lg"
                    variant="outline"
                  >
                    Volver al Mapa
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-gray-500 mb-4">
              No hay ejercicios disponibles para esta unidad.
            </p>
            <Link href="/map">
              <Button>Volver al Mapa</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
