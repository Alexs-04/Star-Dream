// src/context/AuthContext.tsx
import {createContext, useContext, useEffect, useState, type ReactNode} from "react";

type User = { username: string; role: string } | null;
type AuthContextType = {
    user: User;
    login: (u: User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User>(null);

    useEffect(() => {
        const raw = localStorage.getItem("authUser");
        if (raw) {
            try {
                setUser(JSON.parse(raw));
            } catch {
                setUser(null);
            }
        }
    }, []);

    const login = (u: User) => {
        setUser(u);
        if (u) localStorage.setItem("authUser", JSON.stringify(u));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("authUser");
    };

    return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return ctx;
};