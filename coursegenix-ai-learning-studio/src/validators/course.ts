import { z } from "zod";

export const createChaptersSchema = z.object({
  title: z.string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be less than 100 characters")
    .trim(),
  units: z.array(z.string()
    .min(3, "Each unit must be at least 3 characters long")
    .max(100, "Each unit must be less than 100 characters")
    .trim())
    .min(1, "At least one unit is required")
    .max(10, "Maximum of 10 units allowed"),
});
