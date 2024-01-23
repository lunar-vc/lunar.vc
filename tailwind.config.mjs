/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 4px 32px 0px rgba(191, 191, 191, 0.25)",
      },
    },
    fontFamily: {
      body: ['"ThicccboiSans"', "sans-serif"],
      content: ['"ThicccboiSans"', "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
