import { AppShell } from "@/components/layouts/app-shell"
import { SettingsPageContent } from "@/features/settings/components/settings-page-content" // Updated import path

export default function SettingsPage() {
  return (
    <AppShell>
      <SettingsPageContent />
    </AppShell>
  )
}