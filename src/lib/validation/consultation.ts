import { z } from "zod";

export const consultationSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  reason: z.string().trim().min(5, "Reason must be at least 5 characters"),
  scheduledAt: z.string().min(1, "Date/time is required"),
});