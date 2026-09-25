"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Briefcase01Icon,
  File01Icon,
  UserCircleIcon,
  Analytics01Icon,
  CreditCardIcon,
  Settings01Icon,
  Coins01Icon,
} from "@hugeicons/core-free-icons";
import { Logo } from "@/components/brand/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PLACEHOLDER_CREDITS = 150;
const PLACEHOLDER_CREDITS_MAX = 200;

const mainNav = [
  {
    title: "Jobs",
    href: "/dashboard/jobs",
    icon: Briefcase01Icon,
  },
  {
    title: "Resume",
    href: "/dashboard/resume",
    icon: File01Icon,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: UserCircleIcon,
  },
  {
    title: "Application Status",
    href: "/dashboard/application-status",
    icon: Analytics01Icon,
  },
] as const;

const footerNav = [
  {
    title: "Billing / Credits",
    href: "/dashboard/billing",
    icon: CreditCardIcon,
  },
  {
    title: "Profile Settings",
    href: "/dashboard/settings",
    icon: Settings01Icon,
  },
] as const;

const navButtonClass =
  "h-11 gap-3 px-3 text-[15px] font-medium tracking-tight data-active:bg-primary/30 data-active:font-semibold data-active:text-foreground hover:bg-primary/15";

function CreditsDisplay() {
  const { state, isMobile } = useSidebar();
  const collapsed = state === "collapsed" && !isMobile;
  const percent = Math.min(
    100,
    Math.round((PLACEHOLDER_CREDITS / PLACEHOLDER_CREDITS_MAX) * 100)
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger
          render={
            <Link
              href="/dashboard/billing"
              className="mx-auto flex size-10 items-center justify-center rounded-md text-foreground hover:bg-primary/20"
              aria-label={`${PLACEHOLDER_CREDITS} credits remaining`}
            />
          }
        >
          <HugeiconsIcon
            icon={Coins01Icon}
            strokeWidth={2}
            className="size-5 text-primary"
          />
        </TooltipTrigger>
        <TooltipContent side="right" align="center">
          {PLACEHOLDER_CREDITS} / {PLACEHOLDER_CREDITS_MAX} credits
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <div className="mx-1 rounded-xl border border-primary/25 bg-primary/10 p-3.5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-muted-foreground">
            Credits remaining
          </p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-foreground tabular-nums">
            {PLACEHOLDER_CREDITS}
            <span className="text-muted-foreground"> / {PLACEHOLDER_CREDITS_MAX}</span>
          </p>
        </div>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/25 text-foreground">
          <HugeiconsIcon icon={Coins01Icon} strokeWidth={2} className="size-4" />
        </span>
      </div>

      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-primary/20"
        role="progressbar"
        aria-valuenow={PLACEHOLDER_CREDITS}
        aria-valuemin={0}
        aria-valuemax={PLACEHOLDER_CREDITS_MAX}
        aria-label="Credits remaining"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width]"
          style={{ width: `${percent}%` }}
        />
      </div>

      <Link
        href="/dashboard/billing"
        className="mt-2.5 inline-block text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
      >
        Manage billing and credits
      </Link>
    </div>
  );
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <div className="flex h-14 items-center px-3 group-data-[collapsible=icon]:justify-center">
          <Logo href="/dashboard" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-2 py-2">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {mainNav.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      tooltip={item.title}
                      className={navButtonClass}
                    >
                      <HugeiconsIcon
                        icon={item.icon}
                        strokeWidth={2}
                        className="size-5!"
                      />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-2 p-2">
        <CreditsDisplay />

        <SidebarMenu className="gap-1">
          {footerNav.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  render={<Link href={item.href} />}
                  isActive={isActive}
                  tooltip={item.title}
                  className={navButtonClass}
                >
                  <HugeiconsIcon
                    icon={item.icon}
                    strokeWidth={2}
                    className="size-5!"
                  />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
