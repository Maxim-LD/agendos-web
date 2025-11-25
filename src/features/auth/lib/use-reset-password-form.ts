"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { toast } from "sonner"

export function useResetPasswordForm() {
  const [newPassword, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [paramsReady, setParamsReady] = useState(false)
  const [resetToken, setToken] = useState("")
  const [email, setEmail] = useState("")
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    letter: false,
    number: false,
    specialChar: false,
  })

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const tokenParam = searchParams.get("token")
    const emailParam = searchParams.get("email")

    if (tokenParam && emailParam) {
      setToken(tokenParam)
      setEmail(emailParam)
    }
    setParamsReady(true)
  }, [searchParams])

  const checkPasswordStrength = (password: string) => {
    setPasswordStrength({
      length: password.length >= 6,
      letter: /[a-zA-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*()_+\-=[\\]{};':"\\|,.<>/?]/.test(password),
    })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    checkPasswordStrength(newPassword)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const { length, letter, number, specialChar } = passwordStrength
    if (!length || !letter || !number || !specialChar) {
      let errorMsg = "Password does not meet all requirements."
      if (!length) errorMsg = "Password must be at least 6 characters."
      else if (!letter) errorMsg = "Password must contain a letter."
      else if (!number) errorMsg = "Password must contain a number."
      else if (!specialChar) errorMsg = "Password must contain a special character."

      setError(errorMsg)
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password`
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          resetToken,
          newPassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        toast.success("Password reset successful", {
          description: "Your password has been updated successfully.",
        })

        setTimeout(() => {
          router.push("/auth/login")
        }, 3000)
      } else {
        setError(data.message || "Failed to reset password. Please try again.")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    newPassword,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    isLoading,
    isSuccess,
    error,
    paramsReady,
    resetToken,
    email,
    isPasswordFocused,
    passwordStrength,
    setConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    setIsPasswordFocused,
    handlePasswordChange,
    handleSubmit,
  }
}
