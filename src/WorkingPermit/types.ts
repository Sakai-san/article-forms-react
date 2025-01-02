import { z } from "zod";

export const getSchema = () =>
  z.object({
    hasValidWorkPermit: z.preprocess((value) => value === "yes", z.boolean()),
  });

export type ValidationSchema = z.infer<ReturnType<typeof getSchema>>;
