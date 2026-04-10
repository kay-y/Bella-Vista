import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from "kimi-plugin-inspect-react"

// Keep the source app in ./app while emitting build output to ./dist.
export default defineConfig({
  root: "app",
  base: "./",
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app/src"),
    },
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
})
