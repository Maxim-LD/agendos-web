"use client"

import { ComingSoonModal } from "@/components/ui/coming-soon-modal"
import { Skeleton } from "@/components/ui/skeleton"
import { EditProfileModal } from "@/features/profile/components/edit-profile-modal"
import { ProfileHeader } from "@/features/profile/components/profile-header"
import { VerificationSection } from "@/features/profile/components/verification-section"
import { SettingsSection } from "@/features/profile/components/settings-section"
import { AccountDetailsSection } from "@/features/profile/components/account-details-section"
import { useProfilePage } from "@/features/profile/lib/use-profile-page"
import { withAuth } from "@/lib/auth-guard"

function ProfilePageContentBase() {
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
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <div className="space-y-6">
          <div>
            <Skeleton className="h-9 w-32" />
            <Skeleton className="mt-2 h-5 w-48" />
          </div>
          <div className="flex items-center gap-6 rounded-xl border p-6">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-48 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto max-w-4xl px-4 py-6 md:py-8">
        <div className="space-y-6 max-w-3xl mx-auto">
          {/* Header text removed in favor of the hero card, or can be kept subtle */}
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-charcoal-black">Profile</h1>
            <p className="text-charcoal-black/60 mt-1">Manage your account and privacy</p>
          </div>

          {/* Profile Card */}
          <ProfileHeader user={user} onEditClick={() => setEditProfileOpen(true)} />

          {/* Account Details */}
          <AccountDetailsSection user={user} />

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
      <EditProfileModal open={editProfileOpen} onOpenChange={setEditProfileOpen} onSave={() => { setEditProfileOpen(false); handleFeatureClick("Saving Profile") }} user={user} />
    </>
  )
}

export const ProfilePageContent = withAuth(ProfilePageContentBase)
