import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- Añade esta línea

// https://vite.dev
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(), // <-- Añade esta línea
    ],
})
