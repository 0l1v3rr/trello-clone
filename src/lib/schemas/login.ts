import * as z from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
