import * as z from "zod";

export type BoardBackground = z.infer<typeof boardSchema.shape.background>;

export const boardSchema = z.object({
  name: z
    .string()
    .min(3, { message: "The name must be at least 3 characters" })
    .max(64, { message: "The name can be maximum 64 characters" }),
  slug: z
    .string()
    .min(3, { message: "The slug must be at least 3 characters" })
    .max(64, { message: "The slug can be maximum 64 characters" })
    .regex(/^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/),
  public: z.boolean(),
  background: z.object({
    type: z.enum(["color", "image"]),
    value: z.string(),
  }),
});
