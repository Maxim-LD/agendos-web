"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail, CheckCircle, AlertCircle, KeyRound } from "lucide-react"

export function ForgotPasswordForm({
  email,
  isLoading,
  error,
  setEmail,
  handleSubmit,
}: {
  email: string
  isLoading: boolean
  error: string
  setEmail: (email: string) => void
  handleSubmit: (e: React.FormEvent) => void
}) {
  return (
    <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="text-center lg:text-left">
        <h1 className="text-2xl font-bold text-charcoal-black mb-1">Forgot Password?</h1>
        <p className="text-charcoal-black/60 mb-8">Enter your email and we'll send you a reset link.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <Button type="submit" className="w-full bg-[#FF7A00] hover:bg-[#E66E00] text-white font-bold py-3" disabled={isLoading || !email}>
          {isLoading ? "Sending..." : "Send Reset Link"}
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

export function ForgotPasswordSuccess({
  email,
  handleReset,
}: {
  email: string
  handleReset: () => void
}) {
  return (
    <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-charcoal-black">Check Your Email</h1>
        <p className="text-charcoal-black/60 mt-2">We've sent password reset instructions to {email}</p>
      </div>
      <div className="space-y-4 my-8">
        <Alert>
          <Mail className="h-4 w-4" />
          <AlertDescription>
            If you don't see the email in your inbox, check your spam folder. The link will expire in 24 hours.
          </AlertDescription>
        </Alert>
      </div>
      <div className="flex flex-col space-y-2">
        <Button asChild className="w-full bg-[#FF7A00] hover:bg-[#E66E00] text-white font-bold py-3">
          <Link href="/auth/login">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>
        </Button>
        <Button
          variant="ghost"
          onClick={handleReset}
          className="w-full"
        >
          Try Different Email
        </Button>
      </div>
    </div>
  )
}
