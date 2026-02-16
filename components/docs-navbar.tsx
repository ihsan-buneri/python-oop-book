"use client"

import Link from "next/link"
import { Moon, Sun, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSidebar } from "@/components/ui/sidebar"

export function DocsNavbar() {
  const { toggleSidebar } = useSidebar()

  const toggleTheme = () => {
    const html = document.documentElement
    const isDark = html.classList.toggle("dark")
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center justify-between gap-4 px-4 md:px-6 w-full max-w-[1440px] mx-auto">
        {/* Logo - Left */}
        <Link
          href="/docs"
          className="flex items-center gap-2 shrink-0 font-semibold"
        >
          <span className="text-xl">🐍</span>
          <span>Python OOP</span>
          <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-normal">
            Book
          </span>
        </Link>

        {/* Search - Center */}
        <div className="flex-1 flex justify-center min-w-0 max-w-xl mx-4">
          <Input
            placeholder="Search documentation..."
            className="h-9 w-full bg-muted/50"
          />
        </div>

        {/* Theme + Menu Toggle - Right */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 relative"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <Sun className="absolute size-4 opacity-0 scale-0 transition-all dark:opacity-100 dark:scale-100" />
            <Moon className="absolute size-4 opacity-100 scale-100 transition-all dark:opacity-0 dark:scale-0" />
          </Button>

          {/* Hamburger menu - visible only on small screens */}
          <Button
            variant="ghost"
            size="icon"
            className="size-9 min-[1000px]:hidden"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
