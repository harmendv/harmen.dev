import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
  plugins: [devtoolsJson(), tailwindcss(), reactRouter()],
});
