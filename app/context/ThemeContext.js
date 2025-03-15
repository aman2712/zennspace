"use client";

import { themesList } from "@/utils/themes";
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(themesList.ZenGarden);

    useEffect(() => {
        const localTheme = localStorage.getItem("theme");
        if (localTheme) {
            setTheme(localTheme);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const resetThemeContext = () => {
        setTheme(themesList.ZenGarden);
    }

    const values = {
        theme,
        setTheme,

        resetThemeContext
    }

    return (
        <ThemeContext.Provider value={values}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useThemeContext() {
    return useContext(ThemeContext);
}