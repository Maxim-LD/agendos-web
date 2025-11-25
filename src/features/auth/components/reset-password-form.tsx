"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, CheckCircle, AlertCircle, Lock, ArrowLeft, Check, X } from "lucide-react"
import { AgendosLogo } from "@/features/brand/components/logo/AgendosLogo"

function PasswordRequirement({ met, label }: { met: boolean; label: string }) {
  return (
    <div className={`flex items-center transition-colors ${met ? "text-green-600" : "text-red-500"}`}>
      {met ? <Check className="w-4 h-4 mr-2" /> : <X className="w-4 h-4 mr-2" />}
      {label}
    </div>
  )
}

export function ResetPasswordFormComponent({
  newPassword,
  confirmPassword,
  showPassword,
  showConfirmPassword,
  isLoading,
  error,
  isPasswordFocused,
  passwordStrength,
  setConfirmPassword,
  setShowPassword,
  setShowConfirmPassword,
  setIsPasswordFocused,
  handlePasswordChange,
  handleSubmit,
}: {
  newPassword: any
  confirmPassword: any
  showPassword: any
  showConfirmPassword: any
  isLoading: any
  error: any
  isPasswordFocused: any
  passwordStrength: any
  setConfirmPassword: any
  setShowPassword: any
  setShowConfirmPassword: any
  setIsPasswordFocused: any
  handlePasswordChange: any
  handleSubmit: any
}) {
  return (
    <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="text-center lg:text-left">
        <h1 className="text-2xl font-bold text-charcoal-black mb-1">Reset Your Password</h1>
        <p className="text-charcoal-black/60 mb-8">Enter and confirm your new password below.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <div className="relative">
            <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter new password" value={newPassword} onChange={handlePasswordChange} onFocus={() => setIsPasswordFocused(true)} onBlur={() => setIsPasswordFocused(false)} required disabled={isLoading} />
            <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)} disabled={isLoading}>
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {isPasswordFocused && newPassword.length > 0 && (
            <div className="mt-2 space-y-1 text-xs">
              <PasswordRequirement label="At least 6 characters" met={passwordStrength.length} />
              <PasswordRequirement label="Contains a letter" met={passwordStrength.letter} />
              <PasswordRequirement label="Contains a number" met={passwordStrength.number} />
              <PasswordRequirement label="Contains a special character" met={passwordStrength.specialChar} />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <div className="relative">
            <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={isLoading} />
            <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowConfirmPassword(!showConfirmPassword)} disabled={isLoading}>
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <Button type="submit" className="w-full bg-[#FF7A00] hover:bg-[#E66E00] text-white font-bold py-3" disabled={isLoading || !newPassword || !confirmPassword}>
          {isLoading ? "Resetting Password..." : "Reset Password"}
        </Button>
        <Button asChild variant="ghost" className="w-full">
          <Link href="/auth/login">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>
        </Button>
      </form>
    </div>
  )
}

export function ResetPasswordSuccess() {
  return (
    <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-charcoal-black">Password Reset Complete</h1>
        <p className="text-charcoal-black/60 mt-2">
          Your password has been successfully updated. You can now log in with your new password.
        </p>
      </div>
      <div className="my-8">
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>Redirecting to login page in a few seconds...</AlertDescription>
        </Alert>
      </div>
      <Button asChild className="w-full bg-[#FF7A00] hover:bg-[#E66E00] text-white font-bold py-3">
        <Link href="/auth/login">Go to Login</Link>
      </Button>
    </div>
  )
}

export function ResetPasswordInvalidLink() {
  return (
    <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-charcoal-black">Invalid Reset Link</h1>
        <p className="text-charcoal-black/60 mt-2">This password reset link is invalid or has expired.</p>
      </div>
      <Button asChild className="w-full mt-8 bg-[#FF7A00] hover:bg-[#E66E00] text-white font-bold py-3">
        <Link href="/auth/forgot-password">Request New Reset Link</Link>
      </Button>
    </div>
  )
}
