"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ComingSoonModal } from "@/components/ui/coming-soon-modal"
import { GoogleIcon } from "@/components/icons/google-icon"
import { FacebookIcon } from "@/components/icons/facebook-icon"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, AlertCircle } from "lucide-react"
import { useLoginForm } from "../lib/use-login-form"

export function LoginForm() {
  const {
    formData,
    isLoading,
    formError,
    showPassword,
    handleChange,
    handleSubmit,
    setShowPassword,
  } = useLoginForm()

  const [comingSoonOpen, setComingSoonOpen] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState("")

  const handleSocialLoginClick = (provider: string) => {
    setSelectedFeature(`${provider} Login`)
    setComingSoonOpen(true)
  }

  return (
    <>
      <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl font-bold text-charcoal-black mb-1">Welcome Back!</h1>
          <p className="text-charcoal-black/60 mb-8">Sign in to continue your journey.</p>
        </div>

        {formError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="identifier">Email or Phone Number</Label>
            <Input
              id="identifier"
              name="identifier"
              type="text"
              placeholder="email@example.com or 080123..."
              className="placeholder:text-charcoal-black/40"
              value={formData.identifier}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="placeholder:text-charcoal-black/40"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
              Forgot password?
            </Link>
          </div>
          
          <Button type="submit" className="w-full bg-[#FF7A00] hover:bg-[#E66E00] text-white font-bold py-3" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-charcoal-black/60">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => handleSocialLoginClick("Google")}>
            <GoogleIcon className="w-5 h-5" />
            Google
          </Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={() => handleSocialLoginClick("Facebook")}>
            <FacebookIcon className="w-5 h-5" />
            Facebook
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-charcoal-black/60">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="font-semibold text-electric-blue hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
      <ComingSoonModal open={comingSoonOpen} onOpenChange={setComingSoonOpen} featureName={selectedFeature} />
    </>
  )
}
