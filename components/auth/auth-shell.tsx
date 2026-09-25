import type { ReactNode } from "react";
import { Logo } from "@/components/brand/logo";

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="relative flex min-h-svh flex-1 flex-col bg-[#f9f9f9]">
      <div aria-hidden className="page-glow pointer-events-none absolute inset-0 opacity-70" />

      <header className="relative z-10 flex items-center px-6 py-5 sm:px-10">
        <Logo />
      </header>

      <main className="relative z-10 flex flex-1 items-start justify-center px-6 pb-16 pt-6 sm:items-center sm:pt-0">
        <div className="w-full max-w-[420px] rounded-xl border border-[#e5e5e5] bg-white p-7 shadow-sm sm:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
