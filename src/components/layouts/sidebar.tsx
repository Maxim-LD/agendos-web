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
import { ThemeToggle } from "@/components/theme-toggle"

export function Sidebar() {
  const { isExpanded, setIsExpanded } = useSidebar()
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 shadow-sm">
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
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative group text-muted-foreground hover:text-foreground" title="Messages">
            <Mail className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2 items-center justify-center rounded-full bg-primary ring-2 ring-background transition-transform group-hover:scale-110">
              <span className="sr-only">New messages</span>
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full bg-primary/10 hover:bg-primary/20 text-primary">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl border border-border/50 shadow-lg">
              <DropdownMenuItem asChild className="cursor-pointer rounded-lg py-2">
                <Link href="/profile" className="flex items-center gap-2.5 w-full">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="flex cursor-pointer items-center gap-2.5 w-full text-destructive focus:text-destructive focus:bg-destructive/10 rounded-lg py-2 mt-1">
                <LogOut className="h-4 w-4" />
                <span className="font-medium">Log Out</span>
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
          "fixed left-0 top-16 z-20 flex h-[calc(100vh-4rem)] w-64 flex-col border-r border-border/40 bg-card shadow-sm transition-transform duration-300 ease-in-out",
          isExpanded ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="flex-1 space-y-1.5 p-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-11 px-4 font-semibold text-sm transition-all",
                  pathname === item.href 
                    ? "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <item.icon className="h-5 w-5" strokeWidth={pathname === item.href ? 2.5 : 2} />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
