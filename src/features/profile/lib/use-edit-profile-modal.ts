"use client"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/providers"

// --- Mock API Endpoints ---

const MOCK_API_ENDPOINT = "/api/user/profile"

type ProfileUpdateData = { fullname?: string; occupation?: string; status?: string }

async function updateProfileDetails(userId: string, data: ProfileUpdateData) {
    console.log(`Sending PATCH request to ${MOCK_API_ENDPOINT} with:`, data)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
    console.log("Profile details updated successfully.")
    return { ...data } // Simulate API returning updated data
}

async function uploadProfilePicture(userId: string, file: File) {
    console.log(`Uploading ${file.name} to ${MOCK_API_ENDPOINT}/avatar for user ${userId}...`)
    await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate network delay
    console.log("Profile picture uploaded successfully.")
    return { avatarUrl: URL.createObjectURL(file) } // Simulate API returning new avatar URL
}

export function useEditProfileModal(user: any, onSave: () => void) {
    const { updateUser } = useAuth()
    const [isSaving, setIsSaving] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [previewImage, setPreviewImage] = useState<string | null>(null)

    // Form state
    const [fullname, setFullname] = useState(user?.fullname ?? "")
    const [occupation, setOccupation] = useState(user?.occupation ?? "")
    const [status, setStatus] = useState(user?.status ?? "")

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (user) {
            setFullname(user.fullname ?? "")
            setOccupation(user.occupation ?? "")
            setStatus(user.status ?? "")
            setPreviewImage(user.avatarUrl ?? null)
        }
    }, [user])

    const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase()

    const handleSaveChanges = async () => {
        setIsSaving(true)
        try {
            const updatedData = await updateProfileDetails(user.id, { fullname, occupation, status })
            // Assuming `updateUserContext` correctly updates the user in the context and local storage
            updateUser(updatedData)
            onSave()
        } catch (error) {
            console.error("Failed to save profile:", error)
        } finally {
            setIsSaving(false)
        }\n    }

    const handlePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        setPreviewImage(URL.createObjectURL(file))
        setIsUploading(true)
        try {
            const { avatarUrl } = await uploadProfilePicture(user.id, file)
            // Assuming `updateUserContext` correctly updates the user in the context and local storage
            updateUser({ avatarUrl })\n            onSave()
        } catch (error) {\n            console.error(\"Failed to upload picture:\", error)
        } finally {\n            setIsUploading(false)
        }\n    }

    return {\n        fullname,\n        setFullname,\n        occupation,\n        setOccupation,\n        status,\n        setStatus,\n        isSaving,\n        isUploading,\n        previewImage,\n        fileInputRef,\n        getInitials,\n        handleSaveChanges,\n        handlePictureUpload,\n    }
}
