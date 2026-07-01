"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import {
  LayoutDashboard,
  Building2,
  UsersRound,
  UserRound,
  MessageSquareText,
  Bot,
  Workflow,
  BarChart3,
  WalletCards,
  CreditCard,
  ShieldCheck,
  Settings,
  Bell,
  Activity,
  Database,
  Globe,
  FileText,
  LifeBuoy,
  LogOut,
  ChevronRight,
} from "lucide-react"

const overviewItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    url: "/analytics",
  },
  {
    id: "activity",
    label: "Live Activity",
    icon: Activity,
    url: "/activity",
  },
] as const

const organizationItems = [
  {
    id: "organizations",
    label: "Organizations",
    icon: Building2,
    url: "/organizations",
  },
  {
    id: "users",
    label: "Users",
    icon: UsersRound,
    url: "/users",
  },
  {
    id: "roles",
    label: "Roles & Permissions",
    icon: ShieldCheck,
    url: "/roles",
  },
] as const

const communicationItems = [
  {
    id: "messages",
    label: "Messages",
    icon: MessageSquareText,
    url: "/messages",
  },
  {
    id: "channels",
    label: "Channels",
    icon: Globe,
    url: "/channels",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    url: "/notifications",
  },
] as const

const aiItems = [
  {
    id: "ai-assistants",
    label: "AI Assistants",
    icon: Bot,
    url: "/ai-assistants",
  },
  {
    id: "automations",
    label: "Automations",
    icon: Workflow,
    url: "/automations",
  },
  {
    id: "knowledge-base",
    label: "Knowledge Base",
    icon: Database,
    url: "/knowledge-base",
  },
] as const

const billingItems = [
  {
    id: "subscriptions",
    label: "Subscriptions",
    icon: WalletCards,
    url: "/subscriptions",
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
    url: "/billing",
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileText,
    url: "/reports",
  },
] as const

function SidebarSection({
  title,
  items,
  pathname,
}: {
  title: string
  items: readonly {
    id: string
    label: string
    icon: React.ElementType
    url: string
  }[]
  pathname: string
}) {
  return (
    <SidebarGroup className="mb-6">
      <div className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {title}
      </div>

      <SidebarMenu className="space-y-0.5">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.url

          return (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                isActive={isActive}
                className={`
                  group h-12 rounded-2xl px-4 transition-all duration-200
                  ${
                    isActive
                      ? "bg-orange-500 text-white shadow-sm hover:bg-orange-600"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }
                `}
              >
                <Link
                  href={item.url}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={19}
                      className={
                        isActive
                          ? "text-white"
                          : "text-muted-foreground"
                      }
                    />

                    <span className="text-[14px] font-medium">
                      {item.label}
                    </span>
                  </div>

                  <ChevronRight
                    size={16}
                    className={`
                      transition-opacity
                      ${
                        isActive
                          ? "text-white opacity-100"
                          : "opacity-0 group-hover:opacity-100 text-muted-foreground"
                      }
                    `}
                  />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar
      className="border-r-0 bg-sidebar"
      {...props}
    >
      {/* HEADER */}
      <SidebarHeader className="px-5 pt-6 pb-5">
        <div className="rounded-[28px] border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-sm">
              <Building2 className="h-5 w-5" />
            </div>

            <div className="flex flex-col">
              <span className="text-[15px] font-semibold text-foreground">
                Funza CRM
              </span>

              <span className="text-xs text-muted-foreground">
                Super Admin
              </span>
            </div>
          </div>

          {/* PLATFORM STATS */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-muted p-3">
              <p className="text-[11px] text-muted-foreground">
                Organizations
              </p>

              <h3 className="mt-1 text-lg font-semibold text-foreground">
                248
              </h3>
            </div>

            <div className="rounded-2xl bg-muted p-3">
              <p className="text-[11px] text-muted-foreground">
                Active Users
              </p>

              <h3 className="mt-1 text-lg font-semibold text-foreground">
                12.4k
              </h3>
            </div>
          </div>
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="px-4 pb-0.5">
        <SidebarSection
          title="Overview"
          items={overviewItems}
          pathname={pathname}
        />

        <SidebarSection
          title="Organizations"
          items={organizationItems}
          pathname={pathname}
        />

        <SidebarSection
          title="Communication"
          items={communicationItems}
          pathname={pathname}
        />

        <SidebarSection
          title="AI & Automation"
          items={aiItems}
          pathname={pathname}
        />

        <SidebarSection
          title="Billing & Reports"
          items={billingItems}
          pathname={pathname}
        />

        {/* GENERAL */}
        <SidebarGroup className="mt-4">
          <div className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            General
          </div>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="h-12 rounded-2xl px-4 text-muted-foreground hover:bg-muted"
              >
                <Link
                  href="/profile"
                  className="flex items-center gap-3"
                >
                  <UserRound
                    size={19}
                    className="text-muted-foreground"
                  />

                  <span className="text-[14px] font-medium">
                    Profile
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                className="h-12 rounded-2xl px-4 text-muted-foreground hover:bg-muted"
              >
                <Link
                  href="/settings"
                  className="flex items-center gap-3"
                >
                  <Settings
                    size={19}
                    className="text-muted-foreground"
                  />

                  <span className="text-[14px] font-medium">
                    Settings
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                className="h-12 rounded-2xl px-4 text-muted-foreground hover:bg-muted"
              >
                <Link
                  href="/support"
                  className="flex items-center gap-3"
                >
                  <LifeBuoy
                    size={19}
                    className="text-muted-foreground"
                  />

                  <span className="text-[14px] font-medium">
                    Support Center
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* LOGOUT */}
            <SidebarMenuItem className="pt-5">
              <SidebarMenuButton
                className="h-12 rounded-2xl border border-border bg-card px-4 text-orange-500 hover:bg-muted"
              >
                <Link
                  href="/logout"
                  className="flex items-center gap-3"
                >
                  <LogOut size={18} />

                  <span className="text-[14px] font-medium">
                    Log out
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}