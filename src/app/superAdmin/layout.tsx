import { AppSidebar } from "@/components/superAdmin/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="-ml-1" />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
