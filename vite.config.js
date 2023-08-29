import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/inventory-crud/",
  publicPath: "/inventory-crud/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://inventory-crud-backend.onrender.com",
    },
  },
});