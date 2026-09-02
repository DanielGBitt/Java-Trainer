"use client";

import { Badge } from "@/components/ui/badge";
import { KNOWLEDGE_TYPE_LABELS, KNOWLEDGE_TYPE_META } from "@/lib/constants";
import type { KnowledgeItem } from "@/types/knowledge";
import {
  BookOpen,
  Ruler,
  Code2,
  ArrowLeftRight,
  Info,
  Terminal,
  ListOrdered,
  FlaskConical,
  AlertTriangle,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Ruler,
  Code2,
  ArrowLeftRight,
  Info,
  Terminal,
  ListOrdered,
  FlaskConical,
  AlertTriangle,
};

export function KnowledgeItemView({ item }: { item: KnowledgeItem }) {
  const meta = KNOWLEDGE_TYPE_META[item.type] ?? {
    accent: "border-l-border",
    bg: "bg-muted/30",
    icon: "Info",
  };
  const label = KNOWLEDGE_TYPE_LABELS[item.type] ?? item.type;
  const Icon = ICON_MAP[meta.icon] ?? Info;
  const isMono = item.type === "example" || item.type === "syntax";
  const isComparison = item.type === "comparison";

  return (
    <div className={`border-l-[3px] ${meta.accent} ${meta.bg} rounded-r-lg pl-4 pr-3 py-3`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="size-3.5 text-muted-foreground shrink-0" aria-hidden />
        <Badge variant="outline" className="text-[11px] tracking-[0.06em] uppercase font-medium">
          {label}
        </Badge>
      </div>

      {isComparison && item.content.includes("\n") ? (
        <div className="grid gap-2">
          {item.content.split("\n").map((line, idx) => (
            <p
              key={idx}
              className="text-sm leading-relaxed text-foreground whitespace-pre-wrap rounded-md bg-background/40 border border-border/50 px-3 py-2"
            >
              {line}
            </p>
          ))}
        </div>
      ) : (
        <p
          className={
            isMono
              ? "font-mono text-[13px] leading-7 text-foreground whitespace-pre-wrap break-words"
              : "text-sm leading-relaxed text-foreground whitespace-pre-wrap"
          }
        >
          {item.content}
        </p>
      )}

      {item.context && (
        <p className="text-xs text-muted-foreground mt-2 italic">{item.context}</p>
      )}

      {item.correctedContent && (
        <div className="mt-3 p-3 bg-amber-950/50 border border-amber-800 rounded-lg">
          <p className="text-xs font-medium text-amber-300 mb-1">Corrección:</p>
          <p className="text-sm text-amber-100">{item.correctedContent}</p>
          {item.correctionExplanation && (
            <p className="text-xs text-amber-300/80 mt-1">{item.correctionExplanation}</p>
          )}
        </div>
      )}
    </div>
  );
}
