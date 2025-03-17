import { z } from "zod";

// name?: string;
// size?: number;
// upkeepCost?: number;
// assignedCaretakers?: number[];

export const PatchEnclosureBodySchema = z.object({
  name: z.string().min(1).max(64).optional(),
  size: z.number().min(1).optional(),
  upKeepCost: z.number().min(1).optional(),
  assignedCaretakers: z.array(z.number()).optional(),
});

export type PatchEnclosureBodyType = z.infer<typeof PatchEnclosureBodySchema>;
