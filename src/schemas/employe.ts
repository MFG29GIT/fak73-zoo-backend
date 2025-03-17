import { coerce, z } from "zod";

// id: number;
// name: string;
// role: Role;
// salary: number;

export const EmployeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(64),
  role: z.enum(["Tierarzt", "Tierpfleger", "Verkäufer", "Normal"]),
  salary: z.coerce.number().positive(),
});

export type EmployeType = z.infer<typeof EmployeSchema>;
