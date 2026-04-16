import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/db", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

import bcrypt from "bcryptjs";

import { ensureOwnerUser, verifyOwnerCredentials } from "@/lib/auth/owner";
import { prisma } from "@/lib/db";

const mockedUserDelegate = prisma.user as unknown as {
  findUnique: ReturnType<typeof vi.fn>;
  create: ReturnType<typeof vi.fn>;
};

describe("owner bootstrap and verification", () => {
  it("creates the owner if the configured account does not exist", async () => {
    mockedUserDelegate.findUnique.mockResolvedValueOnce(null);
    mockedUserDelegate.create.mockImplementationOnce(
      async ({ data }: { data: Record<string, unknown> }) => ({
        id: "owner_1",
        createdAt: new Date(),
        updatedAt: new Date(),
        isDemo: false,
        ...data,
      }),
    );

    const user = await ensureOwnerUser();

    expect(user.email).toBe("owner@example.com");
    expect(user.isDemo).toBe(false);
    expect(
      await bcrypt.compare("correct-horse-battery", user.passwordHash),
    ).toBe(true);
  });

  it("accepts valid credentials for the owner", async () => {
    const passwordHash = await bcrypt.hash("correct-horse-battery", 12);
    mockedUserDelegate.findUnique.mockResolvedValueOnce({
      id: "owner_1",
      email: "owner@example.com",
      passwordHash,
      isDemo: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(
      verifyOwnerCredentials("owner@example.com", "correct-horse-battery"),
    ).resolves.toMatchObject({
      email: "owner@example.com",
    });
  });

  it("rejects invalid credentials", async () => {
    const passwordHash = await bcrypt.hash("correct-horse-battery", 12);
    mockedUserDelegate.findUnique.mockResolvedValueOnce({
      id: "owner_1",
      email: "owner@example.com",
      passwordHash,
      isDemo: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(
      verifyOwnerCredentials("owner@example.com", "wrong-password"),
    ).resolves.toBeNull();
  });
});
