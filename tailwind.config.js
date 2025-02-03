/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'frame-orange': '#F4A340',
        'frame-peach': '#F4C583',
        'frame-brown': '#B39288',
        'frame-cream': '#F9EDE4',
      },
    },
  },
}

