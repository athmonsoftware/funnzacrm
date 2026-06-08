"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useWorkspace, type WorkspaceType } from "@/lib/workspace-context"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar"

import {
  LayoutDashboard,
  UsersRound,
  UserRound,
  Inbox,
  MessageSquareText,
  MessageCircle,
  Bot,
  Archive,
  BookOpen,
  FileText,
  Settings2,
  BarChart3,
  Wallet,
  CreditCard,
  Receipt,
  ShieldCheck,
  Users,
  Building2,
  Sparkles,
  Activity,
  Key,
  Lock,
  Plug,
  ChevronRight,
  LogOut,
  Tags,
  Layers,
  Smartphone,
} from "lucide-react"

// ── Navigation definition ──────────────────────────────────────────────
type NavItem = {
  id: string
  label: string
  icon: React.ElementType
  url: string
  badge?: string
  hideFor?: WorkspaceType[]
}

type NavSection = {
  title: string
  items: NavItem[]
  hideFor?: WorkspaceType[]
}

const navSections: NavSection[] = [
  {
    title: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
    ],
  },
  {
    title: "Customers",
    items: [
      { id: "customers", label: "Customer Directory", icon: UsersRound, url: "/customers" },
      { id: "segments", label: "Segments", icon: Layers, url: "/customers/segments" },
      { id: "tags", label: "Tags", icon: Tags, url: "/customers/tags" },
    ],
  },
  {
    title: "Conversations",
    items: [
      { id: "inbox", label: "Inbox", icon: Inbox, url: "/inbox", badge: "3" },
      { id: "sms", label: "SMS", icon: Smartphone, url: "/inbox/sms" },
      { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, url: "/inbox/whatsapp" },
      { id: "ai-conversations", label: "AI Conversations", icon: Bot, url: "/inbox/ai" },
      { id: "archived", label: "Archived", icon: Archive, url: "/inbox/archived" },
    ],
  },
  {
    title: "AI Center",
    items: [
      { id: "ai", label: "AI Assistant", icon: Sparkles, url: "/ai" },
      { id: "knowledge-base", label: "Knowledge Base", icon: BookOpen, url: "/ai/knowledge-base" },
      { id: "prompts", label: "Prompt Settings", icon: FileText, url: "/ai/prompts" },
      { id: "ai-usage", label: "Usage Metrics", icon: Activity, url: "/ai/usage" },
    ],
  },
  {
    title: "Payments",
    items: [
      { id: "payments", label: "Transactions", icon: Wallet, url: "/payments" },
      { id: "invoices", label: "Invoices", icon: CreditCard, url: "/payments/invoices" },
      { id: "receipts", label: "Receipts", icon: Receipt, url: "/payments/receipts" },
      { id: "subscriptions", label: "Subscriptions", icon: Layers, url: "/payments/subscriptions" },
    ],
  },
  {
    title: "Analytics",
    items: [
      { id: "analytics", label: "Analytics Center", icon: BarChart3, url: "/analytics" },
    ],
  },
  {
    title: "Team",
    hideFor: ["personal"],
    items: [
      { id: "members", label: "Members", icon: Users, url: "/team" },
      { id: "roles", label: "Roles & Permissions", icon: ShieldCheck, url: "/team/roles" },
      { id: "teams", label: "Teams", icon: Building2, url: "/team/teams", hideFor: ["personal"] },
    ],
  },
  {
    title: "Settings",
    items: [
      { id: "settings", label: "Organization", icon: Settings2, url: "/settings" },
      { id: "integrations", label: "Integrations", icon: Plug, url: "/settings", },
      { id: "security", label: "Security", icon: Lock, url: "/settings", hideFor: ["personal"] },
      { id: "api-keys", label: "API Keys", icon: Key, url: "/settings", hideFor: ["personal"] },
    ],
  },
]

// ── Sidebar component ──────────────────────────────────────────────────
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { workspaceType, organizationName } = useWorkspace()

  const filteredSections = navSections
    .filter((section) => !section.hideFor?.includes(workspaceType))
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => !item.hideFor?.includes(workspaceType)),
    }))

  return (
    <Sidebar className="border-r-0 bg-sidebar" {...props}>
      {/* Header */}
      <SidebarHeader className="px-4 pt-5 pb-4">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-funza-primary text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-semibold text-funza-text">Funza AI</span>
            <span className="text-[11px] text-funza-text-muted">{organizationName}</span>
          </div>
        </Link>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-3 custom-scrollbar">
        {filteredSections.map((section) => (
          <SidebarGroup key={section.title} className="mb-1">
            <SidebarGroupLabel className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-funza-text-muted">
              {section.title}
            </SidebarGroupLabel>
            <SidebarMenu className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.url || (item.url !== "/dashboard" && pathname.startsWith(item.url + "/"))
                const isExactActive = pathname === item.url

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={isExactActive}
                      className={`
                        group/item h-9 rounded-lg px-3 transition-all duration-150
                        ${isExactActive
                          ? "bg-funza-primary text-white shadow-sm"
                          : isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-funza-text-secondary hover:bg-sidebar-accent hover:text-funza-text"
                        }
                      `}
                      render={<Link href={item.url} />}
                    >
                      <Icon
                        size={17}
                        className={isExactActive ? "text-white" : "text-funza-text-muted group-hover/item:text-funza-text-secondary"}
                      />
                      <span className="text-[13px] font-medium">{item.label}</span>
                      {item.badge && (
                        <span className={`ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                          isExactActive ? "bg-white/25 text-white" : "bg-funza-primary/10 text-funza-primary"
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      {!item.badge && (
                        <ChevronRight
                          size={14}
                          className={`ml-auto transition-opacity ${
                            isExactActive ? "text-white/60 opacity-100" : "opacity-0 group-hover/item:opacity-100 text-funza-text-muted"
                          }`}
                        />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-sidebar-border px-3 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="h-10 rounded-lg px-3 text-funza-text-secondary hover:bg-sidebar-accent hover:text-funza-text"
              render={<Link href="/profile" />}
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-funza-primary/10 text-[11px] font-bold text-funza-primary">
                JE
              </div>
              <span className="text-[13px] font-medium">Joel Ekeng</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
