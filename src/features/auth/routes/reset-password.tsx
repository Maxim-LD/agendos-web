"use client"

import { Suspense } from "react"
import { AgendosLogo } from "@/features/brand/components/logo/AgendosLogo"
import { Lock } from "lucide-react"
import { useResetPasswordForm } from "../lib/use-reset-password-form"
import {
  ResetPasswordFormComponent,
  ResetPasswordSuccess,
  ResetPasswordInvalidLink,
} from "../components/reset-password-form"

function ResetPasswordPageContent() {
  const {
    newPassword,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    isLoading,
    isSuccess,
    error,
    paramsReady,
    resetToken,
    email,
    isPasswordFocused,
    passwordStrength,
    setConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    setIsPasswordFocused,
    handlePasswordChange,
    handleSubmit,
  } = useResetPasswordForm()

  if (isSuccess) {
    return <ResetPasswordSuccess />
  }

  if (paramsReady && (!resetToken || !email)) {
    return <ResetPasswordInvalidLink />
  }

  return (
    <ResetPasswordFormComponent
      newPassword={newPassword}
      confirmPassword={confirmPassword}
      showPassword={showPassword}
      showConfirmPassword={showConfirmPassword}
      isLoading={isLoading}
      error={error}
      isPasswordFocused={isPasswordFocused}
      passwordStrength={passwordStrength}
      setConfirmPassword={setConfirmPassword}
      setShowPassword={setShowPassword}
      setShowConfirmPassword={setShowConfirmPassword}
      setIsPasswordFocused={setIsPasswordFocused}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0A1628] to-[#1E3A52] flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      <div className="w-full max-w-6xl">
        <div className="flex justify-center items-center gap-3 mb-8">
          <AgendosLogo variant="dark" className="text-3xl" href="/" />
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 w-full">
          <Suspense fallback={<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>}>
            <ResetPasswordPageContent />
          </Suspense>
          <div className="hidden lg:flex flex-col items-center text-center text-white max-w-sm">
            <div className="bg-white/10 p-8 rounded-full mb-8">
              <Lock className="w-32 h-32 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Secure Your Account</h2>
            <p className="text-white/70 mt-2">Choose a strong, unique password to keep your account safe.</p>
          </div>
        </div>
      </div>
    </div>
  )
}