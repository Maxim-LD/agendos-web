"use client"

import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sparkles } from "lucide-react"
import { AgendosLogo } from "@/features/brand/components/logo/AgendosLogo"

interface ComingSoonModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  featureName?: string
}

export function ComingSoonModal({ open, onOpenChange, featureName = "This feature" }: ComingSoonModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-electric-blue/20 bg-gradient-to-br from-white to-gray-50">
        <DialogHeader className="space-y-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="mx-auto"
          >
            <AgendosLogo className="text-4xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <DialogTitle className="text-xl font-bold text-center flex items-center justify-center gap-2">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 2,
                }}
              >
                <Sparkles className="w-6 h-6 text-vibrant-orange" />
              </motion.div>
              <span className="bg-gradient-to-r from-electric-blue to-vibrant-orange bg-clip-text text-transparent">
                Coming Soon!
              </span>
            </DialogTitle>

            <DialogDescription className="text-center text-sm text-charcoal-black/70">
              {featureName} is currently under development. We're working hard to bring you an amazing experience!
            </DialogDescription>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-2 pt-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
                className="w-2 h-2 rounded-full bg-electric-blue"
              />
            ))}
          </motion.div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
