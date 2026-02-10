"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { docsNav, type DocItem } from "@/lib/docs"

const flatNav = docsNav.flatMap((item) => item.items ?? [item])

function NavItem({ item }: { item: DocItem }) {
  const pathname = usePathname()
  const isActive = pathname === item.href

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href={item.href}>{item.title}</Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

// No separate App Router section needed for the OOP book

export function DocsSidebar() {
  return (
    <Sidebar collapsible="offcanvas" side="left" className="bg-background text-foreground docs-sidebar">
      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {flatNav.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
