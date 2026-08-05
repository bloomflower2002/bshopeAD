/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fa6204',
        'primary-hover': '#ff7a2f',
        dark: '#14161F',
        'dark-2': '#161922',
        'dark-3': '#1B1E29',
        'text-light': '#f0f4fa',
        'text-muted': '#9aa8b9',
        'text-secondary': '#e0e6ef',
        'footer-text': '#e3f6eb',
        'footer-text-muted': '#cfe7d7',
        'footer-text-dark': '#d4f2da',
        'footer-text-bottom': '#8eb79b',
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '30px',
        '4xl': '40px',
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};