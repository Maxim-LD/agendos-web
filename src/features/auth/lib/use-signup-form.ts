"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function useSignupForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm_password: "",
    username: "",
    phone: "",
    status: "",
    occupation: "",
    date_of_birth: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setFormError(null)

    if (formData.password !== formData.confirm_password) {
      setFormError("Passwords do not match.")
      setIsLoading(false)
      return
    }

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await res.json()
      if (result.success) {
        toast.success("Sign Up Successful! 🎉", {
          description: `Welcome to AGENDOS, ${result.data.fullname}!`,
          duration: 2000,
          onAutoClose: () => router.push("/dashboard"),
          onDismiss: () => router.push("/dashboard"),
        })
      } else {
        setFormError(result.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Sign up error:", error)
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
