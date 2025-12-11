interface User {
    id: string
    fullname: string
    email: string
    username?: string
    occupation?: string
    phone?: string
    status?: string
    avatarUrl?: string
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    date_of_birth?: Date
}

export type { User }
