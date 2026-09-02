"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { Exercise } from "@/types/exercise";

interface CodeCompletionProps {
  exercise: Exercise;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

export function CodeCompletion({ exercise, onAnswer, disabled }: CodeCompletionProps) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    if (answer.trim()) {
      onAnswer(answer.trim());
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{exercise.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {exercise.codeSnippet && (
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{exercise.codeSnippet}</pre>
          </div>
        )}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Tu respuesta:
          </label>
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Escribe el código..."
            disabled={disabled}
            className="font-mono"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
        </div>
        {exercise.hints && exercise.hints.length > 0 && (
          <details className="text-sm text-gray-500">
            <summary className="cursor-pointer hover:text-gray-700">
              Ver pista
            </summary>
            <p className="mt-1 pl-4">{exercise.hints[0]}</p>
          </details>
        )}
        <Button
          onClick={handleSubmit}
          disabled={!answer.trim() || disabled}
          className="w-full"
        >
          Responder
        </Button>
      </CardContent>
    </Card>
  );
}
