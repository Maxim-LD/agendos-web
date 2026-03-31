"use client"

import { useState } from "react"
import { AgendosLogo } from "./logo/AgendosLogo"
import { AgendosWordmark } from "./logo/AgendosWordmark"
import { AgendosIcon } from "./logo/AgendosIcon"
import { AgendosColors } from "./color-palette/AgendosColors"
import { AgendosTypography } from "./typography/AgendosTypography"
import { AgendosPersonality } from "./personality/AgendosPersonality"
import { Slider } from "@/components/ui/slider"

export function BrandPageContent() {
  const [progress, setProgress] = useState(85); // State for the progress slider

  return (
    <div className="w-full flex justify-center px-4 py-6">
      <div className="w-full max-w-5xl space-y-16">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-foreground font-montserrat">AGENDOS Brand System</h1>
        <p className="text-base md:text-lg text-center text-muted-foreground font-montserrat">Empowering personal productivity and lifestyle management</p>

      {/* Progress Slider for interactive demo */}
      <div className="max-w-md mx-auto p-6 border border-border/40 rounded-xl bg-secondary/40">
        <label htmlFor="progress-slider" className="block text-sm font-medium text-foreground/90 mb-2">
          Ring Progress: <span className="font-bold text-primary">{progress}%</span>
        </label>
        <Slider
          id="progress-slider"
          min={0}
          max={100}
          step={1}
          value={[progress]}
          onValueChange={(value) => setProgress(value[0])}
        />
      </div>

      <section className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground font-montserrat">Logo Variations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
          {/* Full Logo - Light Background */}
          <div className="w-full flex flex-col items-center space-y-4 p-8 bg-zinc-50 rounded-2xl shadow-sm border border-border/40">
            <AgendosLogo progress={progress} variant="default" className="w-full max-w-[200px]" />
            <p className="text-sm font-medium text-zinc-500">Primary Logo (Light Mode)</p>
          </div>

          {/* Full Logo - Dark Background */}
          <div className="w-full flex flex-col items-center space-y-4 p-8 bg-zinc-950 rounded-2xl shadow-sm border border-zinc-800">
            <AgendosLogo progress={progress} variant="dark" className="w-full max-w-[200px]" />
            <p className="text-sm font-medium text-zinc-400">Primary Logo (Dark Mode)</p>
          </div>

          {/* App Icon */}
          <div className="w-full flex flex-col items-center space-y-4 p-8 bg-primary rounded-2xl shadow-md aspect-square max-w-[150px] justify-center">
            <AgendosIcon progress={progress} variant="light" className="w-2/3" />
            <p className="text-sm font-medium text-primary-foreground">App Icon</p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground font-montserrat">Wordmark</h2>
        <AgendosWordmark className="mx-auto text-4xl" />
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground font-montserrat">Icon Only</h2>
        <AgendosIcon progress={progress} className="mx-auto w-24 h-24" />
      </section>

        <AgendosColors />
        <AgendosTypography />
        <AgendosPersonality />
      </div>
    </div>
  )
}
