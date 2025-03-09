import fs from "fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 5173,
    https: {
      key: fs.readFileSync("cert-key.pem"),
      cert: fs.readFileSync("fullchain.pem"),
    },
  },
});
