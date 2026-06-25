import { AppSidebar } from "@/components/app-sidebar"
import { AppTopbar } from "@/components/app-topbar"
import { WorkspaceProvider } from "@/lib/workspace-context"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WorkspaceProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppTopbar />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </WorkspaceProvider>
  )
}
