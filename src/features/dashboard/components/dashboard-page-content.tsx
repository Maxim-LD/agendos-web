"use client"

import { AgendosLogo } from "@/features/brand/components/logo/AgendosLogo"

export function DashboardPageContent() {
  return (
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
  )
}
