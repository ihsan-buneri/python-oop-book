"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import type { DocHeading } from "@/lib/docs"

interface OnThisPageProps {
  headings: DocHeading[]
}

export function OnThisPageDropdown({ headings }: OnThisPageProps) {
  if (headings.length === 0) return null

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value
    if (id) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-[1000px]:hidden mb-6">
      <label htmlFor="on-this-page" className="sr-only">
        On this page
      </label>
      <div className="relative">
        <select
          id="on-this-page"
          onChange={handleSelect}
          className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">On this page</option>
          {headings.map((h) => (
            <option key={h.id} value={h.id}>
              {h.level === 3 ? "  " : ""}
              {h.title}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 size-4 -translate-y-1/2 pointer-events-none text-muted-foreground" />
      </div>
    </div>
  )
}

export function OnThisPageSidebar({ headings }: OnThisPageProps) {
  const pathname = usePathname()

  if (headings.length === 0) return null

  return (
    <aside className="hidden min-[1000px]:block w-56 shrink-0">
      <div className="sticky top-20">
        <h4 className="text-sm font-semibold mb-4">On this page</h4>
        <nav className="space-y-2">
          {headings.map((h) => (
            <Link
              key={h.id}
              href={`${pathname}#${h.id}`}
              className={`block text-sm text-muted-foreground hover:text-foreground transition-colors ${
                h.level === 3 ? "pl-4" : ""
              }`}
            >
              {h.title}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export function OnThisPage({ headings }: OnThisPageProps) {
  return (
    <>
      <OnThisPageDropdown headings={headings} />
      <OnThisPageSidebar headings={headings} />
    </>
  )
}
