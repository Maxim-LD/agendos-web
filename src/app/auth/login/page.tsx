"use client"

import Link from "next/link"
import { AgendosLogo } from "@/features/brand/components/logo/AgendosLogo"
import { AgendosIcon } from "@/features/brand/components/logo/AgendosIcon"
import { LoginForm } from "@/features/auth/components/login-form" // Updated import path
import { GuestGuard } from "@/lib/auth-guard"

export default function LoginPage() {
  return (
    <GuestGuard>
      <div className="relative min-h-screen bg-gradient-to-br from-[#0A1628] to-[#1E3A52] flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 overflow-hidden">
        <div className="w-full max-w-6xl">
          <div className="flex justify-center items-center gap-3 mb-8">
            <AgendosLogo variant="dark" className="text-3xl" href="/" />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 w-full">
            <LoginForm />

            {/* Right side: Icon and Text */}
            <div className="hidden lg:flex flex-col items-center text-center text-white max-w-sm">
              <div className="bg-white/10 p-8 rounded-full mb-8">
                <AgendosIcon className="w-32 h-32 text-white" variant="light" />
              </div>
              <h2 className="text-3xl font-bold">Welcome Back</h2>
              <p className="text-white/70 mt-2">Sign in to continue managing your tasks and achieving your goals.</p>
            </div>
          </div>
        </div>
      </div>
    </GuestGuard>
  )
}