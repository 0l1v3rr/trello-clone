import * as z from "zod";

export const labelSchema = z.object({
  title: z
    .string()
    .min(1, { message: "The title must be at least 1 characters" })
    .max(32, { message: "The title can be maximum 20 characters" }),
  color: z.string(),
});
