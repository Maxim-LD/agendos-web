"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

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

interface EditProfileModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: () => void
}

export function EditProfileModal({ open, onOpenChange, onSave }: EditProfileModalProps) {
    const { user, login: updateUser } = useAuth()
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
    }, [user, open])

    if (!user) return null

    const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase()

    const handleSaveChanges = async () => {
        setIsSaving(true)
        try {
            const updatedData = await updateProfileDetails(user.id, { fullname, occupation, status })
            // updateUser({ ...user, ...updatedData })
            onSave()
        } catch (error) {
            console.error("Failed to save profile:", error)
        } finally {
            setIsSaving(false)
            onOpenChange(false)
        }
    }

    const handlePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        setPreviewImage(URL.createObjectURL(file))
        setIsUploading(true)
        try {
            const { avatarUrl } = await uploadProfilePicture(user.id, file)
            // updateUser({ ...user, avatarUrl })
            onSave()
        } catch (error) {
            console.error("Failed to upload picture:", error)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16">
                            <AvatarImage src={previewImage || user.avatarUrl} />
                            <AvatarFallback className="bg-electric-blue text-white text-xl font-bold">
                                {getInitials(user.fullname)}
                            </AvatarFallback>
                        </Avatar>
                        <input type="file" ref={fileInputRef} onChange={handlePictureUpload} accept="image/*" className="hidden" />
                        <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                            {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Upload Picture
                        </Button>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" value={fullname} onChange={(e) => setFullname(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="occupation" className="text-right">Occupation</Label>
                        <Input id="occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} placeholder="e.g. Software Engineer" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">Status</Label>
                        <Input id="status" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="e.g. Focusing on a project" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleSaveChanges} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}