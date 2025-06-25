import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 1. Carga las vars de entorno que empiecen por VITE_ desde .env, .env.development, etc.
  const env = loadEnv(mode, process.cwd(), "VITE_");
  console.log(` defineConfig ~ process.cwd():`, process.cwd())
  console.log(` defineConfig ~ mode:`, mode)
  console.log(` defineConfig ~ env:`, env)

  return {
    // 2. Define import.meta.env con esas vars (y limpiamos process.env para evitar polyfills innecesarios)
    define: {
      "process.env": {},
      "import.meta.env": {
        ...env,
        MODE: mode,
        DEV: mode === "development",
        PROD: mode === "production",
      },
    },

    server: {
      host: "::",
      port: 8080,
    },

    plugins: [
      react(),
      mode === "development" && componentTagger(),
    ].filter(Boolean),

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
