import * as z from "zod";

export const listSchema = z.object({
  name: z
    .string()
    .min(3, { message: "The name must be at least 3 characters" })
    .max(20, { message: "The name can be maximum 20 characters" }),
});
