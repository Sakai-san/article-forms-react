import { z } from "zod";

export const getSchema = () =>
  z.object({
    hasValidWorkPermit: z
      .string()

      .refine((v) => ["yes", "no"].includes(v.toLowerCase()), {
        message: "Please select an option",
      })
      .transform((v) => v === "yes"),
  });

export type ValidationSchema = z.infer<ReturnType<typeof getSchema>>;
