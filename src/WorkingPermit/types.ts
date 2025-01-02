import { z } from "zod";

export const getSchema = () =>
  z.object({
    hasValidWorkPermit: z.boolean(),
  });

export type ValidationSchema = z.infer<ReturnType<typeof getSchema>>;
