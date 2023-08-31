import * as z from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(4, { message: "The name must be at least 4 characters." }),
  status: z
    .string()
    .max(64, { message: "The status can be maximum 64 characters long." }),
});
