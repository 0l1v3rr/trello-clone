import * as z from "zod";

export const cardSchema = z.object({
  title: z
    .string()
    .min(1, { message: "The title must be at least 1 characters" })
    .max(256, { message: "The title can be maximum 256 characters" }),
});
