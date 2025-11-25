"use client"

import { Loader2, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ComingSoonModal } from "@/components/ui/coming-soon-modal"
import { useSettingsPage } from "@/features/settings/lib/use-settings-page"
import { SettingsSectionComponent } from "@/features/settings/components/settings-section"

export function SettingsPageContent() {
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
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-electric-blue" />
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-charcoal-black">Settings</h1>
          <p className="text-charcoal-black/60 mt-1">Manage your setup and preferences</p>
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
            className="w-full justify-between bg-transparent"
            onClick={() => handleFeatureClick("Help & Support")}
          >
            <span className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-charcoal-black/70" />
              Help & Support
            </span>
            <span className="text-electric-blue hover:text-electric-blue/80 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </span>
          </Button>
        </motion.div>
      </div>

      <ComingSoonModal open={comingSoonOpen} onOpenChange={setComingSoonOpen} featureName={selectedFeature} />
    </>
  )
}
