"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type WorkspaceType = "personal" | "sme" | "enterprise"

interface WorkspaceContextValue {
  workspaceType: WorkspaceType
  setWorkspaceType: (type: WorkspaceType) => void
  organizationName: string
  userName: string
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null)

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspaceType, setWorkspaceType] = useState<WorkspaceType>("sme")

  return (
    <WorkspaceContext.Provider
      value={{
        workspaceType,
        setWorkspaceType,
        organizationName: "Funza AI Demo",
        userName: "Joel Ekeng",
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
