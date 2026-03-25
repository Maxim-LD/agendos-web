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
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
            <div className="flex items-center gap-2 mb-6">
                <Info className="w-5 h-5 text-electric-blue" />
                <h3 className="text-lg font-bold text-charcoal-black">Account Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {details.map((detail, index) => (
                    <div key={index} className="flex flex-col space-y-1 p-3 rounded-lg bg-gray-50/50 border border-transparent hover:border-gray-100 transition-colors">
                        <div className="flex items-center gap-2 text-charcoal-black/60 text-sm font-medium">
                            <detail.icon className="w-4 h-4 text-electric-blue/70" />
                            {detail.label}
                        </div>
                        <div className={`text-base pl-6 ${detail.isMissing ? 'text-gray-400 italic' : 'text-charcoal-black font-medium'}`}>
                            {detail.value}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
