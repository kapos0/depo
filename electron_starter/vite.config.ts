import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    base: "./",
    plugins: [react()],
    build: {
        outDir: "dist-ui",
    },
    server: {
        port: 3000,
        strictPort: true,
    },
});
