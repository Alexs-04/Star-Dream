// src/api/authApi.ts
import api from "./axiosClient";

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    username: string;
    role: string;
    accessToken: string;
    refreshToken: string;
}

export async function loginUser(request: LoginRequest): Promise<LoginResponse> {

    try {
        const response = await api.post("/api/auth/login", request);

        // Valida que la respuesta tenga la estructura correcta
        if (!response.data.accessToken) {
            throw new Error("No se recibió accessToken en la respuesta");
        }

        if (!response.data.refreshToken) {
            throw new Error("No se recibió refreshToken en la respuesta");
        }

        if (response.data.accessToken === 'null' || response.data.accessToken === 'undefined') {
            throw new Error("AccessToken es null o undefined");
        }


        return response.data;
    } catch (error: any) {
        console.error("=== ERROR EN API CALL ===");
        if (error.response) {
        } else if (error.request) {
            console.error("No se recibió respuesta:", error.request);
        } else {
            console.error("Error configurando request:", error.message);
        }
        throw error;
    }
}

export async function logoutUser(refreshToken: string): Promise<void> {
    try {
        console.log("=== EJECUTANDO LOGOUT ===");
        const response = await api.post("/api/auth/logout", { refreshToken });
        console.log("Logout exitoso:", response.data);
    } catch (error) {
        console.error("Error en logout:", error);
        // Aún así limpiamos el frontend aunque falle en el backend
    }
}