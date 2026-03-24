"use client"

import { useState } from "react"
import { useAuth } from "@/providers"
import { withAuth } from "@/lib/auth-guard"
import { useTasks } from "@/features/tasks/lib/use-tasks"
import { AgendosIcon } from "@/features/brand/components/logo/AgendosIcon"
import { AgendosWordmark } from "@/features/brand/components/logo/AgendosWordmark"
import {
  CheckCircle2,
  Circle,
  Plus,
  Flame,
  Bell,
  Clock,
  Calendar
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

function DashboardPageContentBase() {
  const { user, isLoading: authLoading } = useAuth()
  const { tasks, toggleTaskStatus, handleCreateTask, newTask, handleNewTaskChange, isSubmitting } = useTasks()
  const [showCapture, setShowCapture] = useState(false)

  if (authLoading || !user) return null

  // Date formatting
  const today = new Date()
  const dateString = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }).format(today)

  // Derived tracking state
  const activeTasks = tasks.filter(t => t.status !== "completed")
  const completedTodayCount = tasks.filter(t => t.status === "completed").length
  const highPriorityTasks = activeTasks.filter(t => t.urgency === "high").slice(0, 5)

  // Safe percentage
  const progressPercentage = tasks.length > 0 ? Math.round((completedTodayCount / tasks.length) * 100) : 0

  return (
    <div className="bg-[var(--color-zinc-50)] min-h-[calc(100vh-4rem)] pb-32 px-4 sm:px-6 lg:px-8 py-6 rounded-tl-[2rem] md:rounded-tl-none relative isolate">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header matching Mobile Mockup */}
        <div className="flex items-center justify-between mb-2 mt-2">
          <div className="flex items-center gap-2.5">
            <div className="bg-white p-2.5 rounded-2xl shadow-sm">
              <AgendosIcon className="w-8 h-8 md:w-10 md:h-10 text-[var(--color-zinc-900)]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl md:text-2xl font-bold text-[var(--color-zinc-900)] leading-tight flex items-center gap-2">
                  Hello, {user.fullname?.split(' ')[0]}
                </h1>
              </div>
              <p className="text-sm font-medium text-[var(--color-zinc-900)]/60 mt-0.5">{dateString}</p>
            </div>
          </div>
          <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
            <Bell className="w-5 h-5 text-[var(--color-zinc-900)]" />
          </button>
        </div>

        {/* Hero Card: Streak & Tracking (Blue Gradient) */}
        <div className="bg-gradient-to-br from-[var(--color-indigo-500)] to-[var(--color-indigo-500)]/85 rounded-3xl p-6 shadow-xl shadow-indigo-500/10 mb-8">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <Flame className="w-6 h-6 text-[var(--color-orange-600)]" />
              </div>
              <span className="text-white font-bold text-xl md:text-2xl tracking-tight">Productivity Pulse</span>
            </div>
            <span className="text-white/90 text-sm font-medium">{completedTodayCount} tasks done</span>
          </div>
          <div className="flex gap-2.5 mt-2">
            {/* Dynamic mockup streak array */}
            {[...Array(7)].map((_, i) => (
              <div key={i} className={`flex-1 h-3 rounded-full ${i < 5 ? "bg-[var(--color-orange-600)] shadow-sm shadow-orange-500/20" : "bg-white/30"}`} />
            ))}
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* Left Column: Tasks */}
          <div className="lg:col-span-7 space-y-8">

            {/* High Priority Block (if active) */}
            {highPriorityTasks.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4 px-1">
                  <h2 className="text-lg font-bold text-[var(--color-zinc-900)] flex items-center font-heading tracking-tight">
                    <Flame className="w-5 h-5 mr-2 text-[var(--color-orange-600)]" /> Urgent Tasks
                  </h2>
                </div>
                <div className="space-y-3">
                  {highPriorityTasks.map((task) => (
                    <div key={task.id} className="bg-white rounded-2xl p-4.5 flex items-center gap-4 shadow-sm border border-transparent hover:border-[var(--color-indigo-500)]/10 transition-colors cursor-pointer group" onClick={() => toggleTaskStatus(task.id, task.status)}>
                      {task.status === 'completed' ? (
                        <CheckCircle2 className="w-7 h-7 text-[var(--color-indigo-500)] flex-shrink-0" />
                      ) : (
                        <Circle className="w-7 h-7 text-[var(--color-zinc-900)]/20 flex-shrink-0 group-hover:text-[var(--color-indigo-500)]/50 transition-colors" />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className={`block truncate text-base font-semibold ${task.status === 'completed' ? "line-through text-[var(--color-zinc-900)]/40" : "text-[var(--color-zinc-900)]"}`}>
                          {task.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Tasks Block */}
            <div>
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-lg font-bold text-[var(--color-zinc-900)] font-heading tracking-tight">Tasks</h2>
                <a href="/tasks" className="text-[var(--color-indigo-500)] text-sm font-bold hover:underline">View All</a>
              </div>

              {/* Progress Mini Card */}
              <div className="bg-white rounded-3xl p-6 mb-5 shadow-sm border border-[var(--color-zinc-900)]/5">
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-[var(--color-zinc-900)]/60 text-sm font-semibold tracking-wide uppercase">Today's Progress</span>
                  <span className="text-[var(--color-indigo-500)] font-bold text-lg">{completedTodayCount}/{tasks.length} tasks</span>
                </div>
                <div className="w-full bg-[var(--color-zinc-50)] h-3.5 rounded-full overflow-hidden">
                  <div className="bg-[var(--color-indigo-500)] h-3.5 rounded-full transition-all duration-700 ease-out shadow-sm" style={{ width: `${progressPercentage}%` }} />
                </div>
              </div>

              {/* Subtask mapping */}
              <div className="space-y-3">
                {activeTasks.filter(t => t.urgency !== "high").slice(0, 6).map((task) => (
                  <div key={task.id} className="bg-white rounded-2xl p-4.5 flex items-center gap-4 shadow-sm border border-transparent hover:border-[var(--color-zinc-900)]/5 transition-colors cursor-pointer group" onClick={() => toggleTaskStatus(task.id, task.status)}>
                    {task.status === 'completed' ? (
                      <CheckCircle2 className="w-7 h-7 text-[var(--color-indigo-500)] flex-shrink-0" />
                    ) : (
                      <Circle className="w-7 h-7 text-[var(--color-zinc-900)]/20 flex-shrink-0 group-hover:text-[var(--color-indigo-500)]/50 transition-colors" />
                    )}
                    <span className={`flex-1 truncate text-base font-semibold ${task.status === 'completed' ? "line-through text-[var(--color-zinc-900)]/40" : "text-[var(--color-zinc-900)]"}`}>
                      {task.title}
                    </span>
                  </div>
                ))}

                {activeTasks.length === 0 && (
                  <div className="bg-[var(--color-zinc-900)]/5 rounded-3xl p-10 text-center border-2 border-dashed border-[var(--color-zinc-900)]/10 mt-6">
                    <CheckCircle2 className="w-12 h-12 text-[var(--color-indigo-500)]/40 mx-auto mb-4" />
                    <p className="font-bold text-lg text-[var(--color-zinc-900)]">All caught up!</p>
                    <p className="font-medium text-[var(--color-zinc-900)]/50 mt-1.5">Hit the orange plus button below to add tasks.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Utilities */}
          <div className="lg:col-span-5 space-y-8 mt-2 lg:mt-0">

            {/* Focus Timer Redesign (Dark Inverse) */}
            <div className="bg-[var(--color-zinc-900)] rounded-3xl p-8 shadow-xl relative overflow-hidden text-center md:text-left">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
              <div className="relative z-10 text-white">
                <h3 className="font-bold text-sm text-white/50 tracking-widest uppercase flex items-center justify-center md:justify-start mb-8">
                  <Clock className="w-4 h-4 mr-2 text-[var(--color-indigo-500)]" /> Focus
                </h3>
                <div className="text-6xl font-light tracking-tighter mb-10 font-sans">
                  25:00
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-white/10 hover:bg-white/15 text-white text-sm font-bold py-3.5 px-6 rounded-2xl transition-colors backdrop-blur-sm">25m</button>
                  <button className="bg-[var(--color-indigo-500)] hover:bg-[var(--color-indigo-500)]/90 text-white text-sm font-bold py-3.5 px-8 rounded-2xl transition-colors flex-1 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    Start
                  </button>
                </div>
              </div>
            </div>

            {/* Upcoming Events Mock */}
            <div>
              <h2 className="text-lg font-bold text-[var(--color-zinc-900)] mb-4 px-1 font-heading tracking-tight">
                Schedule
              </h2>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-[var(--color-zinc-900)]/5 space-y-5">

                <div className="flex gap-4 items-start group relative">
                  <div className="absolute left-[20px] top-6 bottom-[-20px] w-0.5 bg-[var(--color-zinc-50)] z-0"></div>
                  <div className="w-10 text-center shrink-0 relative z-10 pt-0.5">
                    <div className="text-sm font-bold text-[var(--color-zinc-900)]">09:00</div>
                  </div>
                  <div className="flex-1 bg-[var(--color-zinc-50)] rounded-2xl p-3.5 relative z-10 border-l-4 border-[var(--color-indigo-500)]">
                    <p className="text-base font-bold text-[var(--color-zinc-900)]">Team Standup</p>
                    <p className="text-xs text-[var(--color-zinc-900)]/50 font-bold mt-1">Google Meet</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group relative">
                  <div className="w-10 text-center shrink-0 relative z-10 pt-0.5">
                    <div className="text-sm font-bold text-[var(--color-zinc-900)]">14:00</div>
                  </div>
                  <div className="flex-1 bg-[var(--color-zinc-50)] rounded-2xl p-3.5 relative z-10 border-l-4 border-[var(--color-orange-600)]">
                    <p className="text-base font-bold text-[var(--color-zinc-900)]">Client Review</p>
                    <p className="text-xs text-[var(--color-zinc-900)]/50 font-bold mt-1">Zoom Link</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Action Button & Quick Capture */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex flex-col items-end gap-3">
        {/* Animated inline capture form */}
        {showCapture && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (newTask.title) {
                await handleCreateTask();
                setShowCapture(false);
              }
            }}
            className="bg-white p-2.5 rounded-[2rem] shadow-2xl border border-[var(--color-zinc-900)]/10 flex items-center gap-2 w-[calc(100vw-3rem)] max-w-[340px] animate-in slide-in-from-bottom-5 fade-in-0 duration-200"
          >
            <Input
              placeholder="Capture a task..."
              className="border-0 shadow-none focus-visible:ring-0 bg-transparent text-base font-medium h-12 px-5"
              value={newTask.title}
              onChange={handleNewTaskChange}
              id="title"
              autoFocus
            />
            <button
              type="submit"
              disabled={isSubmitting || !newTask.title}
              className="w-12 h-12 rounded-full bg-[var(--color-indigo-500)] flex items-center justify-center text-white shrink-0 disabled:opacity-50 transition-transform active:scale-95 shadow-md shadow-indigo-500/20"
            >
              <Plus className="w-6 h-6" />
            </button>
          </form>
        )}

        {/* The Mobile Mockup FAB */}
        <button
          onClick={() => setShowCapture(!showCapture)}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 z-50 ${showCapture ? 'bg-[var(--color-zinc-900)] rotate-45' : 'bg-[var(--color-orange-600)]'}`}
        >
          <Plus className={`w-8 h-8 text-white transition-opacity`} />
        </button>
      </div>

      {/* Dim overlay when capture is open on mobile */}
      {showCapture && (
        <div className="fixed inset-0 bg-[var(--color-zinc-900)]/20 backdrop-blur-sm z-40 transition-opacity" onClick={() => setShowCapture(false)} />
      )}
    </div>
  )
}

export const DashboardPageContent = withAuth(DashboardPageContentBase)
