import { useAuth } from "@/providers";

// A function to get the auth context. This is a bit of a workaround
// to access the context outside of a React component.
// We will pass the trigger function from our components.
type TriggerSessionExpired = () => void;

const api = {
    async request(
        url: string,
        options: RequestInit = {},
        triggerSessionExpired?: TriggerSessionExpired 
    ) {
        // Get token from localStorage for server-side compatibility
        const token = localStorage.getItem('accessToken');

        const headers = new Headers(options.headers || {});
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Content-Type', 'application/json');

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
            ...options,
            headers,
            credentials: 'include',
        });

        // If token is expired, the server should return 401
        if (response.status === 401) {
            console.error("API request failed with 401. Triggering session expiration.");
            if (triggerSessionExpired) {
                triggerSessionExpired();
            }
            // Throw an error to stop further processing
            throw new Error('Session expired');
        }

        return response;
    }
};

export default api;