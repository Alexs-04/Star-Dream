import { createContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    currentTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: "system",
    setTheme: () => {},
    currentTheme: "light",
});
export default ThemeContext

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        return (localStorage.getItem("theme") as Theme) || "system";
    });

    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

    const applyTheme = (t: Theme) => {
        let realTheme: "light" | "dark";

        if (t === "system") {
            const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            realTheme = systemPrefersDark ? "dark" : "light";
        } else {
            realTheme = t;
        }

        setCurrentTheme(realTheme);
        document.documentElement.setAttribute("data-theme", realTheme);
    };

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    };

    useEffect(() => {
        applyTheme(theme);

        const listener = (e: MediaQueryListEvent) => {
            if (theme === "system") {
                applyTheme("system");
            }
            //Debe ser borrado
            console.log(e)
        };

        const media = window.matchMedia("(prefers-color-scheme: dark)");
        media.addEventListener("change", listener);

        return () => media.removeEventListener("change", listener);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, currentTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
