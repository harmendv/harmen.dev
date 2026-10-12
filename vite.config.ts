import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import devtoolsJson from "vite-plugin-devtools-json";
import { FontaineTransform } from "fontaine";

const options = {
  // Local system font that gets resized to match the metrics read from each web font's source file
  fallbacks: ["Segoe UI", "Helvetica Neue", "Arial", "Noto Sans"],
};

export default defineConfig({
  plugins: [FontaineTransform.vite(options), devtoolsJson(), tailwindcss(), reactRouter()],
});
