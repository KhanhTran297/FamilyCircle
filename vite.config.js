import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    // loader: "tsx",
    // include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: [react()],
  resolve: {
    // alias: {
    //   "@": path.resolve(__dirname, "./src"),
    // },
  },
});
