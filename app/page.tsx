import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="relative flex min-h-svh flex-1 flex-col bg-white">
      <div aria-hidden className="page-glow pointer-events-none absolute inset-0" />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-10">
        <Logo />
        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-sm font-medium text-black transition-opacity hover:opacity-70"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-9 rounded-lg bg-black px-4 text-sm text-white hover:bg-black/85"
            )}
          >
            Get started
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 pb-24 text-center sm:px-10">
        <span className="mb-6 inline-flex items-center rounded-full border border-black/10 bg-white/80 px-3.5 py-1 text-xs font-medium text-neutral-600 shadow-sm">
          AI-powered job application assistant
        </span>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-black sm:text-5xl sm:leading-[1.1]">
          Apply to jobs faster with an agent that works for you
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-500 sm:text-lg">
          Job Agent helps you discover roles, tailor applications, and stay
          organized — so you can focus on landing the offer.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/sign-up"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-lg bg-black px-5 text-sm font-medium text-white hover:bg-black/85"
            )}
          >
            Create free account
          </Link>
          <Link
            href="/sign-in"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded-lg border-black/15 bg-white px-5 text-sm font-medium text-black hover:bg-neutral-50"
            )}
          >
            Sign in
          </Link>
        </div>
      </main>
    </div>
  );
}
