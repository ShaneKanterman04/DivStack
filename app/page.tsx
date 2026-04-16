import Link from "next/link";

export default function HomePage() {
  return (
    <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <div className="space-y-6">
        <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-200">
          Milestone 0 foundation
        </span>
        <div className="space-y-4">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Dividend analytics with a public demo and a protected owner
            workspace.
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            This foundation build establishes the app shell, owner login,
            protected routes, and the infrastructure needed for later portfolio
            and sync milestones.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/demo"
            className="rounded-md bg-emerald-400 px-5 py-3 font-medium text-slate-950 hover:bg-emerald-300"
          >
            Open public demo
          </Link>
          <Link
            href="/login"
            className="rounded-md border border-slate-700 px-5 py-3 font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-900"
          >
            Owner login
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/40">
        <h2 className="text-lg font-semibold text-white">
          Milestone 0 deliverables
        </h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-300">
          <li>Next.js App Router scaffold with TypeScript and Tailwind.</li>
          <li>Prisma wired to Postgres with an owner bootstrap path.</li>
          <li>Session auth, route protection, and a public `/demo` surface.</li>
          <li>Docker Compose for `web`, `db`, and `redis`.</li>
          <li>CI for install, lint, typecheck, and tests.</li>
        </ul>
      </div>
    </section>
  );
}
