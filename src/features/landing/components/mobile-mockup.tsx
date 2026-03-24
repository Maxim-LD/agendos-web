import { AgendosIcon } from "@/features/brand/components/logo/AgendosIcon"
import { AgendosWordmark } from "@/features/brand/components/logo/AgendosWordmark"
import { CheckCircle2, Circle, Plus, Flame, Bell } from "lucide-react"

export function MobileMockup() {
  return (
    <div className="w-[375px] h-[812px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-[var(--color-zinc-900)] relative">
      {/* Status Bar */}
      <div className="h-11 bg-white flex items-center justify-between px-8 pt-2">
        <span className="text-sm font-semibold font-sans">9:41</span>
        <div className="flex gap-1">
          <div className="w-4 h-3 bg-[var(--color-zinc-900)] rounded-sm" />
          <div className="w-4 h-3 bg-[var(--color-zinc-900)] rounded-sm" />
          <div className="w-4 h-3 bg-[var(--color-zinc-900)] rounded-sm" />
        </div>
      </div>

      {/* App Content */}
      <div className="px-6 py-4 bg-[var(--color-zinc-50)] h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <AgendosIcon className="w-10 h-10" />
            <div>
              <AgendosWordmark className="text-xl" />
              <p className="text-xs text-[var(--color-zinc-900)]/60">Wednesday, Jan 10</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
              <Bell className="w-5 h-5 text-[var(--color-zinc-900)]" />
            </button>
          </div>
        </div>

        {/* Streak Card */}
        <div className="bg-gradient-to-br from-[var(--color-indigo-500)] to-[var(--color-indigo-500)]/80 rounded-2xl p-5 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-[var(--color-orange-600)]" />
              <span className="text-white font-heading font-bold text-base">12 Day Streak!</span>
            </div>
            <span className="text-white/80 text-sm">Keep it up!</span>
          </div>
          <div className="flex gap-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className={`flex-1 h-2 rounded-full ${i < 5 ? "bg-[var(--color-orange-600)]" : "bg-white/30"}`} />
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl p-5 mb-6 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[var(--color-zinc-900)]/60 text-sm">Today's Progress</span>
            <span className="text-[var(--color-indigo-500)] font-heading font-bold">6/10 tasks</span>
          </div>
          <div className="w-full bg-[var(--color-zinc-50)] h-3 rounded-full overflow-hidden">
            <div className="w-3/5 bg-[var(--color-indigo-500)] h-3 rounded-full" />
          </div>
        </div>

        {/* Tasks */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-heading font-bold text-[var(--color-zinc-900)]" style={{ fontFamily: "var(--font-poppins)" }}>
            Tasks
          </h2>
          <button className="text-[var(--color-indigo-500)] text-sm font-semibold font-sans">View All</button>
        </div>

        <div className="space-y-3">
          {[
            { title: "Morning workout", done: true },
            { title: "Review emails", done: true },
            { title: "Team meeting at 2pm", done: false },
            { title: "Finish report", done: false },
          ].map((task, i) => (
            <div key={i} className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm">
              {task.done ? (
                <CheckCircle2 className="w-6 h-6 text-[var(--color-indigo-500)] flex-shrink-0" />
              ) : (
                <Circle className="w-6 h-6 text-[var(--color-zinc-900)]/20 flex-shrink-0" />
              )}
              <span className={`flex-1 ${task.done ? "line-through text-[var(--color-zinc-900)]/40" : "text-[var(--color-zinc-900)]"}`}>
                {task.title}
              </span>
            </div>
          ))}
        </div>

        {/* FAB */}
        <button className="absolute bottom-8 right-8 w-14 h-14 bg-[var(--color-orange-600)] rounded-full flex items-center justify-center shadow-2xl">
          <Plus className="w-7 h-7 text-white" />
        </button>
      </div>
    </div>
  )
}
