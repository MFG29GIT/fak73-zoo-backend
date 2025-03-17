import { z } from "zod";

// Donation Schema
// id: number;
// donor: string;
// pdfUrl: string;

export const DonationSchema = z.object({
  id: z.number().optional(),
  donor: z.string().min(1).max(64),
  pdfUrl: z.string().url(),
});

export type DonationType = z.infer<typeof DonationSchema>;
