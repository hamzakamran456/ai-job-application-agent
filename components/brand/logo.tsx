import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  className?: string;
  /** Hide the wordmark (icon mark only). Useful in collapsed sidebars. */
  compact?: boolean;
};

export function Logo({ href = "/", className, compact = false }: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-bold tracking-tight text-primary-foreground">
        JB
      </span>
      <span
        className={cn(
          "text-base font-semibold tracking-tight text-foreground",
          compact && "sr-only",
          "group-data-[collapsible=icon]:hidden"
        )}
      >
        JobBuddy AI
      </span>
    </span>
  );

  if (!href) {
    return content;
  }

  return (
    <Link
      href={href}
      className="outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {content}
    </Link>
  );
}
