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
            className="bg-card rounded-2xl shadow-sm border border-border/40 overflow-hidden relative"
        >
            {/* Cover Background */}
            <div className="h-32 w-full bg-secondary/60"></div>
            
            <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row items-center sm:items-end sm:justify-between gap-4">
                {/* Avatar overlapping the cover */}
                <div className="relative -mt-16 sm:-mt-12 flex flex-col items-center sm:items-start group">
                    <Avatar className="w-28 h-28 border-4 border-card shadow-md bg-card">
                        <AvatarImage src={user.avatarUrl || ""} className="object-cover" />
                        <AvatarFallback className="bg-muted">
                            <UserIcon className="w-12 h-12 text-muted-foreground/60" />
                        </AvatarFallback>
                    </Avatar>
                </div>
                
                {/* User Info & Actions */}
                <div className="flex-1 w-full text-center sm:text-left sm:ml-4 sm:mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-1 sm:gap-3 font-heading tracking-tight">
                            {user.fullname}
                            {user.status && (
                                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full w-fit mx-auto sm:mx-0">
                                    {user.status}
                                </span>
                            )}
                        </h2>
                        <div className="text-muted-foreground font-medium flex flex-col sm:flex-row items-center gap-1 sm:gap-4 mt-2 text-sm">
                            {user.username && <span>@{user.username}</span>}
                            {user.occupation && (
                                <span className="flex items-center gap-1.5 border-t sm:border-t-0 sm:border-l border-border/60 pt-1 sm:pt-0 sm:pl-4 mt-1 sm:mt-0">
                                    <Briefcase className="w-3.5 h-3.5 text-primary/70" />
                                    {user.occupation}
                                </span>
                            )}
                        </div>
                    </div>
                    
                    <Button onClick={onEditClick} className="w-full sm:w-auto mt-4 sm:mt-0 font-bold rounded-xl shadow-sm transition-all hover:shadow-md">
                        Edit Profile
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}