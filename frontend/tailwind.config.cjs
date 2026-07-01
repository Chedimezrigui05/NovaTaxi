module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Full "gold" scale — main brand color
        brand: {
          50: '#fffdf5',
          100: '#fff8e1',
          200: '#ffedb3',
          300: '#ffdf7a',
          400: '#fecb3e',
          500: '#f0b429', // core gold
          600: '#d19a1a',
          700: '#a97710',
          800: '#7f5a12',
          900: '#5c4213',
          950: '#332309'
        },
        // Secondary metallic accent (deep bronze/champagne) for gradients & depth
        gilt: {
          100: '#fbe7c6',
          300: '#e8c179',
          500: '#c9932f',
          700: '#8a5f1e',
          900: '#3d2a10'
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#070b14'
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #fff8e1 0%, #ffdf7a 35%, #f0b429 68%, #c9932f 100%)',
        'gold-gradient-soft': 'linear-gradient(135deg, #fffdf5 0%, #fff8e1 100%)',
        'gold-line': 'linear-gradient(90deg, transparent, #f0b429, transparent)',
        'gold-radial': 'radial-gradient(circle at 30% 20%, rgba(240,180,41,0.25), transparent 55%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")"
      },
      boxShadow: {
        soft: '0 20px 80px rgba(92, 66, 19, 0.10)',
        glow: '0 0 0 1px rgba(240,180,41,0.25), 0 20px 70px rgba(15,23,42,0.10)',
        gold: '0 10px 30px -8px rgba(240,180,41,0.55)',
        'gold-lg': '0 24px 60px -12px rgba(201,147,47,0.45)',
        'inner-gold': 'inset 0 1px 0 0 rgba(255,255,255,0.5), inset 0 -1px 0 0 rgba(201,147,47,0.25)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'glow-pulse': {
          '0%, 100%': { opacity: 0.55, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.06)' }
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      },
      animation: {
        shimmer: 'shimmer 2.5s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3.5s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite'
      },
      backgroundSize: {
        '200%': '200% 200%'
      }
    }
  },
  plugins: []
};
