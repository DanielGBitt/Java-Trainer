"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Exercise } from "@/types/exercise";

interface MultipleChoiceProps {
  exercise: Exercise;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

export function MultipleChoice({ exercise, onAnswer, disabled }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selected) {
      onAnswer(selected);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{exercise.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {exercise.options?.map((option) => (
          <button
            key={option}
            onClick={() => !disabled && setSelected(option)}
            disabled={disabled}
            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
              selected === option
                ? "border-primary bg-primary/20 text-foreground"
                : "border-border hover:border-ring bg-card text-foreground"
            } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {option}
          </button>
        ))}
        <Button
          onClick={handleSubmit}
          disabled={!selected || disabled}
          className="w-full mt-4"
        >
          Responder
        </Button>
      </CardContent>
    </Card>
  );
}
