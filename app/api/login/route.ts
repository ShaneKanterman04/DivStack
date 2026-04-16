import { NextResponse } from "next/server";

import { createSessionCookie } from "@/lib/auth/session";
import { verifyOwnerCredentials } from "@/lib/auth/owner";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const redirectTo = sanitizeRedirect(
    String(formData.get("redirectTo") ?? "/dashboard"),
  );

  const user = await verifyOwnerCredentials(email, password);

  if (!user) {
    return NextResponse.redirect(
      new URL(
        `/login?error=invalid_credentials&redirectTo=${encodeURIComponent(redirectTo)}`,
        request.url,
      ),
      303,
    );
  }

  const response = NextResponse.redirect(new URL(redirectTo, request.url), 303);
  const cookie = await createSessionCookie({
    userId: user.id,
    email: user.email,
  });
  response.cookies.set(cookie);
  return response;
}

function sanitizeRedirect(value: string) {
  if (!value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }

  return value;
}
