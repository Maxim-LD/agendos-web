"use client"

import { Sidebar } from "./sidebar"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    // REMOVED: pl-20. The outer div is now full width.
    <div className="min-h-screen w-full bg-[#F5F5F5]">
      <Sidebar />
      {/* ADDED: ml-20 to reserve space for the fixed Sidebar */}
      <main className="p-8">{children}</main>
    </div>
  )
}