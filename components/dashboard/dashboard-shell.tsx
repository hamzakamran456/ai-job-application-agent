"use client";

import { usePathname } from "next/navigation";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/jobs": "Jobs",
  "/dashboard/resume": "Resume",
  "/dashboard/profile": "Profile",
  "/dashboard/application-status": "Application Status",
  "/dashboard/billing": "Billing / Credits",
  "/dashboard/settings": "Profile Settings",
};

function resolveTitle(pathname: string) {
  if (pageTitles[pathname]) return pageTitles[pathname];
  const match = Object.keys(pageTitles)
    .filter((path) => path !== "/dashboard" && pathname.startsWith(path))
    .sort((a, b) => b.length - a.length)[0];
  return match ? pageTitles[match] : "Dashboard";
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = resolveTitle(pathname);

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-muted/40">
          <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <h1 className="text-base font-semibold tracking-tight text-foreground">
              {title}
            </h1>
            <div className="flex-1" />
            <SignOutButton />
          </header>
          <div className="flex flex-1 flex-col">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
