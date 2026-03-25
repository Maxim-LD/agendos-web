"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { AgendosIcon } from "@/features/brand/components/logo/AgendosIcon"
import { AgendosWordmark } from "@/features/brand/components/logo/AgendosWordmark"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/providers"
import { LogOut, Menu, User, Mail } from "lucide-react"
import { navItems } from "./constants"
import { useSidebar } from "./use-sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Sidebar() {
  const { isExpanded, setIsExpanded } = useSidebar()
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <AgendosIcon href="/" className="h-8 w-8" />
            <AgendosWordmark href="/" className="text-xl" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative" title="Messages">
            <Mail className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              5
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-100 shadow-lg p-1">
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/profile" className="flex items-center gap-2 w-full">
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="flex cursor-pointer items-center gap-2 w-full text-red-500 focus:text-red-600 focus:bg-red-50">
                <LogOut className="h-4 w-4" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      {/* Spacer to prevent fixed header from covering content */}
      <div className="h-16" />
      <div
        className={cn(
          "fixed inset-0 z-10 bg-black/20 transition-opacity duration-300 ease-in-out",
          isExpanded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsExpanded(false)}
      />
      <aside
        className={cn(
          "fixed left-0 top-16 z-20 flex h-[calc(100vh-4rem)] w-64 flex-col border-r bg-white shadow-lg transition-transform duration-300 ease-in-out",
          isExpanded ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  pathname === item.href ? "text-electric-blue" : "text-charcoal-black/70"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
