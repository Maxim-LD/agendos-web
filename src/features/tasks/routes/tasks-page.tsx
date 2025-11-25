import { AppShell } from "@/components/layouts/app-shell"
import { TasksPageContent } from "../components/tasks-page-content"

export default function TasksPage() {
  return (
    <AppShell>
      <TasksPageContent />
    </AppShell>
  )
}