/** @type {import('tailwindcss').Config} */
import animatePlugin from "tailwindcss-animate"
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    animatePlugin
  ],
}
