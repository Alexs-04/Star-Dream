import React from "react";
import LoginForm from "../components/LoginForm";
import "../assets/css/LoginPage.css";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

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
                        onLoginSuccess={(username, role, token) => {
                            console.log("Usuario autenticado:", username, role);

                            // Guardar JWT
                            localStorage.setItem("token", token);
                            localStorage.setItem("username", username);
                            localStorage.setItem("role", role);

                            navigate("/");
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
