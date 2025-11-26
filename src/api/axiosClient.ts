// src/api/axiosClient.ts
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: { "Content-Type": "application/json" }
});

// === INTERCEPTOR PARA AGREGAR TOKEN A CADA REQUEST ===
api.interceptors.request.use(config => {
    const token = localStorage.getItem("accessToken");

    if (token && token !== 'null' && token !== 'undefined') {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Authorization header added");
    } else {
        console.log("No valid token, skipping Authorization header");
        delete config.headers.Authorization;
    }

    return config;
}, error => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
});

// === INTERCEPTOR PARA REFRESCAR TOKEN ===
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
// En el interceptor de response en axiosClient.ts
api.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;

        // Si es 401 O 403 (por si el backend devuelve 403 para tokens expirados)
        if ((error.response?.status === 401 || error.response?.status === 403) &&
            !originalRequest?._retry &&
            !originalRequest?.url?.includes('/auth/refresh')) {

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = "Bearer " + token;
                    return api(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }

                const response = await axios.post(
                    "http://localhost:8080/api/auth/refresh",
                    { refreshToken },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );

                const newAccessToken = response.data.accessToken;

                localStorage.setItem("accessToken", newAccessToken);

                // Actualizar el header para requests futuros
                api.defaults.headers.common.Authorization = "Bearer " + newAccessToken;
                originalRequest.headers.Authorization = "Bearer " + newAccessToken;

                processQueue(null, newAccessToken);
                return api(originalRequest);

            } catch (refreshError: any) {
                processQueue(refreshError, null);

                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("username");
                localStorage.removeItem("role");

                // Redirigir a login
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // Si es otro error de autenticación
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.log("Authentication error - clearing tokens");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default api;