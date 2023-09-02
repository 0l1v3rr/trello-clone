import * as z from "zod";
import { passwordType } from "@/lib/schemas/password";
import { profileSchema } from "@/lib/schemas/profile";

export const registerSchema = z
  .object({
    name: profileSchema.shape.name,
    email: z.string().email({ message: "The email is not valid" }),
    password: passwordType,
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "The passwords must match",
    path: ["passwordConfirmation"],
  });
