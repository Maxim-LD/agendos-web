"use client"

export function TasksPageContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-black">Tasks</h1>
        <p className="text-charcoal-black/60 mt-1">Welcome back! Here's your tasks overview.</p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-charcoal-black">Coming Soon</h2>
        <p className="text-charcoal-black/60 mt-2">Your tasks info and other related details is under construction. Stay tuned!</p>
      </div>
    </div>
  )
}
