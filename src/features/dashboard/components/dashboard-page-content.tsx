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
    <div className="bg-background min-h-[calc(100vh-4rem)] pb-32 pt-2 md:pt-4 relative isolate">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header matching Mobile Mockup */}
        <div className="flex items-center justify-between mb-2 mt-2">
          <div className="flex items-center gap-2.5">
            <div className="bg-card p-2.5 rounded-2xl shadow-sm border border-border/40">
              <AgendosIcon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl md:text-2xl font-bold text-foreground leading-tight flex items-center gap-2">
                  Hello, {user.fullname?.split(' ')[0]}
                </h1>
              </div>
              <p className="text-sm font-medium text-muted-foreground mt-0.5">{dateString}</p>
            </div>
          </div>
          <button className="w-12 h-12 rounded-full bg-card border border-border/40 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow text-muted-foreground hover:text-foreground">
            <Bell className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Card: Streak & Tracking (Blue Gradient) */}
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-6 shadow-xl shadow-primary/20 mb-8 border border-primary/20">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm shadow-inner">
                <Flame className="w-6 h-6 text-orange-400 drop-shadow-sm" />
              </div>
              <span className="text-white font-bold text-xl md:text-2xl tracking-tight drop-shadow-sm">Productivity Pulse</span>
            </div>
            <span className="text-white text-sm font-bold tracking-wide bg-black/20 px-3.5 py-1.5 rounded-full shadow-inner">{completedTodayCount} tasks done</span>
          </div>
          <div className="flex gap-2.5 mt-2">
            {/* Dynamic mockup streak array */}
            {[...Array(7)].map((_, i) => (
              <div key={i} className={`flex-1 h-3 rounded-full ${i < 5 ? "bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.6)]" : "bg-black/20 dark:bg-white/10"}`} />
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
                  <h2 className="text-lg font-bold text-foreground flex items-center font-heading tracking-tight">
                    <Flame className="w-5 h-5 mr-2 text-orange-500" /> Urgent Tasks
                  </h2>
                </div>
                <div className="space-y-3">
                  {highPriorityTasks.map((task) => (
                    <div key={task.id} className="bg-card rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-border/40 hover:border-primary/40 transition-colors cursor-pointer group" onClick={() => toggleTaskStatus(task.id, task.status)}>
                      {task.status === 'completed' ? (
                        <CheckCircle2 className="w-7 h-7 text-primary flex-shrink-0" />
                      ) : (
                        <Circle className="w-7 h-7 text-muted-foreground/30 flex-shrink-0 group-hover:text-primary/70 transition-colors" />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className={`block truncate text-base font-semibold transition-colors ${task.status === 'completed' ? "line-through text-muted-foreground" : "text-card-foreground group-hover:text-primary"}`}>
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
              <div className="flex items-center justify-between mb-4 px-1 mt-2">
                <h2 className="text-lg font-bold text-foreground font-heading tracking-tight">Tasks</h2>
                <a href="/tasks" className="text-primary text-sm font-bold hover:underline">View All</a>
              </div>

              {/* Progress Mini Card */}
              <div className="bg-card rounded-2xl p-5 mb-5 shadow-sm border border-border/60 hover:border-border transition-colors">
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-foreground/80 text-xs font-extrabold tracking-widest uppercase">Today's Progress</span>
                  <span className="text-primary font-black text-lg drop-shadow-sm">{completedTodayCount} / {tasks.length} tasks</span>
                </div>
                <div className="w-full bg-muted shadow-inner h-4 rounded-full overflow-hidden border border-border/40">
                  <div className="bg-primary h-4 rounded-full transition-all duration-700 ease-out shadow-md relative overflow-hidden" style={{ width: `${progressPercentage}%` }}>
                     <div className="absolute inset-0 bg-white/20 w-full h-full" style={{ backgroundImage: "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)", backgroundSize: "1rem 1rem" }}></div>
                  </div>
                </div>
              </div>

              {/* Subtask mapping */}
              <div className="space-y-3">
                {activeTasks.filter(t => t.urgency !== "high").slice(0, 6).map((task) => (
                  <div key={task.id} className="bg-card rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-border/40 hover:border-border transition-colors cursor-pointer group" onClick={() => toggleTaskStatus(task.id, task.status)}>
                    {task.status === 'completed' ? (
                      <CheckCircle2 className="w-7 h-7 text-primary flex-shrink-0" />
                    ) : (
                      <Circle className="w-7 h-7 text-muted-foreground/30 flex-shrink-0 group-hover:text-primary/70 transition-colors" />
                    )}
                    <span className={`flex-1 truncate text-base font-semibold group-hover:text-primary transition-colors ${task.status === 'completed' ? "line-through text-muted-foreground" : "text-card-foreground"}`}>
                      {task.title}
                    </span>
                  </div>
                ))}

                {activeTasks.length === 0 && (
                  <div className="bg-card/50 rounded-3xl p-10 text-center border-2 border-dashed border-border mt-6">
                    <CheckCircle2 className="w-12 h-12 text-primary/40 mx-auto mb-4" />
                    <p className="font-bold text-lg text-foreground">All caught up!</p>
                    <p className="font-medium text-muted-foreground mt-1.5">Hit the plus button below to add tasks.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Utilities */}
          <div className="lg:col-span-5 space-y-8 mt-2 lg:mt-0">

            {/* Focus Timer Redesign (Dark Inverse) */}
            <div className="bg-zinc-950 dark:bg-card rounded-3xl p-8 shadow-xl relative overflow-hidden text-center md:text-left border border-zinc-800 dark:border-border/40">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
              <div className="relative z-10 text-zinc-50 dark:text-foreground">
                <h3 className="font-bold text-xs text-zinc-400 dark:text-muted-foreground tracking-widest uppercase flex items-center justify-center md:justify-start mb-8">
                  <Clock className="w-4 h-4 mr-2 text-primary" /> Focus Session
                </h3>
                <div className="text-6xl font-light tracking-tighter mb-10 font-sans text-white dark:text-foreground">
                  25:00
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-zinc-800 hover:bg-zinc-700 dark:bg-secondary dark:hover:bg-secondary/80 text-white dark:text-foreground text-sm font-bold py-3 px-5 rounded-xl transition-colors backdrop-blur-sm border border-zinc-700 dark:border-border">25m</button>
                  <button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold py-3 px-8 rounded-xl transition-colors flex-1 flex items-center justify-center shadow-lg shadow-primary/20 border border-primary/20">
                    Start Timer
                  </button>
                </div>
              </div>
            </div>

            {/* Upcoming Events Mock */}
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4 px-1 font-heading tracking-tight mt-2">
                Schedule
              </h2>
              <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/40 space-y-5">

                <div className="flex gap-4 items-start group relative">
                  <div className="absolute left-[20px] top-6 bottom-[-20px] w-px bg-border z-0"></div>
                  <div className="w-10 text-center shrink-0 relative z-10 pt-0.5">
                    <div className="text-sm font-bold text-muted-foreground">09:00</div>
                  </div>
                  <div className="flex-1 bg-secondary/50 hover:bg-secondary rounded-xl p-3.5 relative z-10 border-l-[3px] border-primary transition-colors cursor-pointer">
                    <p className="text-base font-bold text-foreground">Team Standup</p>
                    <p className="text-xs text-muted-foreground font-semibold mt-1 flex items-center"><Calendar className="w-3 h-3 mr-1" /> Google Meet</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group relative">
                  <div className="w-10 text-center shrink-0 relative z-10 pt-0.5">
                    <div className="text-sm font-bold text-muted-foreground">14:00</div>
                  </div>
                  <div className="flex-1 bg-secondary/50 hover:bg-secondary rounded-xl p-3.5 relative z-10 border-l-[3px] border-orange-500 transition-colors cursor-pointer">
                    <p className="text-base font-bold text-foreground">Client Review</p>
                    <p className="text-xs text-muted-foreground font-semibold mt-1 flex items-center"><Calendar className="w-3 h-3 mr-1" /> Zoom Link</p>
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
            className="bg-card p-2 rounded-2xl shadow-2xl border border-border/50 flex items-center gap-2 w-[calc(100vw-3rem)] max-w-[340px] animate-in slide-in-from-bottom-5 fade-in-0 duration-200"
          >
            <Input
              placeholder="Capture a task..."
              className="border-0 shadow-none focus-visible:ring-0 bg-transparent text-base font-medium h-12 px-4 flex-1 text-foreground"
              value={newTask.title}
              onChange={handleNewTaskChange}
              id="title"
              autoFocus
            />
            <button
              type="submit"
              disabled={isSubmitting || !newTask.title}
              className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shrink-0 disabled:opacity-50 transition-transform active:scale-95 shadow-md shadow-primary/20"
            >
              <Plus className="w-6 h-6" />
            </button>
          </form>
        )}

        {/* The Mobile Mockup FAB */}
        <button
          onClick={() => setShowCapture(!showCapture)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 z-50 ${showCapture ? 'bg-secondary text-secondary-foreground rotate-45 border border-border' : 'bg-primary text-primary-foreground shadow-primary/30'}`}
        >
          <Plus className={`w-7 h-7 transition-opacity`} />
        </button>
      </div>

      {/* Dim overlay when capture is open on mobile */}
      {showCapture && (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 transition-opacity" onClick={() => setShowCapture(false)} />
      )}
    </div>
  )
}

export const DashboardPageContent = withAuth(DashboardPageContentBase)
