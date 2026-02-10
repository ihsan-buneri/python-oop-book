"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ChevronRight } from "lucide-react"
import { getBreadcrumb } from "@/lib/docs"

export function Breadcrumb() {
  const pathname = usePathname()
  const items = getBreadcrumb(pathname)

  if (items.length < 2) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
    >
      {items.map((item, i) => (
        <span key={item.href} className="flex items-center gap-2">
          {i > 0 && <ChevronRight className="size-4 shrink-0" />}
          {i === 0 ? (
            <Link
              href={item.href}
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Home className="size-4" />
            </Link>
          ) : i === items.length - 1 ? (
            <span className="text-foreground font-medium">{item.title}</span>
          ) : (
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.title}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
