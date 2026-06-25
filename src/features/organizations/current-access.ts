import { rolePermissions } from "@/config/access-control";
import type { SubscriptionTier, UserAccessContext } from "@/types/platform";

export const demoAccessContext: UserAccessContext = {
  userId: "usr_joel_demo",
  role: "organization_owner",
  permissions: rolePermissions.organization_owner,
  tier: "business" satisfies SubscriptionTier,
  tenant: {
    organizationId: "org_funza_demo",
    workspaceId: "wrk_accra_growth",
    branchId: "br_accra",
    departmentId: "dept_customer_success",
  },
  featureFlags: ["reports.scheduled"],
};

