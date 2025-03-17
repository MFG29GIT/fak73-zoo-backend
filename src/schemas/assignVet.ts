import { z } from "zod";

export const AssignVetSchema = z.object({
  id: z.coerce.number(),
  personalId: z.coerce.number(),
});

export type AssignVetType = z.infer<typeof AssignVetSchema>;
