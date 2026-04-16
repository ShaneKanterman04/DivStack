import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/login-form";
import { getCurrentSession } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Owner Login | DivStack",
};

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    redirectTo?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await getCurrentSession();

  if (session) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const errorMessage =
    params.error === "invalid_credentials"
      ? "Invalid owner credentials."
      : null;

  return (
    <section className="mx-auto max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Owner login
        </h1>
        <p className="text-sm text-slate-400">
          This app has no sign-up flow. Use the env-configured owner account to
          access protected routes.
        </p>
      </div>

      <LoginForm errorMessage={errorMessage} redirectTo={params.redirectTo} />

      <p className="mt-6 text-sm text-slate-400">
        Looking for the public surface?{" "}
        <Link className="text-emerald-300 hover:text-emerald-200" href="/demo">
          Open `/demo`
        </Link>
        .
      </p>
    </section>
  );
}
