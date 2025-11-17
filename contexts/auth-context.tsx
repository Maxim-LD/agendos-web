"use client"

import { useRouter } from "next/navigation"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
    id: string
    fullname: string
    email: string
    occupation?: string
    status?: string
    avatarUrl?: string
}

interface AuthContextType {
    user: User | null
    accessToken: string | null
    login: (userData: User, token: string) => void
    logout?: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null)
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user')
            const storedToken = localStorage.getItem('accessToken')

            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser))
                setAccessToken(storedToken)
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error)
            // Clear corrupted storage
            localStorage.removeItem('user')
            localStorage.removeItem('accessToken')
        } finally {
            setIsLoading(false)
        }
    }, [])
    
    const login = (userData: User, token: string) => {
        setUser(userData)
        setAccessToken(token)
        localStorage.setItem('user', JSON.stringify(userData))
        // localStorage.setItem('accessToken', token)
    }

    const updateUser = (data: Partial<User>) => {
        setUser(prevUser => {
            if (!prevUser) return null
            const updatedUser = { ...prevUser, ...data }
            // Also update localStorage
            localStorage.setItem('user', JSON.stringify(updatedUser))
            return updatedUser
        })
    }

    const logout = () => {
        setUser(null)
        setAccessToken(null)
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
        router.push('/login')
    }

    return <AuthContext.Provider value={{
        user,
        accessToken,
        login,
        logout,
        isLoading,
        // updateUser,
    }}>{children}
    </AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}