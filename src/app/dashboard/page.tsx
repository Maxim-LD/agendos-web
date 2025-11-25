import { AppShell } from "@/components/layouts/app-shell"
import { DashboardPageContent } from "@/features/dashboard/components/dashboard-page-content" // Updated import path

export default function DashboardPage() {
  return (
    <AppShell>
      <DashboardPageContent />
    </AppShell>
  )
}