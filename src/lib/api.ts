const api = {
    async request(
        url: string,
        options: RequestInit = {}
    ) {
        const headers = new Headers(options.headers || {});
        
        // Get token from localStorage to ensure it's available during initial load
        // and outside of a component's direct lifecycle.
        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        if (token && !headers.has('Authorization')) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
            ...options,
            headers,
            credentials: 'include',
        });

        return response;
    }
};

export default api;