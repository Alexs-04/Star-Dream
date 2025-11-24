// src/api/axiosClient.ts
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {"Content-Type": "application/json"}
});

// Interceptor para agregar token
// src/api/axiosClient.ts
api.interceptors.request.use(config => {
    const token = localStorage.getItem("accessToken");

    console.log("=== INTERCEPTOR REQUEST ===");
    console.log("URL:", config.url);
    console.log("Method:", config.method);
    console.log("Token en localStorage:", token);
    console.log("Token es null/undefined:", token === null || token === undefined);
    console.log("Token es 'null':", token === 'null');
    console.log("Token es 'undefined':", token === 'undefined');
    console.log("Token length:", token?.length);

    if (token && token !== 'null' && token !== 'undefined' && token.trim() !== '') {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Authorization header añadido");
    } else {
        console.warn("Token inválido, no se añade Authorization header");
        delete config.headers.Authorization;
    }

    return config;
});

// También añade un interceptor de response para debug
api.interceptors.response.use(
    response => {
        console.log("=== RESPONSE SUCCESS ===");
        console.log("URL:", response.config.url);
        console.log("Status:", response.status);
        return response;
    },
    error => {
        console.log("=== RESPONSE ERROR ===");
        console.log("URL:", error.config?.url);
        console.log("Status:", error.response?.status);
        console.log("Error:", error.message);
        return Promise.reject(error);
    }
);

// Interceptor para refresh token
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// src/api/axiosClient.ts
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Si es 401 y no es una request de refresh
        if (error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/auth/refresh')) {

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                }).then(token => {
                    originalRequest.headers.Authorization = "Bearer " + token;
                    return api(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                if (!refreshToken) {
                    throw new Error("No refresh token");
                }

                const response = await axios.post(
                    "http://localhost:8080/api/auth/refresh",
                    {refreshToken}
                );

                const newAccessToken = response.data.accessToken;
                localStorage.setItem("accessToken", newAccessToken);

                api.defaults.headers.common.Authorization = "Bearer " + newAccessToken;
                originalRequest.headers.Authorization = "Bearer " + newAccessToken;

                processQueue(null, newAccessToken);
                return api(originalRequest);

            } catch (refreshError) {
                processQueue(refreshError, null);
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;