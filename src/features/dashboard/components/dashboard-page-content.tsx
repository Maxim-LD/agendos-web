"use client"

import { useAuth } from "@/providers"
import { withAuth } from "@/lib/auth-guard"

function DashboardPageContentBase() {
  const { user, isLoading } = useAuth()

  if (isLoading || !user) return null

  return (
    <div className="container mx-auto max-w-5xl px-1 py-0.5">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-black">Dashboard</h1>
          <p className="text-charcoal-black/60 mt-1">Welcome back! Here's your productivity overview.</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-charcoal-black">Coming Soon</h2>
          <p className="text-charcoal-black/60 mt-2">Your personalized dashboard with tasks, goals, and analytics is under construction. Stay tuned!</p>
        </div>
      </div>
    </div>
  )
}

export const DashboardPageContent = withAuth(DashboardPageContentBase)
