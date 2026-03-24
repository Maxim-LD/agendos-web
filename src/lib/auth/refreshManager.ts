// src/lib/auth/refreshManager.ts
import { tokenManager } from "./tokenManager";

/**
 * Manages the concurrency lock and the queue mechanics for token refreshing.
 * Guarantees only one network request is inflight for /auth/refresh-token.
 */

let isRefreshing = false;
let refreshSubscribers: Array<{ resolve: (token: string) => void, reject: (err: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
    refreshSubscribers.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });
    refreshSubscribers = [];
};

export const refreshManager = {
    async refreshToken(): Promise<string> {
        if (isRefreshing) {
            // Queue the request if a refresh is already in progress
            return new Promise<string>((resolve, reject) => {
                refreshSubscribers.push({ resolve, reject });
            });
        }

        isRefreshing = true;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`, {
                method: 'POST',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error("Session expired");
            }

            const data = await response.json();
            const newToken = data?.data?.token || data?.token; // Try both standard data layouts

            if (newToken) {
                tokenManager.setToken(newToken);

                // If the user object is returned, we can update it in localStorage (safe to store user in LS, just not access tokens)
                const user = data?.data?.user || data?.user;
                if (user && typeof window !== 'undefined') {
                    localStorage.setItem('user', JSON.stringify(user));
                }

                processQueue(null, newToken);
                return newToken;
            } else {
                throw new Error("No token returned from refresh endpoint");
            }
        } catch (error) {
            tokenManager.setToken(null);
            processQueue(error, null);

            // Dispatch global event for AuthProvider to catch and handle logout
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event('sessionExpired'));
            }
            throw error;
        } finally {
            isRefreshing = false;
        }
    }
};
