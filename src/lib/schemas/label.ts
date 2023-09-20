import * as z from "zod";

export const labelSchema = z.object({
  title: z
    .string()
    .min(3, { message: "The title must be at least 3 characters" })
    .max(32, { message: "The title can be maximum 20 characters" }),
  color: z.string(),
});
