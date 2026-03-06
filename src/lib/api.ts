let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void, reject: (err: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const api = {
    async request(
        url: string,
        options: RequestInit = {}
    ) {
        const headers = new Headers(options.headers || {});

        // Get token from localStorage to ensure it's available during initial load
        // and outside of a component's direct lifecycle.
        let token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
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

        // Handle 401: Token expired
        if (isRefreshing) {
            // Wait for the ongoing refresh to finish
            return new Promise<string>((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then(newToken => {
                headers.set('Authorization', `Bearer ${newToken}`);
                return executeRequest();
            }).catch(err => {
                return response; // Return the original 401 response if refresh failed
            });
        }

        isRefreshing = true;

        try {
            const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`, {
                method: 'POST',
                credentials: 'include'
            });

            if (!refreshRes.ok) throw new Error("Refresh failed");

            const refreshData = await refreshRes.json();
            const newToken = refreshData.data?.token;

            if (newToken && typeof window !== 'undefined') {
                localStorage.setItem('accessToken', newToken);
                if (refreshData.data?.user) {
                    localStorage.setItem('user', JSON.stringify(refreshData.data.user));
                }
                headers.set('Authorization', `Bearer ${newToken}`);
                processQueue(null, newToken);

                // Retry original request
                return executeRequest();
            } else {
                throw new Error("No token returned");
            }
        } catch (err) {
            processQueue(err, null);
            // Optionally clear local storage to force login
            if (typeof window !== 'undefined') {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                // Emit a custom event to trigger logout in AuthProvider
                window.dispatchEvent(new Event('sessionExpired'));
            }
            return response;
        } finally {
            isRefreshing = false;
        }
    }
};

export default api;