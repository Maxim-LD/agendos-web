import { Task } from "@/types/tasks"
import { Button } from "@/components/ui/button"
import { X, Calendar, Clock, AlertCircle, Flame, CheckCircle2, Circle, Activity, Map, Zap, Timer } from "lucide-react"
import { cn } from "@/lib/utils"

interface TaskDetailsModalProps {
    task: Task
    isOpen: boolean
    onClose: () => void
    onUpdateTask: (id: string, updates: Partial<Task>) => Promise<boolean>
}

const urgencyConfig = {
    low: { icon: Clock, label: "Flexible", color: "text-teal-500", bg: "bg-teal-50", border: "border-teal-200" },
    medium: { icon: AlertCircle, label: "Upcoming", color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200" },
    high: { icon: Flame, label: "Critical", color: "text-rose-500", bg: "bg-rose-50", border: "border-rose-200" },
}

const energyConfig: Record<string, { icon: any, label: string, color: string, bg: string }> = {
    low: { icon: Zap, label: "Low", color: "text-blue-500", bg: "bg-blue-50" },
    medium: { icon: Activity, label: "Medium", color: "text-indigo-500", bg: "bg-indigo-50" },
    high: { icon: Flame, label: "High", color: "text-purple-500", bg: "bg-purple-50" },
    light: { icon: Zap, label: "Light", color: "text-blue-500", bg: "bg-blue-50" },
    moderate: { icon: Activity, label: "Moderate", color: "text-indigo-500", bg: "bg-indigo-50" },
    intense: { icon: Flame, label: "Intense", color: "text-purple-500", bg: "bg-purple-50" },
}

export function TaskDetailsModal({ task, isOpen, onClose, onUpdateTask }: TaskDetailsModalProps) {
    if (!isOpen) return null

    const urgency = urgencyConfig[task.urgency as keyof typeof urgencyConfig] || urgencyConfig.medium
    const energy = energyConfig[task.energy_required as string] || energyConfig.moderate

    const handleToggleStatus = () => {
        const newStatus = task.status === "completed" ? "not_started" : "completed"
        onUpdateTask(task.id, { status: newStatus })
    }

    const handleProgressUpdate = (increment: number) => {
        const currentProgress = typeof task.progress_percentage === 'number' ? task.progress_percentage : 0;
        const newProgress = Math.min(100, Math.max(0, currentProgress + increment))
        if (newProgress === currentProgress) return;

        const updates: Partial<Task> = { progress_percentage: newProgress }
        if (newProgress === 100 && task.status !== "completed") {
            updates.status = "completed"
        } else if (newProgress < 100 && task.status === "completed") {
            updates.status = "not_started"
        }
        onUpdateTask(task.id, updates)
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
            <div
                className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Ribbon */}
                <div className={cn("h-2 w-full", task.status === 'completed' ? 'bg-[#00BFA6]' : 'bg-[#FF7A00]')} />

                <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <button
                                onClick={handleToggleStatus}
                                className="mt-1 flex-shrink-0 text-gray-400 hover:text-[#00BFA6] transition-colors"
                                title={task.status === "completed" ? "Mark as not started" : "Mark as completed"}
                            >
                                {task.status === "completed" ? (
                                    <CheckCircle2 className="h-8 w-8 text-[#00BFA6]" />
                                ) : (
                                    <Circle className="h-8 w-8 hover:fill-teal-50" />
                                )}
                            </button>
                            <div>
                                <h2 className={cn("text-2xl font-bold text-gray-900", task.status === "completed" && "line-through text-gray-400")}>
                                    {task.title}
                                </h2>
                                {task.description && (
                                    <p className="mt-2 text-gray-600 leading-relaxed text-sm">
                                        {task.description}
                                    </p>
                                )}
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-gray-900 bg-gray-50 rounded-full">
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-5">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Attributes</h4>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className={cn("p-2 rounded-lg", urgency.bg, urgency.color)}>
                                        <urgency.icon className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Urgency</p>
                                        <p className="text-sm font-medium text-gray-900">{urgency.label}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={cn("p-2 rounded-lg", energy.bg, energy.color)}>
                                        <energy.icon className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Energy</p>
                                        <p className="text-sm font-medium text-gray-900">{energy.label}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-5">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Timeline</h4>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                                        <Calendar className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Due Date</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {task.due_date ? new Date(task.due_date).toLocaleDateString() : "No due date"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                                        <Timer className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Effort Estimate</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {task.effort_estimate_minutes ? `${task.effort_estimate_minutes} mins` : "Unestimated"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Visualizer */}
                    <div className="mt-6 rounded-xl border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                <Map className="h-4 w-4 text-gray-400" />
                                Completion Progress
                            </h4>
                            <span className="text-sm font-bold text-[#00BFA6] bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
                                {task.progress_percentage || 0}%
                            </span>
                        </div>

                        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 shadow-inner">
                            <div
                                className="h-full bg-gradient-to-r from-[#00BFA6] to-teal-400 transition-all duration-500 ease-out"
                                style={{ width: `${task.progress_percentage || 0}%` }}
                            />
                        </div>

                        <div className="mt-6 flex items-center justify-between gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleProgressUpdate(-25)}
                                disabled={task.progress_percentage === 0}
                                className="text-xs px-4"
                            >
                                -25%
                            </Button>
                            <div className="flex-1 flex justify-center">
                                <Button
                                    onClick={handleToggleStatus}
                                    className={cn(
                                        "w-full max-w-[240px] shadow-sm font-semibold transition-all",
                                        task.status === "completed"
                                            ? "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
                                            : "bg-[#FF7A00] hover:bg-[#E66E00] text-white"
                                    )}
                                >
                                    {task.status === "completed" ? "Reopen Task" : "Mark as Completed"}
                                </Button>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleProgressUpdate(25)}
                                disabled={(task.progress_percentage || 0) >= 100}
                                className="text-xs px-4"
                            >
                                +25%
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
