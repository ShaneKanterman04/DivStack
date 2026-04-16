import { requireOwner } from "@/lib/auth/server";
import { prisma } from "@/lib/db";

export default async function DashboardPage() {
  const session = await requireOwner();
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { email: true, createdAt: true },
  });

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <span className="inline-flex rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-sm font-medium text-violet-200">
          Protected owner route
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Owner workspace
        </h1>
        <p className="max-w-2xl text-slate-300">
          Milestone 0 confirms session auth, route protection, and
          database-backed owner identity.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">Signed in as</p>
          <p className="mt-3 text-xl font-semibold text-white">
            {user?.email ?? session.email}
          </p>
        </article>
        <article className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">Route visibility</p>
          <p className="mt-3 text-xl font-semibold text-white">Protected</p>
        </article>
        <article className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">Database status</p>
          <p className="mt-3 text-xl font-semibold text-white">
            Owner created{" "}
            {user
              ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
                  user.createdAt,
                )
              : "pending"}
          </p>
        </article>
      </div>
    </section>
  );
}
