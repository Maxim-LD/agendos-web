"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ComingSoonModal } from "@/components/coming-soon-modal"
import { GoogleIcon } from "../../../public/brand-assets/icons/google-icon"
import { FacebookIcon } from "../../../public/brand-assets/icons/facebook-icon"
import { AgendosLogo } from "@/components/brand/logo/AgendosLogo"
import { AgendosIcon } from "@/components/brand/logo/AgendosIcon"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    identifier: "", // For email or phone
    password: "",
  })
  const [comingSoonOpen, setComingSoonOpen] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setFormError(null)

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`;
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      })

      const result = await res.json()
      if (result.success) {
        toast.success("Logged in Successfully! 🎉", {
          description: `Welcome back to AGENDOS, ${result.data.user.fullname}!`,
          duration: 2000,
          onAutoClose: () => router.push("/dashboard"),
          // Also navigate if the user manually dismisses the toast
          onDismiss: () => router.push("/dashboard"),
        });
        login(result.data.user, result.data.accessToken)
      } else {
        setFormError(result.message || "Something went wrong! Please try again.")
      }
    } catch (error) {
      setFormError('Network error, Please try again!.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLoginClick = (provider: string) => {
    setSelectedFeature(`${provider} Login`)
    setComingSoonOpen(true)
  }

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-[#0A1628] to-[#1E3A52] flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 overflow-hidden">
        <div className="w-full max-w-6xl">
          <div className="flex justify-center items-center gap-3 mb-8">
            <AgendosLogo variant="dark" className="text-3xl" href="/" />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 w-full">
            {/* Left side: Form */}
            <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="text-center lg:text-left">
                <h1 className="text-2xl font-bold text-charcoal-black mb-1">Welcome Back!</h1>
                <p className="text-charcoal-black/60 mb-8">Sign in to continue your journey.</p>
              </div>

              {formError && (
                <Alert variant="destructive" >
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
                    <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)} disabled={isLoading}>
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
      <ComingSoonModal open={comingSoonOpen} onOpenChange={setComingSoonOpen} featureName={selectedFeature} />
    </>
  )
}
