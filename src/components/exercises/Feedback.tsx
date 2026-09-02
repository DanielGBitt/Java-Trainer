"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FeedbackProps {
  correct: boolean;
  feedback: string;
  correctAnswer?: string;
}

export function Feedback({ correct, feedback, correctAnswer }: FeedbackProps) {
  return (
    <Card
      className={`border-2 ${
        correct ? "border-green-800 bg-green-950/60" : "border-red-800 bg-red-950/60"
      }`}
    >
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">{correct ? "✅" : "❌"}</span>
          <div className="flex-1">
            <Badge variant={correct ? "default" : "destructive"} className="mb-2">
              {correct ? "Correcto" : "Incorrecto"}
            </Badge>
            <p className="text-sm text-foreground">{feedback}</p>
            {!correct && correctAnswer && (
              <p className="text-sm font-medium text-foreground mt-2">
                Respuesta correcta: {correctAnswer}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
