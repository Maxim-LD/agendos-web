"use client"

import { Sidebar } from "./sidebar"
import { useSidebar } from "./use-sidebar"
import { cn } from "@/lib/utils"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const { isExpanded } = useSidebar()

  return (
    <div className="min-h-screen w-full bg-background transition-colors duration-300">
      <Sidebar />
      <main className={cn("flex-1 transition-all duration-300 ease-in-out", isExpanded ? "lg:pl-64" : "lg:pl-0")}>
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full h-full">
          {children}
        </div>
      </main>
    </div>
  )
}