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
      className="bg-card rounded-2xl p-6 shadow-sm border border-border/40"
    >
      <div className="flex items-center gap-2 mb-4">
        <section.icon className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold text-foreground font-heading tracking-tight">{section.title}</h3>
      </div>
      <div className="space-y-3">
        {section.items.map((item) => (
          <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-border/20 last:border-0 hover:bg-muted/30 px-2 -mx-2 rounded-lg transition-colors">
            <span className="text-foreground/80 font-medium">{item.label}</span>
            {item.type === "toggle" ? (
              <Switch onCheckedChange={item.action} />
            ) : (
              <button
                onClick={item.action}
                className="text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
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
