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
      <div className="w-full max-w-lg bg-card p-6 sm:p-8 rounded-3xl shadow-xl border border-border/40">
        <div className="text-center lg:text-left mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2 font-heading tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground font-medium text-sm">Sign in to continue your journey.</p>
        </div>

        {formError && (
          <Alert variant="destructive" className="mb-6 border-destructive/20 bg-destructive/10">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="font-semibold">{formError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="identifier" className="font-semibold text-foreground/80">Email or Phone Number</Label>
            <Input
              id="identifier"
              name="identifier"
              type="text"
              placeholder="name@example.com"
              value={formData.identifier}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="font-semibold text-foreground/80">Password</Label>
              <Link href="/auth/forgot-password" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:bg-transparent hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <Button type="submit" className="w-full font-bold py-6 text-base rounded-xl mt-2" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="relative mt-8 mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <span className="bg-card px-3">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="flex items-center gap-2 h-11 rounded-xl bg-secondary/30 hover:bg-secondary font-semibold" onClick={() => handleSocialLoginClick("Google")}>
            <GoogleIcon className="w-5 h-5" />
            Google
          </Button>
          <Button variant="outline" className="flex items-center gap-2 h-11 rounded-xl bg-secondary/30 hover:bg-secondary font-semibold" onClick={() => handleSocialLoginClick("Facebook")}>
            <FacebookIcon className="w-5 h-5" />
            Facebook
          </Button>
        </div>

        <p className="mt-8 text-center text-sm font-medium text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="font-bold text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
      <ComingSoonModal open={comingSoonOpen} onOpenChange={setComingSoonOpen} featureName={selectedFeature} />
    </>
  )
}
