import { z } from "zod";

export const AssignEnclosureSchema = z.object({
  id: z.coerce.number(),
  compoundId: z.coerce.number(),
});

export type AssignEnclosureType = z.infer<typeof AssignEnclosureSchema>;
