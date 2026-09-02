import { fundamentalsUnits } from "./fundamentals";
import { conventionsUnits } from "./conventions";
import { typingUnits } from "./typing";
import { primitivesUnits } from "./primitives";
import { operatorsUnits } from "./operators";
import { logicUnits } from "./logic";
import type { KnowledgeUnit } from "@/types/knowledge";

export const allKnowledgeUnits: KnowledgeUnit[] = [
  ...fundamentalsUnits,
  ...conventionsUnits,
  ...typingUnits,
  ...primitivesUnits,
  ...operatorsUnits,
  ...logicUnits,
];
