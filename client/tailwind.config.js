/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          900: '#4E0C20',
          800: '#611029',
          700: '#7A1736',
          600: '#8F2145',
          500: '#A82E56',
          400: '#C0436F',
        },
        brandPink: {
          50: '#FDF2F5',
          100: '#F8DDE5',
          200: '#F3C5D2',
          300: '#E8A0B8',
          400: '#D67B9A',
          500: '#C4597F',
        },
        offwhite: {
          DEFAULT: '#FFF9F5',
          warm: '#FFFDFB',
          paper: '#F7F2EE',
          cream: '#FAF5EF',
          card: '#FFFFFF',
        },
        ink: {
          900: '#1A1215',
          800: '#241A1D',
          700: '#3D2D32',
          600: '#59444B',
          muted: '#7A6C71',
          light: '#A3969B',
        },
        gold: {
          400: '#F5C542',
          500: '#E5B22D',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Italiana"', 'Georgia', 'serif'],
        display: ['"Italiana"', '"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        handwritten: ['"Caveat"', '"Reenie Beanie"', 'cursive'],
        script: ['"Reenie Beanie"', '"Caveat"', 'cursive'],
      },
      boxShadow: {
        'paper': '0 4px 20px -2px rgba(36, 26, 29, 0.08), 0 2px 6px -1px rgba(36, 26, 29, 0.04)',
        'paper-lg': '0 12px 32px -4px rgba(36, 26, 29, 0.12), 0 4px 12px -2px rgba(36, 26, 29, 0.06)',
        'paper-lift': '0 20px 40px -8px rgba(122, 23, 54, 0.18), 0 8px 16px -4px rgba(36, 26, 29, 0.08)',
        'burgundy-glow': '0 8px 24px -4px rgba(122, 23, 54, 0.35)',
        'pink-glow': '0 8px 24px -4px rgba(232, 160, 184, 0.4)',
      },
      rotate: {
        '1': '1deg',
        '2': '2deg',
        '3': '3deg',
        '-1': '-1deg',
        '-2': '-2deg',
        '-3': '-3deg',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-2deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(0.98)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
