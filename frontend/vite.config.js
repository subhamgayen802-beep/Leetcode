import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
<<<<<<< HEAD

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
=======
import removeConsole from "vite-plugin-remove-console";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
     removeConsole()]
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
})
