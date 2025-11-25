"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

import { User } from "@/types/user"

interface ProfileHeaderProps {
    user: User
    onEditClick: () => void
}

import { getInitials } from "@/lib/utils"

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onEditClick }) => {
    const userInitials = getInitials(user.fullname)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <Avatar className="w-20 h-20">
                    <AvatarImage src={user.avatarUrl || "/placeholder.svg?height=80&width=80"} />
                    <AvatarFallback className="bg-electric-blue text-white text-2xl font-bold">{userInitials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 w-full">
                    <h2 className="text-xl font-bold text-charcoal-black">{user.fullname}</h2>
                    <p className="text-charcoal-black/60">{user.email}</p>
                </div>
                <Button variant="outline" onClick={onEditClick} className="w-full sm:w-auto">Edit Profile</Button>
            </div>
        </motion.div>
    )
}