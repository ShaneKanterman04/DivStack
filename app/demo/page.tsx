const demoMetrics = [
  { label: "Annual dividend income", value: "$18,420" },
  { label: "Yield on cost", value: "5.84%" },
  { label: "Positions", value: "18" },
  { label: "Last payout", value: "$1,236" },
];

export default function DemoPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-sm font-medium text-sky-200">
          Public read-only demo
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Demo portfolio surface
        </h1>
        <p className="max-w-2xl text-slate-300">
          Milestone 0 keeps `/demo` public while the private owner surface stays
          protected. The seeded portfolio data lands in Milestone 1.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {demoMetrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-xl border border-slate-800 bg-slate-900/70 p-5"
          >
            <p className="text-sm text-slate-400">{metric.label}</p>
            <p className="mt-3 text-2xl font-semibold text-white">
              {metric.value}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
