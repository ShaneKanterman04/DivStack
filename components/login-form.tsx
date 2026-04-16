type LoginFormProps = {
  errorMessage: string | null;
  redirectTo?: string;
};

export function LoginForm({ errorMessage, redirectTo }: LoginFormProps) {
  return (
    <form className="mt-8 space-y-5" action="/api/login" method="post">
      <input
        type="hidden"
        name="redirectTo"
        value={redirectTo ?? "/dashboard"}
      />

      <label className="block space-y-2 text-sm text-slate-200">
        <span>Email</span>
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none ring-0 transition focus:border-emerald-400"
          type="email"
          name="email"
          autoComplete="email"
          required
        />
      </label>

      <label className="block space-y-2 text-sm text-slate-200">
        <span>Password</span>
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none ring-0 transition focus:border-emerald-400"
          type="password"
          name="password"
          autoComplete="current-password"
          required
        />
      </label>

      {errorMessage ? (
        <p className="rounded-md border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-md bg-emerald-400 px-4 py-3 font-semibold text-slate-950 hover:bg-emerald-300"
      >
        Sign in
      </button>
    </form>
  );
}
