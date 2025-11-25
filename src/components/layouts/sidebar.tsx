"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AgendosIcon } from "@/features/brand/components/logo/AgendosIcon"
import { AgendosWordmark } from "@/features/brand/components/logo/AgendosWordmark"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LogOut } from "lucide-react"
import { navItems } from "./constants"
import { useSidebar } from "./use-sidebar"

export function Sidebar() {
  const { isExpanded, setIsExpanded } = useSidebar()
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 flex h-full flex-col border-r bg-white shadow-lg transition-[width] duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-20"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex h-full w-full flex-col">
        <div
          className={cn(
            "flex h-20 items-center overflow-hidden border-b",
            isExpanded ? "justify-start gap-3 px-6" : "justify-center"
          )}
        >
          <AgendosIcon href="/" className="w-8 h-8" />
          {isExpanded && <AgendosWordmark href="/" className="text-2xl" />}
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full gap-3",
                  isExpanded ? "justify-start" : "justify-center",
                  pathname === item.href ? "text-electric-blue" : "text-charcoal-black/70"
                )}
                title={!isExpanded ? item.label : undefined}
              >
                <item.icon className="h-5 w-5" />
                {isExpanded && item.label}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t p-4">
          <Link href="/">
            <Button
              variant="ghost"
              className={cn(
                "w-full gap-3 text-red-500 hover:bg-red-50 hover:text-red-600",
                isExpanded ? "justify-start" : "justify-center"
              )}
              title={!isExpanded ? "Log Out" : undefined}
            >
              <LogOut className="h-5 w-5" />
              {isExpanded && "Log Out"}
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  )
}
