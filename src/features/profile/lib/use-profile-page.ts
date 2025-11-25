"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers"
import { LucideIcon, User, Shield, Bell } from "lucide-react"

// Type definitions for our data-driven sections
type ProfileSectionItem = {
  label: string
  action: () => void
} & ({ type: "navigation" } | { type: "toggle" })

interface ProfileSection {
  title: string
  icon: LucideIcon
  items: ProfileSectionItem[]
}

export function useProfilePage() {
  const { user, isLoading, accessToken } = useAuth()
  const router = useRouter()
  const [comingSoonOpen, setComingSoonOpen] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState("")
  const [editProfileOpen, setEditProfileOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && !accessToken) {
      router.replace("auth/login")
    }
  }, [isLoading, accessToken, router])

  const handleFeatureClick = (featureName: string) => {
    setSelectedFeature(featureName)
    setComingSoonOpen(true)
  }

  const profileSections: ProfileSection[] = [
    {
      title: "Account",
      icon: User,
      items: [{ type: "navigation", label: "Privacy Settings", action: () => handleFeatureClick("Privacy Settings") }],
    },
    {
      title: "Security",
      icon: Shield,
      items: [{ type: "navigation", label: "Change Password", action: () => handleFeatureClick("Change Password") }],
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [{ type: "toggle", label: "Email Notifications", action: () => handleFeatureClick("Email Notifications Toggle") }],
    },
  ]

  return {
    user,
    isLoading,
    comingSoonOpen,
    selectedFeature,
    editProfileOpen,
    profileSections,
    setComingSoonOpen,
    setSelectedFeature,
    setEditProfileOpen,
    handleFeatureClick,
  }
}
