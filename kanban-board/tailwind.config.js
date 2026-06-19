/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Yeh line sabse important hai!
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0f172a",     // Kyunki aapne code mein custom colors use kiye hain
        darkCard: "#1e293b",
        darkBorder: "#334155"
      }
    },
  },
  plugins: [],
}