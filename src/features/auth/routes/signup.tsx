"use client"

import { AgendosLogo } from "@/features/brand/components/logo/AgendosLogo"
import { AgendosIcon } from "@/features/brand/components/logo/AgendosIcon"
import { SignupForm } from "../components/signup-form"

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen bg-background flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      <div className="w-full max-w-6xl">
        <div className="flex justify-center items-center gap-3 mb-8">
          <AgendosLogo className="text-3xl" href="/" />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 w-full">
          <SignupForm />

          {/* Right side: Icon and Text */}
          <div className="hidden lg:flex flex-col items-center text-center text-foreground max-w-sm">
            <div className="bg-primary/10 p-8 rounded-full mb-8">
              <AgendosIcon className="w-32 h-32 text-primary" variant="light" />
            </div>
            <h2 className="text-3xl font-bold font-heading">Create Your Account</h2>
            <p className="text-muted-foreground mt-2">Join a community of productive individuals and take control of your day.</p>
          </div>
        </div>
      </div>
    </div>
  )
}