interface User {
    id: string
    fullname: string
    email: string
    occupation?: string
    status?: string
    avatarUrl?: string
    isEmailVerified?: boolean,
    isPhoneVerified?: boolean,
}

export type { User }
