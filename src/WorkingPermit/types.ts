import { z } from "zod";

export const getSchema = () =>
  z.object({
    hasValidWorkPermit: z
      .string()
      .or(z.undefined())
      .refine((v) => ["yes", "no"].some((radio) => radio === v), {
        message: "Please select an option",
      })
      .transform((v) => v === "yes"),
  });

export type ValidationSchema = z.infer<ReturnType<typeof getSchema>>;
