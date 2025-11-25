"use client"

import { useState } from "react"
import { toast } from "sonner"

export function useForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forgot-password`
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        toast.success("Reset link sent", {
          description: "Check your mail for password reset instructions.",
        })
      } else {
        const data = await response.json()
        setError(data.message || "Failed to send reset email")
      }
    } catch (error) {
      console.error(error)
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail("");
  }

  return {
    email,
    isLoading,
    isSubmitted,
    error,
    setEmail,
    handleSubmit,
    handleReset,
  }
}
