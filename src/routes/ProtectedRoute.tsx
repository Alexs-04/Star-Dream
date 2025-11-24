// src/routes/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const [isValid, setIsValid] = useState<boolean | null>(null);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("accessToken");

            console.log("=== PROTECTED ROUTE CHECK ===");
            console.log("Token from localStorage:", token);
            console.log("Token is 'null':", token === 'null');
            console.log("Token is 'undefined':", token === 'undefined');
            console.log("Token exists:", !!token);

            if (!token || token === 'null' || token === 'undefined') {
                console.log("No valid token found, redirecting to login");
                setIsValid(false);
                return;
            }

            // Solo valida que el token exista y tenga formato básico
            // NO hagas una llamada API aquí para evitar recursión
            const tokenParts = token.split('.');
            if (tokenParts.length !== 3) {
                console.log("Token has invalid format, redirecting to login");
                setIsValid(false);
                return;
            }

            console.log("Token is valid, allowing access");
            setIsValid(true);
        };

        checkToken();
    }, []);

    if (isValid === null) {
        console.log("ProtectedRoute: Loading...");
        return <div>Cargando...</div>;
    }

    if (!isValid) {
        console.log("ProtectedRoute: Redirecting to login");
        localStorage.clear();
        return <Navigate to="/login" replace />;
    }

    console.log("ProtectedRoute: Rendering children");
    return children;
};

export default ProtectedRoute;