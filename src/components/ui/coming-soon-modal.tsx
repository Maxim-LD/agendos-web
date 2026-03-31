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
      <DialogContent className="sm:max-w-md border-border/40 bg-card shadow-2xl rounded-2xl">
        <DialogHeader className="space-y-5 px-2 py-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mx-auto bg-primary/10 p-4 rounded-full border border-primary/20"
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <DialogTitle className="text-2xl font-bold font-heading text-center flex flex-col items-center gap-2 tracking-tight">
              Work In Progress
            </DialogTitle>

            <DialogDescription className="text-center text-sm font-medium text-muted-foreground max-w-sm mx-auto leading-relaxed">
              <span className="text-foreground font-semibold">{featureName}</span> is currently under development. We're actively building this function to bring you a better experience.
            </DialogDescription>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-2.5 pt-4"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                className="w-2.5 h-2.5 rounded-full bg-primary/80"
              />
            ))}
          </motion.div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
