import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    allowedHosts: [
      "zoological-smile-production-42a9.up.railway.app"
    ]
  }
});