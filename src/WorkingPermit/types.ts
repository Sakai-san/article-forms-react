import { z } from "zod";

export const getSchema = () =>
  z.object({
    hasValidWorkPermit: z.string().refine(
      (data) => {
        console.log("data", data, typeof data);
        if (data === "yes") {
          return true;
        } else if (data === "no") {
          return true;
        } else {
          return false;
        }
      },

      {
        message: "Please select an option",
      }
    ),
  });

export type ValidationSchema = z.infer<ReturnType<typeof getSchema>>;
