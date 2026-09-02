import { useCallback, useEffect, useMemo, useState } from 'react';

import ThemeContext from '../../context/theme_context.js';

const STORAGE_KEY = 'rhico-theme';

const readInitialTheme = () => {
    if (typeof window === 'undefined') {
        return 'dark';
    }

    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === 'dark' || stored === 'light') {
            return stored;
        }
    } catch (error) {
        console.warn('Theme: unable to read localStorage', { error: error.message });
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export default function ThemeProvider({ children }) {
    // State
    const [theme, setThemeState] = useState(readInitialTheme);

    // Callbacks
    const setTheme = useCallback((next) => {
        setThemeState(next === 'dark' ? 'dark' : 'light');
    }, []);

    const toggleTheme = useCallback(() => {
        setThemeState((current) => (current === 'dark' ? 'light' : 'dark'));
    }, []);

    // Effects
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');

        try {
            window.localStorage.setItem(STORAGE_KEY, theme);
        } catch (error) {
            console.warn('Theme: unable to persist to localStorage', { error: error.message });
        }
    }, [theme]);

    // Variables
    const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

    // Render
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
