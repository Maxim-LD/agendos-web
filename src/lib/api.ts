import { tokenManager } from "./auth/tokenManager";
import { refreshManager } from "./auth/refreshManager";

const api = {
    async request(
        url: string,
        options: RequestInit = {}
    ) {
        const headers = new Headers(options.headers || {});

        // Get token securely from the memory manager
        let token = tokenManager.getToken();
        if (token && !headers.has('Authorization')) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        const executeRequest = () => fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
            ...options,
            headers,
            credentials: 'include',
        });

        let response = await executeRequest();

        // If not 401 or it's the refresh token endpoint itself, return the response
        if (response.status !== 401 || url.includes('/auth/refresh-token')) {
            return response;
        }

        // Handle 401: Token expired or invalid
        try {
            // refreshManager handles the concurrency locks internally
            const newToken = await refreshManager.refreshToken();
            headers.set('Authorization', `Bearer ${newToken}`);

            // Retry the original request with the fresh token
            return await executeRequest();
        } catch (err) {
            // If the refresh orchestrator fails, return the original 401 
            // to allow the UI to handle it conventionally if needed
            return response;
        }
    }
};

export default api;