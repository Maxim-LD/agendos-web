"use client"

import { motion } from "framer-motion"
import { Mail, Phone, Calendar, Contact, Info } from "lucide-react"

import { User } from "@/types/user"

interface AccountDetailsSectionProps {
    user: User
}

export const AccountDetailsSection: React.FC<AccountDetailsSectionProps> = ({ user }) => {
    
    // Formatting the date nicely if it exists
    const formatDate = (dateString?: Date | string) => {
        if (!dateString) return null;
        try {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
        } catch(e) {
            return String(dateString);
        }
    }

    const details = [
        {
            icon: Mail,
            label: "Email Address",
            value: user.email,
        },
        {
            icon: Phone,
            label: "Phone Number",
            value: user.phone || "Not provided",
            isMissing: !user.phone
        },
        {
            icon: Calendar,
            label: "Date of Birth",
            value: formatDate(user.date_of_birth) || "Not provided",
            isMissing: !user.date_of_birth
        },
        {
            icon: Contact,
            label: "Username",
            value: user.username ? `@${user.username}` : "Not provided",
            isMissing: !user.username
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-card rounded-2xl p-6 shadow-sm border border-border/40"
        >
            <div className="flex items-center gap-2 mb-6">
                <Info className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Account Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {details.map((detail, index) => (
                    <div key={index} className="flex flex-col space-y-1.5 p-3.5 rounded-xl bg-secondary/30 border border-transparent hover:border-border/60 transition-colors">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold">
                            <detail.icon className="w-4 h-4 text-primary/70" />
                            {detail.label}
                        </div>
                        <div className={`text-base pl-6 ${detail.isMissing ? 'text-muted-foreground/50 italic' : 'text-foreground font-bold'}`}>
                            {detail.value}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
