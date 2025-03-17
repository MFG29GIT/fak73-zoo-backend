import { z } from "zod";

// id: number;
// name: string;
// size: number;
// cost: number;

export const EnclosureSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(64),
  size: z.number().min(1),
  cost: z.number(),
});

export type EnclosureType = z.infer<typeof EnclosureSchema>;
