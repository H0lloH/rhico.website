import { createContext } from 'react';

/**
 * Theme context value shape:
 *   { theme: 'dark' | 'light', toggleTheme: () => void, setTheme: (next) => void }
 */
const ThemeContext = createContext(null);

export default ThemeContext;
