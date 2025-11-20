// src/api/authApi.ts
export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    username: string;
    role: string;
    token: string;
}

export async function loginUser(request: LoginRequest): Promise<LoginResponse> {
    const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) throw new Error("Credenciales inválidas");

    return response.json();
}
