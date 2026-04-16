import bcrypt from "bcryptjs";

import { prisma } from "@/lib/db";
import { getEnv } from "@/lib/env";

export async function ensureOwnerUser() {
  const env = getEnv();
  const existingUser = await prisma.user.findUnique({
    where: { email: env.OWNER_EMAIL },
  });

  if (existingUser) {
    return existingUser;
  }

  const passwordHash = await bcrypt.hash(env.OWNER_PASSWORD, 12);

  return prisma.user.create({
    data: {
      email: env.OWNER_EMAIL,
      passwordHash,
      isDemo: false,
    },
  });
}

export async function verifyOwnerCredentials(email: string, password: string) {
  const env = getEnv();

  if (email.toLowerCase() !== env.OWNER_EMAIL.toLowerCase()) {
    return null;
  }

  const owner = await ensureOwnerUser();
  const isValid = await bcrypt.compare(password, owner.passwordHash);

  if (!isValid) {
    return null;
  }

  return owner;
}
