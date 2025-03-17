import { z } from "zod";

// id: number;
// foodCost: number;
// name: string;
// birthDate: Date;
// gender: Gender;
// kind: string;
// veterinarianId: number | null;
// enclosureId: number | null;

export const GenderSchema = z.enum(["maennlich", "weiblich"]);

export const AnimalSchema = z.object({
  id: z.number().optional(),
  foodCost: z.number().min(1),
  name: z.string().min(1),
  birthDate: z.date().optional(),
  gender: GenderSchema,
  kind: z.string(),
  veterinarianId: z.number().optional().nullable(),
  enclosureId: z.number().optional().nullable(),
});

export type AnimalType = z.infer<typeof AnimalSchema>;
