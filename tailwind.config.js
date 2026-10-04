/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        whatsapp: "#25D366",
        primary: "#10B981",
        ink: "#111827",
        body: "#374151",
        muted: "#6B7280",
        line: "#D1D5DB",
        successbg: "#E9FFF4",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}