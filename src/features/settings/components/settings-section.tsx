"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChevronRight, LucideIcon } from "lucide-react"

interface SettingsSectionItem {
  label: string
  toggle?: boolean
  action?: () => void
}

interface SettingsSectionProps {
  section: {
    title: string
    icon: LucideIcon
    items: SettingsSectionItem[]
  }
  index: number
  handleFeatureClick: (featureName: string) => void
}

export const SettingsSectionComponent: React.FC<SettingsSectionProps> = ({
  section,
  index,
  handleFeatureClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <section.icon className="w-5 h-5 text-primary" />
            {section.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {section.items.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-2"
              >
                <span className="text-muted-foreground">{item.label}</span>
                {item.toggle ? (
                  <Switch
                    onCheckedChange={() => handleFeatureClick(item.label)}
                  />
                ) : (
                  <button
                    onClick={item.action}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
