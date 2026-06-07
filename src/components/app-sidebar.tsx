"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import { LayoutBottomIcon } from "@hugeicons/core-free-icons";
import {
  BarChart3,
  Inbox,
  LayoutDashboard,
  ShieldCheck,
  UserRound,
  UsersRound,
  WalletCards,
  CreditCard,
} from "lucide-react";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
  },
  { id: "inbox", label: "Inbox", icon: Inbox, url: "/inbox" },
  { id: "rag", label: "Train Model", icon: Inbox, url: "/rag" },
  { id: "customers", label: "Customers", icon: UsersRound, url: "/customers" },
  { id: "analytics", label: "Analytics", icon: BarChart3, url: "/analytics" },
  { id: "pricing", label: "Pricing", icon: WalletCards, url: "/pricing" },
  { id: "billing", label: "Billing", icon: CreditCard, url: "/billing" },
  { id: "profile", label: "Profile", icon: UserRound, url: "/profile" },
  {
    id: "onboarding",
    label: "Onboarding",
    icon: ShieldCheck,
    url: "/onboarding",
  },
] as const;
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <HugeiconsIcon
                  icon={LayoutBottomIcon}
                  strokeWidth={2}
                  className="size-4"
                />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">Funza CRM</span>
                <span className="">v1.0.0</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={isActive}
                    render={<Link href={item.url} />}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
