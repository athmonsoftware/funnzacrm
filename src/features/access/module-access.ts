import {
  hasAnyPermission,
  hasFeature,
} from "@/config/access-control";
import { dashboardModules } from "@/config/modules";
import type { DashboardModule, UserAccessContext } from "@/types/platform";

export function canAccessModule(
  module: DashboardModule,
  context: UserAccessContext,
) {
  const roleAllowed = !module.roles || module.roles.includes(context.role);
  const tierAllowed = module.tiers.includes(context.tier);

  return (
    roleAllowed &&
    tierAllowed &&
    hasAnyPermission(context, module.permissions) &&
    hasFeature(context, module.featureFlag)
  );
}

export function getAccessibleModules(context: UserAccessContext) {
  return dashboardModules.filter((module) => canAccessModule(module, context));
}

