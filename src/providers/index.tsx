"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";
import { useRouter } from "next/navigation"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { User } from "@/types/user"

interface AuthContextType {
    user: User | null
    accessToken: string | null
    login: (userData: User | null, token: string | null, setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>) => void 
    logout?: () => void
    triggerSessionExpired: () => void
    updateUser: (data: Partial<User>) => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function AuthProvider({ children }: { children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null)
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSessionExpired, setIsSessionExpired] = useState(false)
    const [hasMounted, setHasMounted] = useState(false);
    const router = useRouter()
    
    // Set hasMounted flag to prevent hydration mismatch
    useEffect(() => {
        setHasMounted(true);
    }, []);

    // Define login function first so it can be used in useEffect
    const login = useCallback((userData: User | null, token: string | null) => {
        if (!userData || !token) {
            console.error("Login failed: userData or token is missing.");
            return;
        }
        setUser(userData);
        setAccessToken(token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('accessToken', token);
    }, []);
    
    const logout = useCallback(() => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        router.push('/auth/login');
    }, [router]);

    const triggerSessionExpired = useCallback(() => {
        // Clear user state but trigger modal instead of immediate redirect
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
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

        const initializeAuth = async () => {
            const storedToken = localStorage.getItem('accessToken');

            // If we have a token, try to refresh the session
            if (storedToken) {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
                        { method: 'POST',
                            credentials: 'include'
                        } 
                    );
                    if (!response.ok) {
                        throw new Error('Refresh token failed');
                    }
                    const responseData = await response.json();
                    if (!responseData.user || !responseData.token) {
                        console.error("Refresh token returned invalid user data or token.");
                        throw new Error('Invalid refresh token response');
                    }
                    login(responseData.user, responseData.token);
                } catch (error) {
                    console.error("Session refresh failed, logging out.", error);
                    triggerSessionExpired();
                } finally {
                    setIsLoading(false);
                }
            } else {
                // If there's no token at all, we are not logged in.
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, [hasMounted, login, triggerSessionExpired]);

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
      <AuthProvider>{children}</AuthProvider>
    </NextThemesProvider>
  )
}