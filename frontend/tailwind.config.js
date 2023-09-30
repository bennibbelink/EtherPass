/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};

// import { defineConfig } from "tailwindcss";
// import typography from "@tailwindcss/typography";
// import daisyui from "daisyui";

// export default defineConfig({
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [typography, daisyui],
// });
