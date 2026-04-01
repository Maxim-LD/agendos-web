// src/lib/auth/authService.ts
import { tokenManager } from "./tokenManager";
import { refreshManager } from "./refreshManager";
import { User } from "@/types/user";
import api from "../api";

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
    },

    /**
     * Sends a logout request to the server so the HttpOnly refresh token
     * is explicitly deleted, ensuring full session termination.
     */
    async logout(): Promise<void> {
        const accessToken = tokenManager.getToken()

        try {
            await api.request('/auth/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        } catch (error) {
            console.error("Failed to properly hit logout endpoint on the server:", error);
            // We ignore errors here. Even if the network is down or backend is offline,
            // we must proceed with clearing the local client session state immediately.
        }
    }
};
