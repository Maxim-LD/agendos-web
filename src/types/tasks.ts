export type EnergyRequired = "light" | "moderate" | "intense";
export type TaskStatus = "not_started" | "ongoing" | "completed";
export type ProgressInterval = "once" | "daily" | "weekly" | "monthly";
export type Urgency = "low" | "medium" | "high";

export interface Task {
    id: string
    project_id?: string | null,
    title: string,
    description?: string | null,
    status: TaskStatus,
    reminders: boolean,
    effort_estimate_minutes: number
    progress_percentage: number
    progress_interval: ProgressInterval
    due_date?: Date | string | null
    scheduled_time?: Date | string | null
    urgency: Urgency
    energy_required: EnergyRequired
    is_active: boolean
}