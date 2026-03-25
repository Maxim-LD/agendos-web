"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { User as UserIcon, Briefcase } from "lucide-react"

import { User } from "@/types/user"

interface ProfileHeaderProps {
    user: User
    onEditClick: () => void
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onEditClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative"
        >
            {/* Cover Background */}
            <div className="h-32 w-full bg-gradient-to-r from-[#0A1628] to-[#1E3A52]"></div>
            
            <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row items-center sm:items-end sm:justify-between gap-4">
                {/* Avatar overlapping the cover */}
                <div className="relative -mt-16 sm:-mt-12 flex flex-col items-center sm:items-start group">
                    <Avatar className="w-28 h-28 border-4 border-white shadow-md bg-white">
                        <AvatarImage src={user.avatarUrl || ""} className="object-cover" />
                        <AvatarFallback className="bg-gray-100">
                            <UserIcon className="w-12 h-12 text-gray-400" />
                        </AvatarFallback>
                    </Avatar>
                </div>
                
                {/* User Info & Actions */}
                <div className="flex-1 w-full text-center sm:text-left sm:ml-4 sm:mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-black flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-1 sm:gap-3">
                            {user.fullname}
                            {user.status && (
                                <span className="inline-block px-2.5 py-0.5 bg-electric-blue/10 text-electric-blue text-xs font-semibold rounded-full w-fit mx-auto sm:mx-0">
                                    {user.status}
                                </span>
                            )}
                        </h2>
                        <div className="text-charcoal-black/60 flex flex-col sm:flex-row items-center gap-1 sm:gap-4 mt-1.5">
                            {user.username && <span className="font-medium">@{user.username}</span>}
                            {user.occupation && (
                                <span className="flex items-center gap-1.5 text-sm">
                                    <Briefcase className="w-4 h-4 opacity-70" />
                                    {user.occupation}
                                </span>
                            )}
                        </div>
                    </div>
                    
                    <Button onClick={onEditClick} className="w-full sm:w-auto mt-4 sm:mt-0 shadow-sm transition-all hover:shadow-md">
                        Edit Profile
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}