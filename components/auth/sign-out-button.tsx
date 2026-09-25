"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/app/auth/actions";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <Button
        type="submit"
        variant="outline"
        size="sm"
        className="h-9 rounded-lg border-border bg-background px-3.5 text-sm font-medium text-foreground shadow-none hover:bg-muted"
      >
        Sign out
      </Button>
    </form>
  );
}
