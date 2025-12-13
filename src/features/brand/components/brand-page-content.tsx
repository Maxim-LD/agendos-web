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
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-[#1E1E1E] font-montserrat">AGENDOS Brand System</h1>
        <p className="text-base md:text-lg text-center text-[#6B7280] font-montserrat">Empowering personal productivity and lifestyle management</p>

      {/* Progress Slider for interactive demo */}
      <div className="max-w-md mx-auto p-6 border rounded-lg bg-gray-50">
        <label htmlFor="progress-slider" className="block text-sm font-medium text-gray-700 mb-2">
          Ring Progress: <span className="font-bold text-[#007AFF]">{progress}%</span>
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
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-montserrat">Logo Variations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
          {/* Full Logo - Light Background */}
          <div className="w-full flex flex-col items-center space-y-4 p-8 bg-[#F8F9FA] rounded-xl shadow-md">
            <AgendosLogo progress={progress} variant="default" className="w-full max-w-[200px]" />
            <p className="text-sm text-gray-600">Primary Logo (Light Mode)</p>
          </div>

          {/* Full Logo - Dark Background */}
          <div className="w-full flex flex-col items-center space-y-4 p-8 bg-[#1E1E1E] rounded-xl shadow-md">
            <AgendosLogo progress={progress} variant="dark" className="w-full max-w-[200px]" />
            <p className="text-sm text-gray-400">Primary Logo (Dark Mode)</p>
          </div>

          {/* App Icon */}
          <div className="w-full flex flex-col items-center space-y-4 p-8 bg-[#007AFF] rounded-xl shadow-md aspect-square max-w-[150px] justify-center">
            <AgendosIcon progress={progress} variant="light" className="w-2/3" />
            <p className="text-sm text-white">App Icon</p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-montserrat">Wordmark</h2>
        <AgendosWordmark className="mx-auto text-4xl" />
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-montserrat">Icon Only</h2>
        <AgendosIcon progress={progress} className="mx-auto w-24 h-24" />
      </section>

        <AgendosColors />
        <AgendosTypography />
        <AgendosPersonality />
      </div>
    </div>
  )
}
