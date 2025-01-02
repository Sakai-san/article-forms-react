import { z } from "zod";

const MAX_FILE_SIZE = 5e9; // 5GB

/*
 * Represents an attachment in the
 * id: if defined, the attachment already exists on the BE
 * file: if defined, the file will need to be uploaded to the attachment
 */

export const getSchema = () =>
  z.object({
    attachments: z.array(
      z.object({
        title: z.string(),
        id: z.string().optional(),
        file: z
          .instanceof(File)
          .optional()
          .superRefine((file, ctx) => {
            if (file && file.size > MAX_FILE_SIZE) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "File size exceeds the 5 GB limit. Please upload a smaller file.",
              });
            }
          }),
      })
    ),
  });

export type ValidationSchema = z.infer<ReturnType<typeof getSchema>>;
