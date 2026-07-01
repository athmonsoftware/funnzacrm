"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import { rolePermissions } from "@/config/access-control"
import type { SubscriptionTier, UserAccessContext } from "@/types/platform"
import { authClient } from "@/lib/auth-client"

export type WorkspaceType = "personal" | "sme" | "enterprise"

interface WorkspaceContextValue {
  workspaceType: WorkspaceType
  setWorkspaceType: (type: WorkspaceType) => void
  organizationName: string
  userName: string
  accessContext: UserAccessContext
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null)

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspaceType, setWorkspaceType] = useState<WorkspaceType>("sme")
  const tier: SubscriptionTier =
    workspaceType === "enterprise"
      ? "enterprise"
      : workspaceType === "personal"
        ? "starter"
        : "business"
  
  const session = authClient.useSession()

  const accessContext = useMemo<UserAccessContext>(
    () => ({
      userId: session.data?.user.id || "",
      role: "organization_owner",
      permissions: rolePermissions.organization_owner,
      tier,
      tenant: {
        organizationId: "org_funza_demo",
        workspaceId:
          workspaceType === "enterprise"
            ? "wrk_enterprise_ops"
            : workspaceType === "personal"
              ? "wrk_personal"
              : "wrk_accra_growth",
        branchId: workspaceType === "personal" ? undefined : "br_accra",
        departmentId:
          workspaceType === "personal" ? undefined : "dept_customer_success",
      },
      featureFlags: ["reports.scheduled"],
    }),
    [tier, workspaceType],
  )

  return (
    <WorkspaceContext.Provider
      value={{
        workspaceType,
        setWorkspaceType,
        organizationName:
          workspaceType === "enterprise"
            ? "Enterprise Workspace"
            : workspaceType === "personal"
              ? "Personal Workspace"
              : "SME Workspace",
        userName: session.data?.user.name || "User",
        accessContext,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  )
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext)
  if (!ctx) throw new Error("useWorkspace must be used inside WorkspaceProvider")
  return ctx
}
