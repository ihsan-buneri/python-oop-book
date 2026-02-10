import { Breadcrumb } from "@/components/breadcrumb"
import { DocsNavbar } from "@/components/docs-navbar"
import { DocsSidebar } from "@/components/docs-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export const metadata = {
  title: "Object-Oriented Python",
  description: "A practical guide to OOP in Python",
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-svh flex flex-col">
      <DocsNavbar />
      <div className="flex flex-1 min-h-0 w-full max-w-[1440px] mx-auto">
        <SidebarProvider className="flex-1 min-h-0 w-full">
          <DocsSidebar />
          <SidebarInset>
            <div className="flex items-center gap-2 border-b px-4 py-3 min-[1000px]:hidden">
              <SidebarTrigger />
              <span className="text-sm font-medium">Menu</span>
            </div>
            <div className="flex-1 overflow-auto p-6 md:p-10 min-[1441px]:pl-0">
              <Breadcrumb />
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  )
}
