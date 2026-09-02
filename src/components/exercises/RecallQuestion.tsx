"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { Exercise } from "@/types/exercise";

interface RecallQuestionProps {
  exercise: Exercise;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

export function RecallQuestion({ exercise, onAnswer, disabled }: RecallQuestionProps) {
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
        <Textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Escribe tu respuesta..."
          disabled={disabled}
          className="min-h-[80px]"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
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
