// src/hooks/useLogout.ts
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";

export const useLogout = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                await logoutUser(refreshToken);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            // Siempre limpiar el localStorage y redirigir
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("username");
            localStorage.removeItem("role");

            console.log("LocalStorage limpiado, redirigiendo al login");
            navigate("/login");
        }
    };

    return { logout };
};