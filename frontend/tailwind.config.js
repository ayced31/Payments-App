/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#002970',
          900: '#1e3a8a',
        },
        accent: {
          400: '#38bdf8',
          500: '#00BAF2',
          600: '#0284c7',
        },
        brand: {
          bg: '#F8FAFC',
          card: '#ffffff',
          text: '#1f2937',
          muted: '#6b7280',
        }
      },
      fontFamily: {
        'brand': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brand': '0 4px 6px -1px rgba(0, 41, 112, 0.1), 0 2px 4px -1px rgba(0, 41, 112, 0.06)',
        'brand-lg': '0 10px 15px -3px rgba(0, 41, 112, 0.1), 0 4px 6px -2px rgba(0, 41, 112, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translateY(0)' },
          '40%, 43%': { transform: 'translateY(-6px)' },
          '70%': { transform: 'translateY(-3px)' },
          '90%': { transform: 'translateY(-1px)' },
        },
      }
    },
  },
  plugins: [],
};
