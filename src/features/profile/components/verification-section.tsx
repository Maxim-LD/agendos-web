"use client"

import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle2, Loader2, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useVerificationSection } from "../lib/use-verification-section"
import { User } from "@/types/user"

interface VerificationSectionProps {
    user: User
}

export const VerificationSection: React.FC<VerificationSectionProps> = ({ user }) => {
    const {
        isLoading,
        verificationEmailSent,
        errorMessage,
        successMessage,
        handleSendVerificationEmail,
    } = useVerificationSection(user)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-6 shadow-sm border border-border/40"
        >
            <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground font-heading tracking-tight">Verification</h3>
            </div>
            <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                    <span className="text-foreground/80 font-medium">Email</span>
                    {user.isEmailVerified ? (
                        <div className="flex items-center gap-2 text-green-600"> <CheckCircle2 className="w-5 h-5" /> <span>Verified</span> </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            {verificationEmailSent ? (
                                <span className="text-sm text-gray-500 italic">Verification email sent. Please check your inbox.</span>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500"> <AlertTriangle className="w-5 h-5" /> <span>Not Verified</span> </div>
                                    <Button variant="link" className="p-0 h-auto text-primary font-semibold" onClick={handleSendVerificationEmail} disabled={isLoading}>
                                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify"}
                                    </Button>
                                </>
                            )}
                        </div>
                    )}
                </div>
                {successMessage && !isLoading && (
                    <div className="text-green-600 text-sm text-right">
                        {successMessage}
                    </div>
                )}
                {errorMessage && !isLoading && (
                    <div className="text-red-600 text-sm text-right">
                        {errorMessage}
                    </div>
                )}
                <div className="flex items-center justify-between py-2">
                    <span className="text-foreground/80 font-medium">Phone Number</span>
                    {user.isPhoneVerified ? (
                        <div className="flex items-center gap-2 text-green-600"> <CheckCircle2 className="w-5 h-5" /> <span>Verified</span> </div>
                    ) : (
                        <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500"> <AlertTriangle className="w-5 h-5" /> <span>Not Verified</span> </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
