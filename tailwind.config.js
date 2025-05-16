/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'retro': ['"Press Start 2P"', 'cursive'],
        'vt323': ['"VT323"', 'monospace']
      },
      colors: {
        'crt-black': '#000000',
        'crt-dark': '#121212',
        'crt-darker': '#0a0a0a',
        'crt-gray': '#232323',
        'crt-light-gray': '#444444',
        'crt-green': '#33ff33',
        'crt-green-dark': '#1a991a',
        'crt-blue': '#3333ff',
        'crt-blue-dark': '#1a1a99',
        'crt-red': '#ff3333',
        'crt-red-dark': '#991a1a',
        'crt-cyan': '#33ffff',
        'crt-cyan-dark': '#1a9999',
        'crt-magenta': '#ff33ff',
        'crt-magenta-dark': '#991a99',
        'crt-yellow': '#ffff33',
        'crt-yellow-dark': '#99991a',
        'crt-white': '#ffffff',
        'crt-off-white': '#cccccc',
      },
      animation: {
        'flicker': 'flicker 0.15s infinite',
        'scanline': 'scanline 10s linear infinite',
        'noise': 'noise 0.2s infinite',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
        'glitch': 'glitch 3s infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'horizontal-shake': 'horizontal-shake 0.1s infinite alternate',
        'static': 'static 0.5s steps(3, end) infinite both',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.92' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
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
          '0%': { boxShadow: '0 0 5px rgba(51, 255, 51, 0.8), 0 0 10px rgba(51, 255, 51, 0.4)' },
          '100%': { boxShadow: '0 0 10px rgba(51, 255, 51, 0.8), 0 0 20px rgba(51, 255, 51, 0.6)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 5px currentColor, 0 0 10px currentColor' },
          '50%': { opacity: '0.8', boxShadow: '0 0 15px currentColor, 0 0 20px currentColor' },
        },
        'horizontal-shake': {
          '0%': { transform: 'translateX(-1px)' },
          '100%': { transform: 'translateX(1px)' },
        },
        'static': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        }
      },
      backgroundImage: {
        'crt-gradient': 'radial-gradient(circle, #232323 30%, #121212 70%, #000000 100%)',
        'noise-pattern': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'crt-glow': '0 0 5px rgba(51, 255, 51, 0.5), 0 0 10px rgba(51, 255, 51, 0.3)',
        'crt-glow-cyan': '0 0 5px rgba(51, 255, 255, 0.5), 0 0 10px rgba(51, 255, 255, 0.3)',
        'crt-glow-red': '0 0 5px rgba(255, 51, 51, 0.5), 0 0 10px rgba(255, 51, 51, 0.3)',
      },
      transitionProperty: {
        'glow': 'box-shadow, transform, opacity',
      },
      screens: {
        'xs': '400px',
      }
    },
  },
  plugins: [],
};