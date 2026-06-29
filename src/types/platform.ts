import type { ElementType } from "react";

export type Role =
  | "super_admin"
  | "organization_owner"
  | "branch_admin"
  | "manager"
  | "support_agent"
  | "viewer"
  | "developer";

export type Permission =
  | "messages.read"
  | "messages.write"
  | "analytics.read"
  | "analytics.export"
  | "billing.manage"
  | "ai.manage"
  | "users.manage"
  | "webhooks.manage"
  | "api.manage"
  | "compliance.review";

export type SubscriptionTier = "starter" | "business" | "enterprise";

export type TenantScope = {
  organizationId: string;
  workspaceId: string;
  branchId?: string;
  departmentId?: string;
  teamId?: string;
};

export type UserAccessContext = {
  userId: string;
  role: Role;
  permissions: Permission[];
  tier: SubscriptionTier;
  tenant: TenantScope;
  featureFlags?: string[];
};

export type DashboardModuleId =
  | "dashboard"
  | "analytics"
  | "customers"
  | "conversations"
  | "ai"
  | "campaigns"
  | "billing"
  | "developers"
  | "compliance"
  | "team"
  | "settings"
  | "platform";

export type DashboardModule = {
  id: DashboardModuleId;
  label: string;
  description: string;
  href: string;
  icon: ElementType;
  permissions: Permission[];
  tiers: SubscriptionTier[];
  roles?: Role[];
  featureFlag?: string;
  children?: DashboardModule[];
};

export type PageStateKind = "loading" | "empty" | "error" | "ready";

export type AnalyticsFilterState = {
  dateRange: "today" | "7d" | "30d" | "90d" | "custom";
  organizationId?: string;
  branchId?: string;
  departmentId?: string;
  campaignId?: string;
  aiModel?: string;
  channel?: "sms" | "whatsapp" | "web" | "all";
  segmentId?: string;
};

export type AnalyticsMetric = {
  id: string;
  label: string;
  value: string | number;
  previousValue?: string | number;
  change?: string;
  trend: "up" | "down" | "flat";
  permission?: Permission;
};

export type AnalyticsSeriesPoint = {
  label: string;
  value: number;
  secondaryValue?: number;
  group?: string;
};
