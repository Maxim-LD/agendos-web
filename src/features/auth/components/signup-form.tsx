"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ComingSoonModal } from "@/components/ui/coming-soon-modal"
import { GoogleIcon } from "@/components/icons/google-icon"
import { FacebookIcon } from "@/components/icons/facebook-icon"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, AlertCircle, Check, X } from "lucide-react"
import { useSignupForm } from "../lib/use-signup-form"

export function SignupForm() {
  const {
    formData,
    isLoading,
    formError,
    showPassword,
    showConfirmPassword,
    isPasswordFocused,
    passwordStrength,
    handleChange,
    handleSubmit,
    handlePasswordChange,
    setShowPassword,
    setShowConfirmPassword,
    setIsPasswordFocused,
  } = useSignupForm()
  const router = useRouter()

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
          <h1 className="text-2xl font-bold text-charcoal-black mb-1">Get Started</h1>
          <p className="text-charcoal-black/60 mb-8">It's free to sign up and only takes a minute.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="John Doe"
                value={formData.fullname}
                className="placeholder:text-charcoal-black/40"
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                className="placeholder:text-charcoal-black/40"
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  className="placeholder:text-charcoal-black/40"
                  onChange={handlePasswordChange}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
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
              {isPasswordFocused &&
                formData.password.length > 0 && (
                  <div className="mt-2 space-y-1 text-xs">
                    <PasswordRequirement label="At least 6 characters" met={passwordStrength.length} />
                    <PasswordRequirement label="Contains a letter" met={passwordStrength.letter} />
                    <PasswordRequirement label="Contains a number" met={passwordStrength.number} />
                    <PasswordRequirement label="Contains a special character" met={passwordStrength.specialChar} />
                  </div>
                )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center">
                Confirm Password               
              </Label>
              <div className="relative">
                <Input
                  id="confirm_password"
                  name="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirm_password}
                  className="placeholder:text-charcoal-black/40"
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full bg-[#FF7A00] hover:bg-[#E66E00] text-white font-bold py-3" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

          {formError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}
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
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-electric-blue hover:underline">
            Sign In
          </Link>
        </p>
      </div>
      <ComingSoonModal open={comingSoonOpen} onOpenChange={setComingSoonOpen} featureName={selectedFeature} />
    </>
  )
}

function PasswordRequirement({ met, label }: { met: boolean; label: string }) {
  return (
    <div className={`flex items-center transition-colors ${met ? "text-green-600" : "text-red-500"}`}>
      {met ? <Check className="w-4 h-4 mr-2" /> : <X className="w-4 h-4 mr-2" />}
      {label}
    </div>
  )
}
