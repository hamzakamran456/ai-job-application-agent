import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
  title: "Sign in · Job Agent",
  description: "Sign in to your Job Agent account",
};

export default function SignInPage() {
  return (
    <AuthShell>
      <AuthForm mode="sign-in" />
    </AuthShell>
  );
}
