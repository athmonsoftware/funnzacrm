"use client";

import type { ReactNode } from "react";
import { hasAnyPermission, hasFeature } from "@/config/access-control";
import { useWorkspace } from "@/lib/workspace-context";
import type { Permission } from "@/types/platform";

export function PermissionGuard({
  children,
  fallback = null,
  permissions,
}: {
  children: ReactNode;
  fallback?: ReactNode;
  permissions: Permission[];
}) {
  const { accessContext } = useWorkspace();

  if (!hasAnyPermission(accessContext, permissions)) return fallback;

  return children;
}

export function FeatureGuard({
  children,
  fallback = null,
  feature,
}: {
  children: ReactNode;
  fallback?: ReactNode;
  feature: string;
}) {
  const { accessContext } = useWorkspace();

  if (!hasFeature(accessContext, feature)) return fallback;

  return children;
}

