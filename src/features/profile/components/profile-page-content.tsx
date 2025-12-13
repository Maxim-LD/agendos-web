"use client"

import { Loader2 } from "lucide-react"
import { ComingSoonModal } from "@/components/ui/coming-soon-modal"
import { EditProfileModal } from "@/features/profile/components/edit-profile-modal"
import { ProfileHeader } from "@/features/profile/components/profile-header"
import { VerificationSection } from "@/features/profile/components/verification-section"
import { SettingsSection } from "@/features/profile/components/settings-section"
import { useProfilePage } from "@/features/profile/lib/use-profile-page"

export function ProfilePageContent() {
  const {
    user,
    isLoading,
    comingSoonOpen,
    selectedFeature,
    editProfileOpen,
    profileSections,
    setComingSoonOpen,
    setEditProfileOpen,
    handleFeatureClick,
  } = useProfilePage()

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-electric-blue" />
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto max-w-5xl px-4 py-6">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-charcoal-black">Profile</h1>
            <p className="text-charcoal-black/60 mt-1">Manage your account</p>
          </div>

        {/* Profile Card */}
        <ProfileHeader user={user} onEditClick={() => setEditProfileOpen(true)} />

        {/* Verification Status */}
        <VerificationSection user={user} />

        {/* Profile Settings Sections */}
        <div className="space-y-4">
            {profileSections.map((section, index) => (
              <SettingsSection key={section.title} section={section} index={index} />
            ))}
          </div>
        </div>
      </div>
      <ComingSoonModal open={comingSoonOpen} onOpenChange={setComingSoonOpen} featureName={selectedFeature} />
      <EditProfileModal open={editProfileOpen} onOpenChange={setEditProfileOpen} onSave={() => { setEditProfileOpen(false); handleFeatureClick("Saving Profile") }} />
    </>
  )
}
