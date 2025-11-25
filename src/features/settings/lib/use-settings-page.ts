"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers"
import { Bell, Lock, Palette } from "lucide-react"

export function useSettingsPage() {
  const { user, isLoading, accessToken } = useAuth()
  const router = useRouter()
  const [comingSoonOpen, setComingSoonOpen] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState("")

  useEffect(() => {
    if (!isLoading && !accessToken) {
      router.replace("auth/login")
    }
  }, [isLoading, accessToken, router])

  const handleFeatureClick = (featureName: string) => {
    setSelectedFeature(featureName)
    setComingSoonOpen(true)
  }

  const settingsSections = [
    {
      title: "Notifications",
      icon: Bell,
      items: [
        { label: "Push Notifications", toggle: true },
        { label: "Email Notifications", toggle: true },
        { label: "Task Reminders", toggle: true },
      ],
    },
    {
      title: "Appearance",
      icon: Palette,
      items: [
        { label: "Theme", action: () => handleFeatureClick("Theme Settings") },
        { label: "Language", action: () => handleFeatureClick("Language Settings") },
      ],
    },
    {
      title: "Security",
      icon: Lock,
      items: [
        { label: "Two-Factor Authentication", action: () => handleFeatureClick("2FA") },
        { label: "Connected Devices", action: () => handleFeatureClick("Connected Devices") },
      ],
    },
  ]

  return {
    user,
    isLoading,
    comingSoonOpen,
    selectedFeature,
    settingsSections,
    setComingSoonOpen,
    setSelectedFeature,
    handleFeatureClick,
  }
}
