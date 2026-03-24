// src/lib/auth/authService.ts
import { refreshManager } from "./refreshManager";
import { User } from "@/types/user";

/**
 * High-level abstract API calls for authentication. 
 * Keeps implementation details out of React components.
 */

export const authService = {
    /**
     * Attempts to restore the session by asking the backend for a new access token
     * using the HttpOnly refresh token cookie.
     * @returns The user object if successful.
     */
    async restoreSession(): Promise<{ token: string, user: User | null }> {
        // Will throw if refresh fails
        const token = await refreshManager.refreshToken();

        let user: User | null = null;
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    user = JSON.parse(storedUser);
                } catch (e) {
                    console.error("Failed to parse stored user", e);
                }
            }
        }

        return { token, user };
    }
};
