"use client"

import { BrandPageContent } from "../components/brand-page-content"
import Link from "next/link"
import { AgendosIcon } from "../components/logo/AgendosIcon"
import { AgendosWordmark } from "../components/logo/AgendosWordmark"
import { Button } from "@/components/ui/button"

export default function Brand() {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center font-sans">
      {/* Navigation */}
      <nav className="w-full bg-background/80 backdrop-blur-md z-10 sticky top-0 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <AgendosIcon className="w-8 h-8" />
            <AgendosWordmark className="text-2xl" />
          </Link>
          <Link href="/">
            <Button variant="outline">
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      {/* Brand System Content */}
      <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16"><BrandPageContent /></main>
    </div>
  )
}
