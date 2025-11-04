"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail, CheckCircle, AlertCircle, KeyRound } from "lucide-react"
import { toast } from "sonner"
import { AgendosLogo } from "@/components/brand/logo/AgendosLogo"
import { AgendosIcon } from "@/components/brand/logo/AgendosIcon"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forgot-password`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        toast.success("Reset link sent", { description: "Check your mail for password reset instructions." })
      } else {
        const data = await response.json()
        setError(data.message || "Failed to send reset email")
      }
    } catch (error) {
        console.error(error);
        setError("Network error. Please try again.")
    } finally {
        setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-[#0A1628] to-[#1E3A52] flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 overflow-hidden">
        <div className="w-full max-w-6xl">
          <div className="flex justify-center items-center gap-3 mb-8">
            <AgendosLogo variant="dark" className="text-3xl" href="/" />
          </div>
          <div className="flex justify-center">
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
                  onClick={() => {
                    setIsSubmitted(false)
                    setEmail("")
                  }}
                  className="w-full"
                >
                  Try Different Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0A1628] to-[#1E3A52] flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      <div className="w-full max-w-6xl">
        <div className="flex justify-center items-center gap-3 mb-8">
          <AgendosLogo variant="dark" className="text-3xl" href="/" />
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 w-full">
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
