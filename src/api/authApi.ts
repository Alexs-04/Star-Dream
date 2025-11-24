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
    console.log("=== LLAMANDO API LOGIN ===");

    try {
        const response = await api.post("/api/auth/login", request);

        console.log("=== RESPUESTA DEL SERVIDOR ===");
        console.log("Status:", response.status);
        console.log("Datos completos:", response.data);

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

        console.log("AccessToken válido, longitud:", response.data.accessToken.length);
        console.log("RefreshToken válido, longitud:", response.data.refreshToken.length);

        return response.data;
    } catch (error: any) {
        console.error("=== ERROR EN API CALL ===");
        if (error.response) {
            console.error("Data del error:", error.response.data);
            console.error("Status del error:", error.response.status);
            console.error("Headers del error:", error.response.headers);
        } else if (error.request) {
            console.error("No se recibió respuesta:", error.request);
        } else {
            console.error("Error configurando request:", error.message);
        }
        throw error;
    }
}