"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers"
import { toast } from "sonner"

export function useLoginForm() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  })
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
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`
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
          onDismiss: () => router.push("/dashboard"),
        })
        login(result.data.user, result.data.accessToken)
      } else {
        setFormError(result.message || "Something went wrong! Please try again.")
      }
    } catch (error) {
      setFormError("Network error, Please try again!.")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    formData,
    isLoading,
    formError,
    showPassword,
    handleChange,
    handleSubmit,
    setShowPassword,
  }
}
