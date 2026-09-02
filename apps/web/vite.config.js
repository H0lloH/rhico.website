import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 5173,
        // Proxy /api calls to the local Hono server during development so the
        // frontend can hit the same relative paths it uses in production.
        proxy: {
            '/api': {
                target: 'http://localhost:8787',
                changeOrigin: true
            }
        }
    },
    build: {
        outDir: 'dist',
        sourcemap: true
    }
});
