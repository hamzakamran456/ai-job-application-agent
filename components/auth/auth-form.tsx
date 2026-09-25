"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { createClient } from "@/lib/supabase/client";

type AuthMode = "sign-in" | "sign-up";

type AuthFormProps = {
  mode: AuthMode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const isSignUp = mode === "sign-up";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const supabase = createClient();

    try {
      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          },
        });

        if (signUpError) {
          setError(signUpError.message);
          return;
        }

        if (data.session) {
          router.push("/dashboard");
          router.refresh();
          return;
        }

        setMessage(
          "Check your email for a confirmation link to finish signing up."
        );
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setError(null);
    setMessage(null);
    setGoogleLoading(true);

    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    if (oauthError) {
      setError(oauthError.message);
      setGoogleLoading(false);
    }
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight text-black">
          {isSignUp ? "Create account" : "Sign in"}
        </h1>
        <p className="text-sm leading-relaxed text-neutral-500">
          {isSignUp
            ? "Get started with Job Agent in under a minute."
            : "Welcome back. Sign in to continue."}
        </p>
      </div>

      <Button
        type="button"
        variant="secondary"
        size="lg"
        className="h-10 w-full gap-2 rounded-lg bg-[#f3f3f3] text-sm font-medium text-black hover:bg-[#ebebeb]"
        disabled={loading || googleLoading}
        onClick={handleGoogleSignIn}
      >
        <GoogleIcon />
        {googleLoading ? "Redirecting…" : "Continue with Google"}
      </Button>

      <FieldSeparator>or continue with email</FieldSeparator>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FieldGroup className="gap-4">
          {isSignUp && (
            <Field>
              <FieldLabel htmlFor="fullName" className="text-sm text-black">
                Full name
              </FieldLabel>
              <Input
                id="fullName"
                name="fullName"
                autoComplete="name"
                placeholder="Alex Morgan"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-10 rounded-lg border-[#e5e5e5] bg-white px-3 text-sm md:text-sm"
                required
              />
            </Field>
          )}

          <Field>
            <FieldLabel htmlFor="email" className="text-sm text-black">
              Email
            </FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 rounded-lg border-[#e5e5e5] bg-white px-3 text-sm md:text-sm"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password" className="text-sm text-black">
              Password
            </FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 rounded-lg border-[#e5e5e5] bg-white px-3 text-sm md:text-sm"
              minLength={6}
              required
            />
            {isSignUp && (
              <FieldDescription>At least 6 characters.</FieldDescription>
            )}
          </Field>
        </FieldGroup>

        {error && <FieldError>{error}</FieldError>}
        {message && (
          <p className="rounded-lg border border-[#e5e5e5] bg-[#f9f9f9] px-3 py-2 text-sm text-neutral-700">
            {message}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="mt-1 h-10 w-full rounded-lg bg-[#1a1a1a] text-sm font-medium text-white hover:bg-black"
          disabled={loading || googleLoading}
        >
          {loading
            ? isSignUp
              ? "Creating account…"
              : "Signing in…"
            : isSignUp
              ? "Create account"
              : "Sign in"}
        </Button>
      </form>

      <p className="text-center text-sm text-neutral-500">
        {isSignUp ? (
          <>
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-black underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </>
        ) : (
          <>
            New here?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-black underline-offset-4 hover:underline"
            >
              Create an account
            </Link>
          </>
        )}
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4">
      <path
        fill="#EA4335"
        d="M12 10.2v3.6h5.1c-.2 1.2-.9 2.3-1.9 3l3.1 2.4c1.8-1.7 2.9-4.1 2.9-7 0-.7-.1-1.3-.2-1.9H12z"
      />
      <path
        fill="#34A853"
        d="M6.6 14.3l-.7.5-2.4 1.9C5.1 19.3 8.3 21.2 12 21.2c2.4 0 4.5-.8 6-2.2l-3.1-2.4c-.8.6-1.9.9-2.9.9-2.3 0-4.2-1.5-4.9-3.6z"
      />
      <path
        fill="#4A90E2"
        d="M3.5 7.3C2.9 8.5 2.5 9.9 2.5 11.4s.4 2.9 1 4.1c0 .1 3.1-2.4 3.1-2.4-.2-.5-.3-1.1-.3-1.7s.1-1.2.3-1.7L3.5 7.3z"
      />
      <path
        fill="#FBBC05"
        d="M12 5.4c1.3 0 2.5.5 3.4 1.3l2.6-2.6C16.5 2.6 14.4 1.8 12 1.8 8.3 1.8 5.1 3.7 3.5 6.7l3.1 2.4C7.8 6.9 9.7 5.4 12 5.4z"
      />
    </svg>
  );
}
