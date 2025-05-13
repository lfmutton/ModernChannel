/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'retro': ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        'crt-black': '#000000',
        'crt-dark': '#121212',
        'crt-gray': '#232323',
        'crt-green': '#33ff33',
        'crt-blue': '#3333ff',
        'crt-red': '#ff3333',
        'crt-cyan': '#33ffff',
        'crt-magenta': '#ff33ff',
        'crt-yellow': '#ffff33',
        'crt-white': '#ffffff',
      },
      animation: {
        'flicker': 'flicker 0.15s infinite',
        'scanline': 'scanline 10s linear infinite',
        'noise': 'noise 0.2s infinite',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.9' },
        },
        scanline: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        noise: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%': { transform: 'translateX(-1%)' },
          '20%': { transform: 'translateX(1%)' },
          '30%': { transform: 'translateX(-2%)' },
          '40%': { transform: 'translateX(3%)' },
          '50%': { transform: 'translateX(-3%)' },
          '60%': { transform: 'translateX(2%)' },
          '70%': { transform: 'translateX(-1%)' },
          '80%': { transform: 'translateX(1%)' },
          '90%': { transform: 'translateX(0%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #33ff33, 0 0 10px #33ff33' },
          '100%': { boxShadow: '0 0 10px #33ff33, 0 0 20px #33ff33' },
        },
      },
    },
  },
  plugins: [],
};