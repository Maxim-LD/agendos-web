"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import api from "@/lib/api"
import { useAuth } from "@/providers"

export function useSignupForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm_password: ""
  })

  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const { login } = useAuth()


  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    letter: false,
    number: false,
    specialChar: false,
  })

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const checkPasswordStrength = (password: string) => {
    setPasswordStrength({
      length: password.length >= 6,
      letter: /[a-zA-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password),
    })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setFormData({ ...formData, password: newPassword })
    checkPasswordStrength(newPassword)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setFormError(null)

    if (formData.password !== formData.confirm_password) {
      setFormError("Passwords do not match.")
      setIsLoading(false)
      return
    }

    try {
      const res = await api.request(
        '/auth/signup',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )

      const result = await res.json()
      if (result.success) {
        toast.success("Sign Up Successful! 🎉", {
          description: `Welcome to AGENDOS, ${result.data.fullname}!`,
          duration: 2000,
        })
        // On success, store the user in state, and navigate to the onboarding flow with the email as a query param
        login(result.data.user, result.data.accessToken)
        router.push(`/onboarding?email=${formData.email}`)
      } else {
        setFormError(result.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setFormError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return {
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
  }
}
