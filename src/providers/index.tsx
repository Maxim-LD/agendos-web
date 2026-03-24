"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";
import { useRouter } from "next/navigation"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { User } from "@/types/user"
import { ToastProvider } from "./toast-provider"
import { tokenManager } from "@/lib/auth/tokenManager";
import { authService } from "@/lib/auth/authService";

interface AuthContextType {
    user: User | null
    accessToken: string | null
    login: (userData: User | null, token: string | null, setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>) => void
    logout?: () => void
    triggerSessionExpired: () => void
    updateUser: (data: Partial<User>) => void
    isLoading: boolean
    isSessionExpired: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSessionExpired, setIsSessionExpired] = useState(false)
    const [hasMounted, setHasMounted] = useState(false);
    const router = useRouter()
    const initialized = React.useRef(false)

    // Set hasMounted flag to prevent hydration mismatch
    useEffect(() => {
        setHasMounted(true);
    }, []);

    const login = useCallback((userData: User | null, token: string | null) => {
        if (!userData || !token) {
            console.error("Login failed: userData or token is missing.");
            return;
        }
        setUser(userData);
        setAccessToken(token);
        tokenManager.setToken(token); // Store solely in memory manager
        localStorage.setItem('user', JSON.stringify(userData));
    }, []);

    const logout = useCallback(() => {
        tokenManager.setToken(null);
        localStorage.removeItem('user');
        setUser(null);
        setAccessToken(null);
        router.replace('/auth/login');
    }, [router]);

    const triggerSessionExpired = useCallback(() => {
        // Clear user state but trigger modal instead of immediate redirect
        setUser(null);
        setAccessToken(null);
        tokenManager.setToken(null);
        localStorage.removeItem('user');
        setIsSessionExpired(true);
    }, []);

    const SessionExpiredModal = () => {
        const [countdown, setCountdown] = useState(5);

        useEffect(() => {
            if (countdown <= 0) {
                router.push('/auth/login');
                setIsSessionExpired(false);
                return;
            }
            const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
            return () => clearTimeout(timer);
        }, [countdown]);

        const overlayStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' };
        const modalStyle: React.CSSProperties = { background: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center', color: 'black' };

        return (
            <div style={overlayStyle}><div style={modalStyle}><h2>Session Expired</h2><p>Your session has ended. Please log in again.</p><p>Redirecting in {countdown}...</p></div></div>
        );
    };

    // Initialize auth on mount only
    useEffect(() => {
        if (!hasMounted) return;
        if (initialized.current) return;

        const initializeAuth = async () => {
            const storedToken = tokenManager.getToken();
            const storedUser = localStorage.getItem('user');

            if (storedToken && storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                    setAccessToken(storedToken);
                    initialized.current = true;
                    setIsLoading(false);
                    return; // Skip backend refresh if we already have a valid token
                } catch (e) { /* fallthrough */ }
            }

            // Important: If we have no record of a user, we are anonymous.
            // Do NOT hit the backend asking for a token refresh. 
            if (!storedUser) {
                initialized.current = true;
                setIsLoading(false);
                return;
            }

            try {
                const { token, user: restoredUser } = await authService.restoreSession();
                initialized.current = true;
                if (restoredUser) setUser(restoredUser);
                setAccessToken(token);
            } catch (err) {
                // Ignore silent failures (e.g. refresh cookie actually expired)
            }

            setIsLoading(false);
        };

        initializeAuth();
    }, [hasMounted]);

    // Listen for interceptor auth failures
    useEffect(() => {
        const handleSessionExpired = () => triggerSessionExpired();
        window.addEventListener('sessionExpired', handleSessionExpired);
        return () => window.removeEventListener('sessionExpired', handleSessionExpired);
    }, [triggerSessionExpired]);

    // Function to update user data in state and localStorage
    const updateUser = (data: Partial<User>) => {
        setUser(prevUser => {
            if (!prevUser) return null
            const updatedUser = { ...prevUser, ...data }
            // Also update localStorage
            localStorage.setItem('user', JSON.stringify(updatedUser))
            return updatedUser
        })
    }

    return <AuthContext.Provider value={{
        user,
        accessToken,
        login,
        logout,
        triggerSessionExpired,
        isLoading,
        updateUser,
        isSessionExpired,
    }}>{children}{isSessionExpired && hasMounted && <SessionExpiredModal />}
    </AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}


export function Providers({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider {...props}>
            <AuthProvider>
                <ToastProvider>{children}</ToastProvider>
            </AuthProvider>
        </NextThemesProvider>
    )
}