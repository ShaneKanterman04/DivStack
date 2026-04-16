const env = process.env as Record<string, string | undefined>;

env.NODE_ENV = env.NODE_ENV ?? "test";
env.DATABASE_URL =
  env.DATABASE_URL ?? "postgresql://test:test@localhost:5432/divstack_test";
env.REDIS_URL = env.REDIS_URL ?? "redis://localhost:6379";
env.SESSION_SECRET =
  env.SESSION_SECRET ?? "test-session-secret-with-sufficient-length";
env.OWNER_EMAIL = env.OWNER_EMAIL ?? "owner@example.com";
env.OWNER_PASSWORD = env.OWNER_PASSWORD ?? "correct-horse-battery";
