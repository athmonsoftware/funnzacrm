"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Bell,
  Building2,
  ChevronDown, 
  Moon,
  Sun,
  Search,
  UserRound,
} from "lucide-react";
import NotificationPanel from "@/components/notifcations";
import { Button } from "@/components/ui";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useWorkspace, type WorkspaceType } from "@/lib/workspace-context";
import { useTheme } from "next-themes"

const workspaceOptions: Array<{ label: string; value: WorkspaceType }> = [
  { label: "SME", value: "sme" },
  { label: "Enterprise", value: "enterprise" },
  { label: "Personal", value: "personal" },
];

export function AppTopbar() {
  const pathname = usePathname();

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const [showNotifications, setShowNotifications] = useState(false);
  const { accessContext, organizationName, setWorkspaceType, userName, workspaceType } =
    useWorkspace();

  const breadcrumb = useMemo(() => {
    const segments = pathname
      .split("/")
      .filter(Boolean)
      .map((segment) =>
        segment
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" "),
      );

    return segments.length ? ["Dashboard", ...segments.slice(1)] : ["Dashboard"];
  }, [pathname]);

  return (
    <div className="sticky top-0 z-20 border-b border-funza-border bg-background/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex min-h-14 flex-col gap-3 py-3 xl:flex-row xl:items-center xl:justify-between xl:py-0">
        <div className="flex min-w-0 items-center gap-3">
          <SidebarTrigger className="-ml-1 shrink-0" />
          <div className="hidden min-w-0 items-center gap-2 text-sm text-funza-text-muted sm:flex">
            {breadcrumb.map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center gap-2">
                <span
                  className={
                    index === breadcrumb.length - 1
                      ? "font-semibold text-funza-text"
                      : ""
                  }
                >
                  {item}
                </span>
                {index < breadcrumb.length - 1 ? <span>/</span> : null}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="flex h-10 items-center gap-2 rounded-md border border-funza-border bg-card px-3 text-sm text-funza-text-secondary">
            <Building2 size={16} />
            <span className="hidden sm:inline">{organizationName}</span>
            <ChevronDown size={14} />
          </label>

          <select
            aria-label="Workspace"
            className="h-10 rounded-md border border-funza-border bg-card px-3 text-sm font-semibold text-funza-text outline-none"
            onChange={(event) => setWorkspaceType(event.target.value as WorkspaceType)}
            value={workspaceType}
          >
            {workspaceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label className="hidden h-10 min-w-[220px] items-center gap-2 rounded-md border border-funza-border bg-card px-3 text-sm text-funza-text-muted md:flex">
            <Search size={16} />
            <input
              aria-label="Global search"
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-funza-text-muted"
              placeholder="Search customers, threads, reports"
            />
          </label>

          <Button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="h-10 px-3"
            tone="secondary"
          >
            {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
          </Button>

          <div className="relative">
            <Button
              aria-label="Notifications"
              className="h-10 px-3"
              onClick={() => setShowNotifications((current) => !current)}
              tone="secondary"
            >
              <Bell size={16} />
            </Button>
            {showNotifications ? <NotificationPanel /> : null}
          </div>

          <Button className="h-10 gap-2 px-3" tone="secondary">
            <UserRound size={16} />
            <span className="hidden xl:inline">{userName}</span>
            <span className="hidden rounded bg-funza-primary-light px-1.5 py-0.5 text-[11px] font-semibold uppercase text-funza-primary xl:inline">
              {accessContext.tier}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

