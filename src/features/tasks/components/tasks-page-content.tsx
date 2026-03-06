"use client"

import { Plus, Calendar, Clock, AlertCircle, Flame, Trash2, X, CheckCircle2, Circle, Bell, Search, Loader2, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useAuth } from "@/providers"
import { withAuth } from "@/lib/auth-guard"
import { useTasks } from "../lib/use-tasks"
import { TaskDetailsModal } from "./task-details-modal"
import { useState } from "react"
import { Task } from "@/types/tasks"

const urgencyLevels = {
  low: { icon: Clock, label: "Flexible", description: "No strict deadline", color: "text-teal-500", bg: "bg-teal-50", border: "border-teal-200" },
  medium: { icon: AlertCircle, label: "Upcoming", description: "Due soon", color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200" },
  high: { icon: Flame, label: "Critical", description: "Immediate attention", color: "text-rose-500", bg: "bg-rose-50", border: "border-rose-200" },
}

function TasksPageContentBase() {
  const { user, isLoading } = useAuth()
  const {
    tasks,
    isLoadingTasks,
    error,
    searchQuery,
    setSearchQuery,
    isCreating,
    setIsCreating,
    isSubmitting,
    newTask,
    handleNewTaskChange,
    fetchTasks,
    handleCreateTask,
    handleDeleteTask,
    toggleTaskStatus,
    handleUpdateTask,
  } = useTasks()

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  if (isLoading || !user) return null

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="container mx-auto max-w-5xl px-1 py-0.5">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-charcoal-black">Tasks</h1>
            <p className="text-charcoal-black/60 mt-1">Manage and track your daily goals.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => fetchTasks(true)} title="Refresh tasks">
              <RefreshCcw className={cn("h-4 w-4", isLoadingTasks && "animate-spin")} />
            </Button>
            <Button onClick={() => setIsCreating(true)} className="bg-[#FF7A00] hover:bg-[#E66E00] text-white gap-2">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-4">
          {isLoadingTasks ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : filteredTasks.length === 0 ? (
            tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-12 text-center">
                <div className="mb-4 rounded-full bg-white p-4 shadow-sm">
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No tasks yet</h3>
                <p className="text-sm text-gray-500">Create your first task to get started.</p>
                <Button variant="link" onClick={() => setIsCreating(true)} className="mt-2 text-[#FF7A00]">
                  Create a task
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                <p>No tasks found matching "{searchQuery}"</p>
              </div>
            )
          ) : (
            filteredTasks.map((task) => {
              const urgencyConfig = urgencyLevels[task.urgency] || urgencyLevels.medium
              const UrgencyIcon = urgencyConfig.icon
              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className={cn(
                    "cursor-pointer group flex items-start gap-4 rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md",
                    task.status === "completed" && "bg-gray-50 opacity-75"
                  )}
                >
                  <button onClick={(e) => { e.stopPropagation(); toggleTaskStatus(task.id, task.status); }} className="mt-1 flex-shrink-0 text-gray-400 hover:text-[#00BFA6]">
                    {task.status === "completed" ? <CheckCircle2 className="h-5 w-5 text-[#00BFA6]" /> : <Circle className="h-5 w-5" />}
                  </button>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <h3 className={cn("font-semibold text-gray-900", task.status === "completed" && "line-through text-gray-500")}>
                        {task.title}
                      </h3>
                      <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }} className="h-8 w-8 text-gray-400 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {task.description && <p className="text-sm text-gray-500">{task.description}</p>}
                    <div className="flex items-center gap-3 pt-2 text-xs">
                      <div className={cn("flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium border", urgencyConfig.bg, urgencyConfig.color, urgencyConfig.border)}>
                        <UrgencyIcon className="h-3 w-3" />
                        <span className="capitalize">{task.urgency}</span>
                      </div>
                      {task.due_date && (
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(task.due_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-gray-500 border-l pl-3">
                        <span className="text-xs font-medium">{task.progress_percentage}%</span>
                        <div className="h-1.5 w-12 overflow-hidden rounded-full bg-gray-100">
                          <div className="h-full bg-[#00BFA6]" style={{ width: `${task.progress_percentage}%` }} />
                        </div>
                      </div>
                      {task.reminders && (
                        <Bell className="h-3 w-3 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg space-y-6 rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-charcoal-black">Add New Task</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsCreating(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            {error && (
              <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input id="title" value={newTask.title} onChange={handleNewTaskChange} placeholder="What needs to be done?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" value={newTask.description || ''} onChange={handleNewTaskChange} placeholder="Add details..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="due_date">Due Date</Label>
                  <Input id="due_date" type="date" value={newTask.due_date as string} onChange={handleNewTaskChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency</Label>
                  <select
                    id="urgency"
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newTask.urgency}
                    onChange={handleNewTaskChange}
                  >
                    <option value="low">Low - Flexible</option>
                    <option value="medium">Medium - Upcoming</option>
                    <option value="high">High - Critical</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="energy_required">Energy Required</Label>
                  <select
                    id="energy_required"
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newTask.energy_required}
                    onChange={handleNewTaskChange}
                  >
                    <option value="light">Light</option>
                    <option value="moderate">Moderate</option>
                    <option value="intense">Intense</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="effort_estimate_minutes">Daily Effort (min)</Label>
                  <Input
                    id="effort_estimate_minutes"
                    type="number"
                    min="0"
                    value={newTask.effort_estimate_minutes || ''}
                    onChange={handleNewTaskChange}
                    placeholder="e.g. 30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="progress_interval">Progress Interval</Label>
                  <select
                    id="progress_interval"
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newTask.progress_interval}
                    onChange={handleNewTaskChange}
                  >
                    <option value="once">Once</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <input
                    type="checkbox"
                    id="reminders"
                    className="h-4 w-4 rounded border-gray-300 text-[#FF7A00] focus:ring-[#FF7A00]"
                    checked={newTask.reminders}
                    onChange={handleNewTaskChange}
                  />
                  <Label htmlFor="reminders" className="cursor-pointer">Reminders</Label>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsCreating(false)} disabled={isSubmitting}>Cancel</Button>
                <Button onClick={handleCreateTask} disabled={!newTask.title || isSubmitting} className="bg-[#FF7A00] hover:bg-[#E66E00] text-white">
                  {isSubmitting ? "Creating..." : "Create Task"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTask && (
        <TaskDetailsModal
          task={tasks.find(t => t.id === selectedTask.id) || selectedTask}
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdateTask={handleUpdateTask}
        />
      )}
    </div>
  )
}

export const TasksPageContent = withAuth(TasksPageContentBase)