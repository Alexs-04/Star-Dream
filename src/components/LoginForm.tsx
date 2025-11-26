// src/components/LoginForm.tsx
import React, {useState} from "react";
import {loginUser} from "../api/authApi";
import "../assets/css/LoginForm.css";

interface Props {
    onLoginSuccess: (
        username: string,
        role: string,
        accessToken: string,
        refreshToken: string
    ) => void;
}



const LoginForm: React.FC<Props> = ({onLoginSuccess}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const data = await loginUser({ username, password });

            // PASAR token también
            onLoginSuccess(
                data.username,
                data.role,
                data.accessToken,
                data.refreshToken
            );


        } catch {
            setError("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <div className="login-logo">NE</div>
                <h2>Iniciar Sesión</h2>
                <p className="login-sub">Acceder a tu cuenta</p>
            </div>

            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Usuario:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Contraseña:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                {error && <p className="error">{error}</p>}

                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default LoginForm;