"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { ChevronRight, LucideIcon } from "lucide-react"

type ProfileSectionItem = {
  label: string
  action: () => void
} & ({ type: "navigation" } | { type: "toggle" })

interface ProfileSection {
  title: string
  icon: LucideIcon
  items: ProfileSectionItem[]
}

interface SettingsSectionProps {
  section: ProfileSection
  index: number
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({ section, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      <div className="flex items-center gap-2 mb-4">
        <section.icon className="w-5 h-5 text-electric-blue" />
        <h3 className="text-lg font-bold text-charcoal-black">{section.title}</h3>
      </div>
      <div className="space-y-3">
        {section.items.map((item) => (
          <div key={item.label} className="flex items-center justify-between py-2">
            <span className="text-charcoal-black/80">{item.label}</span>
            {item.type === "toggle" ? (
              <Switch onCheckedChange={item.action} />
            ) : (
              <button
                onClick={item.action}
                className="text-electric-blue hover:text-electric-blue/80 transition-colors"
                aria-label={item.label}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
