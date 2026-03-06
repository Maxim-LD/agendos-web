import { useState, useCallback, useEffect } from "react"
import { Task } from "@/types/tasks"
import api from "@/lib/api"
import { useAuth } from "@/providers"
import { useToast } from "@/providers/toast-provider"

const CACHE_KEY = "tasks_cache"

export function useTasks() {
    const { accessToken } = useAuth()
    const { addToast } = useToast()

    // Initialize state with cache if available
    const [tasks, setTasks] = useState<Task[]>(() => {
        if (typeof window !== "undefined") {
            const cached = localStorage.getItem(CACHE_KEY)
            if (cached) {
                try {
                    return JSON.parse(cached)
                } catch (e) {
                    console.error("Failed to parse task cache", e)
                }
            }
        }
        return []
    })
    const [isLoadingTasks, setIsLoadingTasks] = useState(tasks.length === 0)
    const [error, setError] = useState<string | null>(null)

    // UI State
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isCreating, setIsCreating] = useState(false)

    // Form State
    const [newTask, setNewTask] = useState<Partial<Task>>({
        title: "",
        description: "",
        urgency: "medium",
        due_date: "",
        reminders: false,
        effort_estimate_minutes: 0,
        energy_required: "medium",
        progress_interval: "once",
        scheduled_time: "",
    })

    // Handle Form Input Change
    const handleNewTaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value, type } = e.target;

        // For checkboxes
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setNewTask((prev) => ({ ...prev, [id]: checked }));
            return;
        }

        // For numbers
        if (type === 'number') {
            setNewTask((prev) => ({ ...prev, [id]: parseInt(value) || 0 }));
            return;
        }

        setNewTask((prev) => ({ ...prev, [id]: value }));
    }

    const fetchTasks = useCallback(async (force: boolean = false) => {
        if (!accessToken) return;

        // Skip fetch if we have cache, unless forced
        if (!force && typeof window !== "undefined") {
            const cached = localStorage.getItem(CACHE_KEY)
            if (cached) {
                try {
                    const parsed = JSON.parse(cached)
                    if (parsed && Array.isArray(parsed) && parsed.length > 0) {
                        setIsLoadingTasks(false)
                        return // Skip network request entirely
                    }
                } catch (e) {
                    // fallthrough to fetch
                }
            }
        }

        setIsLoadingTasks(true)
        try {
            const res = await api.request('/tasks', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            const respData = await res.json()
            if (res.ok) {
                // Handle nested data structures and individual task objects
                const payload = respData.data || respData;
                const taskArray = Array.isArray(payload) ? payload : (payload ? [payload] : []);
                setTasks(taskArray)
                if (typeof window !== "undefined") {
                    localStorage.setItem(CACHE_KEY, JSON.stringify(taskArray))
                }
            } else {
                addToast(respData.message || "Failed to fetch tasks", "error")
            }
        } catch (error) {
            console.error(error)
            addToast("Failed to load tasks", "error")
        } finally {
            setIsLoadingTasks(false)
        }
    }, [accessToken, addToast])

    useEffect(() => {
        // Prevent double-fetch in React StrictMode if already loading or if tasks exist
        let mounted = true;
        if (mounted) fetchTasks(false);
        return () => { mounted = false; }
    }, [fetchTasks])

    const validateForm = () => {
        if (!newTask.title?.trim()) {
            setError("Title cannot be empty")
            return false
        }

        if (newTask.effort_estimate_minutes && newTask.effort_estimate_minutes < 0) {
            setError("Effort estimate cannot be negative")
            return false
        }

        const validIntervals = ['once', 'daily', 'weekly', 'monthly']
        if (newTask.progress_interval && !validIntervals.includes(newTask.progress_interval)) {
            setError("Progress interval must be one of [once, daily, weekly, monthly]")
            return false
        }

        const validUrgency = ['low', 'medium', 'high']
        if (newTask.urgency && !validUrgency.includes(newTask.urgency)) {
            setError("Urgency must be one of [low, medium, high]")
            return false
        }

        const validEnergy = ['light', 'moderate', 'intense']
        if (newTask.energy_required && !validEnergy.includes(newTask.energy_required)) {
            setError("Energy required must be one of [light, moderate, intense]")
            return false
        }

        return true
    }

    const handleCreateTask = async (): Promise<boolean> => {
        setError(null)
        if (!validateForm()) return false

        setIsSubmitting(true)
        const url = newTask.project_id ? `/tasks/${newTask.project_id}` : `/tasks`
        try {
            const res = await api.request(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    title: newTask.title,
                    description: newTask.description,
                    effort_estimate_minutes: newTask.effort_estimate_minutes,
                    energy_required: newTask.energy_required,
                    reminders: newTask.reminders,
                    due_date: newTask.due_date || null,
                    progress_interval: newTask.progress_interval,
                    urgency: newTask.urgency,
                })
            })
            const result = await res.json()
            if (!res.ok) {
                throw new Error(result.message || "Failed to create task")
            }

            const createdTask = result.data || result;
            setTasks((prev) => {
                const newTasks = [createdTask, ...prev]
                if (typeof window !== "undefined") {
                    localStorage.setItem(CACHE_KEY, JSON.stringify(newTasks))
                }
                return newTasks
            })
            setIsCreating(false)
            setNewTask({ title: "", description: "", urgency: "medium", due_date: "", reminders: false, effort_estimate_minutes: 0, energy_required: "medium", progress_interval: "once", scheduled_time: "" })
            addToast("Task created successfully", "success")

            setIsSubmitting(false)
            return true
        } catch (err: any) {
            console.error(err)
            setError(err.message || "Network error. Failed to create task after retries.")
            addToast("Failed to create task", "error")
            setIsSubmitting(false)
            return false
        }
    }

    const handleDeleteTask = async (id: string) => {
        try {
            const res = await api.request(`/task/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${accessToken}` }
            })
            if (!res.ok) throw new Error("Failed to delete task")
            setTasks((prev) => {
                const newTasks = prev.filter((t) => t.id !== id)
                if (typeof window !== "undefined") {
                    localStorage.setItem(CACHE_KEY, JSON.stringify(newTasks))
                }
                return newTasks
            })
            addToast("Task deleted successfully", "success")
        } catch (error) {
            console.error(error)
            addToast("Failed to delete task", "error")
        }
    }

    const handleUpdateTask = async (id: string, updates: Partial<Task>) => {
        const existingTask = tasks.find(t => t.id === id);
        if (!existingTask) return false;

        // Optimistic update
        setTasks((prev) => {
            const newTasks = prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
            if (typeof window !== "undefined") {
                localStorage.setItem(CACHE_KEY, JSON.stringify(newTasks))
            }
            return newTasks
        });

        try {
            const res = await api.request(`/task/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(updates)
            });
            if (!res.ok) {
                const result = await res.json().catch(() => ({}));
                throw new Error(result.message || "Failed to update task");
            }
            return true;
        } catch (error: any) {
            console.error(error);
            addToast(error.message || "Failed to update task", "error");
            // Revert optimistic update
            setTasks((prev) => {
                const newTasks = prev.map((t) => (t.id === id ? existingTask : t))
                if (typeof window !== "undefined") {
                    localStorage.setItem(CACHE_KEY, JSON.stringify(newTasks))
                }
                return newTasks
            });
            return false;
        }
    };

    const toggleTaskStatus = (id: string, currentStatus: Task["status"]) => {
        const newStatus = currentStatus === "completed" ? "not_started" : "completed";
        handleUpdateTask(id, { status: newStatus });
    }

    return {
        tasks,
        isLoadingTasks,
        error,
        searchQuery,
        setSearchQuery,
        isCreating,
        setIsCreating,
        isSubmitting,
        newTask,
        setNewTask,
        handleNewTaskChange,
        fetchTasks,
        handleCreateTask,
        handleDeleteTask,
        toggleTaskStatus,
        handleUpdateTask
    }
}
