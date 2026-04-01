/**
 * Manages the access token and gracefully syncs with localStorage
 * to survive page refreshes, ensuring we do not constantly hit the
 * backend's refresh endpoint on every single browser reload.
 */

let accessToken: string | null = null;

export const tokenManager = {
    getToken: (): string | null => {
        if (typeof window !== 'undefined') {
            return accessToken || localStorage.getItem('accessToken');
        }
        return accessToken;
    },
    setToken: (token: string | null): void => {
        accessToken = token;
        if (typeof window !== 'undefined') {
            if (token) {
                localStorage.setItem('accessToken', token);
            } else {
                localStorage.removeItem('accessToken');
            }
        }
    },
};
