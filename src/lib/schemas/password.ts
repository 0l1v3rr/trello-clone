import * as z from "zod";

export const passwordType = z
  .string()
  .min(8, {
    message: "The password must be at least 8 characters long",
  })
  .max(100)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
    message:
      "The password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
  });

export const changePasswordSchema = z
  .object({
    oldPassword: z.string(),
    password: passwordType,
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "The passwords must match",
    path: ["passwordConfirmation"],
  });
