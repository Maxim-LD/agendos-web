"use client"

import { AgendosLogo } from "@/features/brand/components/logo/AgendosLogo"
import { KeyRound } from "lucide-react"
import { useForgotPasswordForm } from "@/features/auth/lib/use-forgot-password-form" // Updated import path
import { ForgotPasswordForm, ForgotPasswordSuccess } from "@/features/auth/components/forgot-password-form" // Updated import path

export default function ForgotPasswordPage() {
  const {
    email,
    isLoading,
    isSubmitted,
    error,
    setEmail,
    handleSubmit,
    handleReset,
  } = useForgotPasswordForm()

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0A1628] to-[#1E3A52] flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      <div className="w-full max-w-6xl">
        <div className="flex justify-center items-center gap-3 mb-8">
          <AgendosLogo variant="dark" className="text-3xl" href="/" />
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 w-full">
          {isSubmitted ? (
            <ForgotPasswordSuccess email={email} handleReset={handleReset} />
          ) : (
            <ForgotPasswordForm
              email={email}
              isLoading={isLoading}
              error={error}
              setEmail={setEmail}
              handleSubmit={handleSubmit}
            />
          )}
          <div className="hidden lg:flex flex-col items-center text-center text-white max-w-sm">
            <div className="bg-white/10 p-8 rounded-full mb-8">
              <KeyRound className="w-32 h-32 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Account Recovery</h2>
            <p className="text-white/70 mt-2">Regain access to your account securely. We're here to help you get back on track.</p>
          </div>
        </div>
      </div>
    </div>
  )
}