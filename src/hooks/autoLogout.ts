// src/hooks/useAutoLogout.ts
import { useEffect } from "react";
import { useLogout } from "./useLogout";

export const useAutoLogout = (timeoutMinutes: number = 60) => {
    const { logout } = useLogout();

    useEffect(() => {
        // @ts-ignore
        let timeoutId: NodeJS.Timeout;

        const resetTimer = () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                console.log("Auto logout por inactividad");
                logout();
            }, timeoutMinutes * 60 * 1000);
        };

        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        events.forEach(event => {
            document.addEventListener(event, resetTimer);
        });

        resetTimer();

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            events.forEach(event => {
                document.removeEventListener(event, resetTimer);
            });
        };
    }, [logout, timeoutMinutes]);
};

// Úsalo en tu Layout o App component:
// useAutoLogout(60); // Logout después de 60 minutos de inactividad