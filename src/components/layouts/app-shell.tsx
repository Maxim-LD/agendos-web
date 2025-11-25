"use client"

import { Sidebar } from "./sidebar"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen w-full bg-[#F5F5F5] pl-20">
      <Sidebar />
      <main className="p-8">{children}</main>
    </div>
  )
}