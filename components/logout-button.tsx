export function LogoutButton() {
  return (
    <form action="/api/logout" method="post">
      <button
        type="submit"
        className="rounded-md border border-slate-700 px-4 py-2 font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-900"
      >
        Logout
      </button>
    </form>
  );
}
