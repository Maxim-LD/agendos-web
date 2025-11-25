"use client"

import { useState, MouseEvent } from "react"
import { useAuth } from "@/providers"
import { User } from "@/types/user"

export function useVerificationSection(user: User) {
    const { accessToken, updateUser } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [verificationEmailSent, setVerificationEmailSent] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const handleSendVerificationEmail = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setErrorMessage(null) // Reset error on new attempt
        setSuccessMessage(null) // Reset success message on new attempt

        try {
            // Construct the full URL for the endpoint
            const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/send-email-verification`;
            const response = await fetch(endpoint, {
                method: 'POST', // Use POST to send data in the body
                headers: { 
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: user.email }) // Add user's email to the request body
            })

            if (response.ok) {
                const result = await response.json().catch(() => ({})) // Safely parse JSON
                setVerificationEmailSent(true)
                setSuccessMessage(result.message || "Verification email sent successfully.")
            } else {
                // Try to parse error message from backend, with a fallback
                const errorData = await response.json().catch(() => ({}))
                const message = errorData.message || "Failed to send verification email. Please try again."
                setErrorMessage(message)
                console.error("Failed to send verification email:", errorData || response.statusText)
            }
        } catch (error) {
            // Fallback for network errors or other exceptions
            const fallbackMessage = "An unexpected error occurred. Please check your connection and try again."
            setErrorMessage(fallbackMessage)
            console.error("Failed to send verification email:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        verificationEmailSent,
        errorMessage,
        successMessage,
        handleSendVerificationEmail,
    }
}
