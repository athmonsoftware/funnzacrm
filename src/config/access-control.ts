import type {
  Permission,
  Role,
  SubscriptionTier,
  UserAccessContext,
} from "@/types/platform";

export const rolePermissions: Record<Role, Permission[]> = {
  super_admin: [
    "messages.read",
    "messages.write",
    "analytics.read",
    "analytics.export",
    "billing.manage",
    "ai.manage",
    "users.manage",
    "webhooks.manage",
    "api.manage",
    "compliance.review",
  ],
  organization_owner: [
    "messages.read",
    "messages.write",
    "analytics.read",
    "analytics.export",
    "billing.manage",
    "ai.manage",
    "users.manage",
    "webhooks.manage",
    "api.manage",
    "compliance.review",
  ],
  branch_admin: [
    "messages.read",
    "messages.write",
    "analytics.read",
    "analytics.export",
    "ai.manage",
    "users.manage",
  ],
  manager: [
    "messages.read",
    "messages.write",
    "analytics.read",
    "analytics.export",
    "ai.manage",
  ],
  support_agent: ["messages.read", "messages.write", "analytics.read"],
  viewer: ["messages.read", "analytics.read"],
  developer: [
    "messages.read",
    "analytics.read",
    "webhooks.manage",
    "api.manage",
  ],
};

export const tierFeatureFlags: Record<SubscriptionTier, string[]> = {
  starter: ["crm.core", "messages.sms", "analytics.basic"],
  business: [
    "crm.core",
    "messages.sms",
    "messages.whatsapp",
    "analytics.advanced",
    "campaigns.builder",
    "ai.knowledge_base",
    "reports.scheduled",
  ],
  enterprise: [
    "crm.core",
    "messages.sms",
    "messages.whatsapp",
    "analytics.advanced",
    "campaigns.builder",
    "ai.knowledge_base",
    "reports.scheduled",
    "compliance.audit",
    "developers.api",
    "platform.controls",
    "tenant.branches",
  ],
};

export function hasPermission(
  context: Pick<UserAccessContext, "permissions">,
  permission: Permission,
) {
  return context.permissions.includes(permission);
}

export function hasAnyPermission(
  context: Pick<UserAccessContext, "permissions">,
  permissions: Permission[],
) {
  if (permissions.length === 0) return true;
  return permissions.some((permission) => hasPermission(context, permission));
}

export function hasFeature(
  context: Pick<UserAccessContext, "tier" | "featureFlags">,
  featureFlag?: string,
) {
  if (!featureFlag) return true;

  const tierFlags = tierFeatureFlags[context.tier] ?? [];
  const explicitFlags = context.featureFlags ?? [];

  return tierFlags.includes(featureFlag) || explicitFlags.includes(featureFlag);
}

export function canAccessTenant(
  context: Pick<UserAccessContext, "tenant" | "role">,
  target: Partial<UserAccessContext["tenant"]>,
) {
  if (context.role === "super_admin") return true;
  if (target.organizationId && target.organizationId !== context.tenant.organizationId) {
    return false;
  }
  if (target.workspaceId && target.workspaceId !== context.tenant.workspaceId) {
    return false;
  }
  if (target.branchId && context.tenant.branchId && target.branchId !== context.tenant.branchId) {
    return false;
  }

  return true;
}

