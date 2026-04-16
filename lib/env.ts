import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  SESSION_SECRET: z.string().min(32),
  OWNER_EMAIL: z.string().email(),
  OWNER_PASSWORD: z.string().min(12),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

let cachedEnv: z.infer<typeof serverEnvSchema> | null = null;

export function getEnv() {
  if (cachedEnv) {
    return cachedEnv;
  }

  cachedEnv = serverEnvSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,
    OWNER_EMAIL: process.env.OWNER_EMAIL,
    OWNER_PASSWORD: process.env.OWNER_PASSWORD,
    NODE_ENV: process.env.NODE_ENV,
  });

  return cachedEnv;
}
