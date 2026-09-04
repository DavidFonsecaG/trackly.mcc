import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
    try {
        const stored = localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") return stored;
    } catch {
        // localStorage unavailable — fall through to system preference
    }
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setThemeState] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        try {
            localStorage.setItem("theme", theme);
        } catch {
            // ignore persistence failures
        }
    }, [theme]);

    const value: ThemeContextType = {
        theme,
        setTheme: (t: Theme) => setThemeState(t),
        toggleTheme: () => setThemeState((prev) => (prev === "dark" ? "light" : "dark")),
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
