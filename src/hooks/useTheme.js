import { useLayoutEffect, useState } from "react";

const isDark = window?.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultTheme = isDark? 'dark': 'light';

export const useTheme = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("app-theme") || defaultTheme
    );
    
    useLayoutEffect(() => {
        localStorage.setItem("app-theme", theme);
    }, [theme])

    return { theme, setTheme }
}