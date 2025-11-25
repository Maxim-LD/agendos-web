import { AppShell } from "@/components/layouts/app-shell"
import { ProfilePageContent } from "@/features/profile/components/profile-page-content" // Updated import path

export default function ProfilePage() {
  return (
    <AppShell>
      <ProfilePageContent />
    </AppShell>
  )
}
