import type { Route } from "next";
import Link from "next/link";

import { LogoutButton } from "@/components/logout-button";
import { getCurrentSession } from "@/lib/auth/server";

const navLinks = [
  { href: "/" as Route, label: "Home" },
  { href: "/demo" as Route, label: "Demo" },
  { href: "/dashboard" as Route, label: "Dashboard" },
];

export async function AppShell({ children }: { children: React.ReactNode }) {
  const session = await getCurrentSession();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_30%),linear-gradient(180deg,_#020617,_#020617)]">
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <div>
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-white"
            >
              DivStack
            </Link>
            <p className="text-sm text-slate-400">Milestone 0 foundation</p>
          </div>

          <nav className="flex items-center gap-2 sm:gap-4">
            {navLinks.map((link) => {
              const isProtected = link.href === "/dashboard";

              if (isProtected && !session) {
                return null;
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-900 hover:text-white"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 text-sm">
            {session ? (
              <>
                <span className="hidden text-slate-400 sm:inline">
                  {session.email}
                </span>
                <LogoutButton />
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-md border border-slate-700 px-4 py-2 font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-900"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
