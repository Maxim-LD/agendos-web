"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useAuth } from "@/contexts/auth-context"

interface EditProfileModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: () => void
}

export function EditProfileModal({ open, onOpenChange, onSave }: EditProfileModalProps) {
    const { user } = useAuth()

    if (!user) return null

    const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16">
                            <AvatarImage src={"/placeholder.svg?height=80&width=80"} />
                            <AvatarFallback className="bg-electric-blue text-white text-xl font-bold">
                                {getInitials(user.fullname)}
                            </AvatarFallback>
                        </Avatar>
                        <Button variant="outline" onClick={onSave}>Upload Picture</Button>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" defaultValue={user.fullname} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="occupation" className="text-right">Occupation</Label>
                        <Input id="occupation" placeholder="e.g. Software Engineer" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">Status</Label>
                        <Input id="status" placeholder="e.g. Focusing on a project" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={onSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}