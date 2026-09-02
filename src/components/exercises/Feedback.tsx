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
            <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">{feedback}</p>
            {!correct &&
              correctAnswer &&
              !feedback.includes(correctAnswer) && (
                <p className="mt-2 inline-block rounded border border-border bg-background/60 px-2 py-1 font-mono text-[13px] text-foreground">
                  {correctAnswer}
                </p>
              )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
