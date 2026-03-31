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
  low: { icon: Clock, label: "Flexible", description: "No strict deadline", color: "text-teal-600 dark:text-teal-400", bg: "bg-teal-50 dark:bg-teal-500/10", border: "border-teal-200 dark:border-teal-500/20" },
  medium: { icon: AlertCircle, label: "Upcoming", description: "Due soon", color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-500/10", border: "border-orange-200 dark:border-orange-500/20" },
  high: { icon: Flame, label: "Critical", description: "Immediate attention", color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
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
            <h1 className="text-3xl font-bold text-foreground font-heading tracking-tight">Tasks</h1>
            <p className="text-muted-foreground mt-1 text-sm font-medium">Manage and track your daily goals.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => fetchTasks(true)} title="Refresh tasks" className="rounded-full">
              <RefreshCcw className={cn("h-4 w-4 text-muted-foreground", isLoadingTasks && "animate-spin")} />
            </Button>
            <Button onClick={() => setIsCreating(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-full px-5 shadow-sm">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </div>
        </div>

        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 bg-card border-border/60 hover:border-border rounded-xl text-base shadow-sm focus-visible:ring-primary/20"
          />
        </div>

        <div className="grid gap-4">
          {isLoadingTasks ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground/50" />
            </div>
          ) : filteredTasks.length === 0 ? (
            tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/80 bg-muted/40 p-12 text-center animate-in fade-in duration-500">
                <div className="mb-5 rounded-full bg-card p-4 shadow-sm border border-border/60">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground">No tasks yet</h3>
                <p className="text-sm font-medium text-muted-foreground mt-1">Create your first task to get started.</p>
                <Button variant="link" onClick={() => setIsCreating(true)} className="mt-4 text-primary font-bold">
                  Create a task
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground font-medium bg-muted/40 rounded-2xl border border-dashed border-border/80">
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
                    "cursor-pointer group flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-4.5 shadow-sm transition-all hover:shadow-md hover:border-border",
                    task.status === "completed" && "bg-secondary/40 dark:bg-card/60 opacity-90 scale-[0.99]"
                  )}
                >
                  <button onClick={(e) => { e.stopPropagation(); toggleTaskStatus(task.id, task.status); }} className="mt-0.5 flex-shrink-0 text-muted-foreground/30 hover:text-primary transition-colors">
                    {task.status === "completed" ? <CheckCircle2 className="h-6 w-6 text-primary" /> : <Circle className="h-6 w-6" />}
                  </button>
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className={cn("font-bold text-base text-foreground truncate transition-colors", task.status === "completed" && "line-through text-muted-foreground")}>
                        {task.title}
                      </h3>
                      <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }} className="h-8 w-8 text-muted-foreground/40 shrink-0 opacity-0 transition-all hover:text-destructive group-hover:opacity-100 hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {task.description && <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>}
                    <div className="flex flex-wrap items-center gap-3 pt-2.5 text-xs font-semibold">
                      <div className={cn("flex items-center gap-1.5 rounded-md px-2 py-0.5 font-bold border", urgencyConfig.bg, urgencyConfig.color, urgencyConfig.border)}>
                        <UrgencyIcon className="h-3.5 w-3.5" />
                        <span className="capitalize">{task.urgency}</span>
                      </div>
                      {task.due_date && (
                        <div className="flex items-center gap-1.5 text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-md border border-border/30">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{new Date(task.due_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-muted-foreground border-l border-border/60 pl-3">
                        <span className="text-xs font-bold">{task.progress_percentage}%</span>
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary border border-border/40">
                          <div className="h-full bg-primary transition-all rounded-full" style={{ width: `${task.progress_percentage}%` }} />
                        </div>
                      </div>
                      {task.reminders && (
                        <Bell className="h-3.5 w-3.5 text-primary ml-auto" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg space-y-6 rounded-3xl bg-card border border-border/40 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground font-heading">Add New Task</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsCreating(false)} className="rounded-full hover:bg-secondary text-muted-foreground">
                <X className="h-5 w-5" />
              </Button>
            </div>
            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-destructive/10 p-3.5 text-sm font-semibold text-destructive border border-destructive/20">
                <AlertCircle className="h-4 w-4 shrink-0" />
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
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
                    checked={newTask.reminders}
                    onChange={handleNewTaskChange}
                  />
                  <Label htmlFor="reminders" className="cursor-pointer font-semibold text-muted-foreground">Reminders</Label>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-border/20">
                <Button variant="ghost" onClick={() => setIsCreating(false)} disabled={isSubmitting}>Cancel</Button>
                <Button onClick={handleCreateTask} disabled={!newTask.title || isSubmitting} className="rounded-xl px-6 min-w-32">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Task"}
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