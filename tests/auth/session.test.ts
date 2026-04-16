import { describe, expect, it } from "vitest";

import { createSessionToken, verifySessionToken } from "@/lib/auth/session";

describe("session token helpers", () => {
  it("round-trips a valid session payload", async () => {
    const token = await createSessionToken({
      userId: "user_123",
      email: "owner@example.com",
    });

    await expect(verifySessionToken(token)).resolves.toEqual({
      userId: "user_123",
      email: "owner@example.com",
    });
  });

  it("rejects malformed tokens", async () => {
    await expect(verifySessionToken("not-a-token")).resolves.toBeNull();
  });
});
