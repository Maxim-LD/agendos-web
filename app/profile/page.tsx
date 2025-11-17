"use client"

import { AppShell } from "@/components/app-shell"
import { Bell, ChevronRight, Loader2, Shield, User } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ComingSoonModal } from "@/components/coming-soon-modal"
import { EditProfileModal } from "@/components/edit-profile-modal"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"


export default function ProfilePage() {
    const { user, isLoading, accessToken } = useAuth()
    const router = useRouter()
    const [comingSoonOpen, setComingSoonOpen] = useState(false)
    const [selectedFeature, setSelectedFeature] = useState("")
    const [editProfileOpen, setEditProfileOpen] = useState(false)

    useEffect(() => {
        if (!isLoading && !accessToken) {
            router.replace("auth/login")
        }
    }, [isLoading, accessToken, router])

    const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase()
    
    const handleFeatureClick = (featureName: string) => {
        setSelectedFeature(featureName)
        setComingSoonOpen(true)
    }
    
    const handleEditProfileClick = () => {
        setEditProfileOpen(true)
    }

    const profileSections = [
        {
        title: "Account",
        icon: User,
        items: [
            { label: "Edit Profile", action: handleEditProfileClick },
            { label: "Privacy Settings", action: () => handleFeatureClick("Privacy Settings") },
        ],
        },
        {
        title: "Security",
        icon: Shield,
        items: [
            { label: "Change Password", action: () => handleFeatureClick("Change Password") },
        ],
        },
        {
        title: "Notifications",
        icon: Bell,
        items: [
            { label: "Email Notifications", toggle: true },
        ],
        },
    ]

    if (isLoading || !user) {
        return (
            <AppShell>
                <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-8 h-8 animate-spin text-electric-blue" />
                </div>
            </AppShell>
        )
    }

    // This will now only run if the user is loaded and authenticated
    const userInitials = getInitials(user.fullname)

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-charcoal-black">Profile</h1>
                    <p className="text-charcoal-black/60 mt-1">Manage your account</p>
                </div>

                {/* Profile Card */}
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                    >
                        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                            <Avatar className="w-20 h-20">
                            <AvatarImage src={"/placeholder.svg?height=80&width=80"} />
                            <AvatarFallback className="bg-electric-blue text-white text-2xl font-bold">{userInitials}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 w-full">
                                <h2 className="text-xl font-bold text-charcoal-black">{user.fullname}</h2>
                                <p className="text-charcoal-black/60">{user.email}</p>
                            </div>
                            <Button variant="outline" onClick={handleEditProfileClick} className="w-full sm:w-auto">
                            Edit Profile
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Profile Settings Sections */}
                <div className="space-y-4">
                {profileSections.map((section, index) => (
                    <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                    >
                    <div className="flex items-center gap-2 mb-4">
                        <section.icon className="w-5 h-5 text-electric-blue" />
                        <h3 className="text-lg font-bold text-charcoal-black">{section.title}</h3>
                    </div>
                    <div className="space-y-3">
                        {section.items.map((item) => (
                        <div key={item.label} className="flex items-center justify-between py-2">
                            <span className="text-charcoal-black/80">{item.label}</span>
                            {"toggle" in item ? (
                                <Switch onCheckedChange={() => handleFeatureClick("Email Notifications Toggle")} />
                            ) : (
                                <button
                                    onClick={"action" in item ? item.action : undefined}
                                    className="text-electric-blue hover:text-electric-blue/80 transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                        ))}
                    </div>
                    </motion.div>
                ))}
                </div>

            </div>
                <ComingSoonModal open={comingSoonOpen} onOpenChange={setComingSoonOpen} featureName={selectedFeature} />
                <EditProfileModal open={editProfileOpen} onOpenChange={setEditProfileOpen} onSave={() => { setEditProfileOpen(false); handleFeatureClick("Saving Profile") }} />
        </AppShell>
    )

}