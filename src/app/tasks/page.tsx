import { AppShell } from "@/components/layouts/app-shell"
import { TasksPageContent } from "@/features/tasks/components/tasks-page-content" // Updated import path

export default function TasksPage() {
  return (
    <AppShell>
      <TasksPageContent />
    </AppShell>
  )
}