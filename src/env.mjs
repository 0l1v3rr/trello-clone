// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
  client: {},
  // NOTE: specifying runtimeEnv is not necessary for Next,js >= 13.4.4
  // runtimeEnv: {},
  // you only need to destructure client variables:
  experimental__runtimeEnv: {},
});
