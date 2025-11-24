//src/pages/LoginPage.tsx
import React, {useEffect} from "react";
import LoginForm from "../components/LoginForm";
import "../assets/css/LoginPage.css";
import {useNavigate} from "react-router-dom";

// src/pages/LoginPage.tsx
const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    // Limpia tokens antiguos al cargar la página de login
    useEffect(() => {
        localStorage.clear();
        console.log("LocalStorage limpiado al cargar LoginPage");
    }, []);

    return (
        <div className="login-page">
            <div className="login-illustration">
                <div className="overlay">
                    <h1>🌟 Novalia ERP</h1>
                    <p>Gestiona, reporta y triunfa.</p>
                </div>
            </div>

            <div className="login-content">
                <div className="login-card">
                    <LoginForm
                        onLoginSuccess={(username, role, accessToken, refreshToken) => {
                            console.log("=== GUARDANDO TOKENS ===");
                            console.log("Access Token:", accessToken);
                            console.log("Refresh Token:", refreshToken);
                            console.log("Username:", username);
                            console.log("Role:", role);

                            // Verifica que los tokens no sean null/undefined
                            if (!accessToken || accessToken === 'null' || accessToken === 'undefined') {
                                console.error("Access Token es inválido:", accessToken);
                                return;
                            }

                            if (!refreshToken || refreshToken === 'null' || refreshToken === 'undefined') {
                                console.error("Refresh Token es inválido:", refreshToken);
                                return;
                            }

                            localStorage.setItem("accessToken", accessToken);
                            localStorage.setItem("refreshToken", refreshToken);
                            localStorage.setItem("username", username);
                            localStorage.setItem("role", role);

                            // Verifica que se guardaron correctamente
                            console.log("=== TOKENS GUARDADOS ===");
                            console.log("accessToken en localStorage:", localStorage.getItem("accessToken"));
                            console.log("refreshToken en localStorage:", localStorage.getItem("refreshToken"));

                            navigate("/");
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;