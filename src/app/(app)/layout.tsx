import { AppSidebar } from "@/components/app-sidebar"
import { WorkspaceProvider } from "@/lib/workspace-context"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WorkspaceProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="sticky top-0 z-10 flex h-14 items-center border-b border-funza-border bg-background/95 px-4 backdrop-blur sm:px-6 lg:px-8">
            <SidebarTrigger className="-ml-1" />
          </div>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </WorkspaceProvider>
  )
}
