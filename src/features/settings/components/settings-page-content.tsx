"use client"

import { HelpCircle, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ComingSoonModal } from "@/components/ui/coming-soon-modal"
import { useSettingsPage } from "@/features/settings/lib/use-settings-page"
import { SettingsSectionComponent } from "@/features/settings/components/settings-section"
import { withAuth } from "@/lib/auth-guard"

function SettingsPageContentBase() {
  const {
    user,
    isLoading,
    comingSoonOpen,
    selectedFeature,
    settingsSections,
    setComingSoonOpen,
    handleFeatureClick,
  } = useSettingsPage()

  if (isLoading || !user) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-6">
        <div className="space-y-6">
          <div>
            <Skeleton className="h-9 w-32" />
            <Skeleton className="mt-2 h-5 w-64" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-5xl px-1 py-0.5">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your setup and preferences
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-4">
          {settingsSections.map((section, index) => (
            <SettingsSectionComponent
              key={section.title}
              section={section}
              index={index}
              handleFeatureClick={handleFeatureClick}
            />
          ))}
        </div>

        {/* Additional Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <Button
            variant="outline"
            className="w-full justify-between"
            onClick={() => handleFeatureClick("Help & Support")}
          >
            <span className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
              Help & Support
            </span>
            <span className="text-primary hover:text-primary/80 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </span>
          </Button>
        </motion.div>
      </div>

      <ComingSoonModal
        open={comingSoonOpen}
        onOpenChange={setComingSoonOpen}
        featureName={selectedFeature}
      />
    </div>
  )
}

export const SettingsPageContent = withAuth(SettingsPageContentBase)
