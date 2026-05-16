/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // NoTimeMover dark palette (per client PDF) — premium tuning
        ink: '#050505',         // OLED-tier page background (not pure black)
        obsidian: '#0A0606',    // primary surface (modals, cards)
        coffee: '#2A1405',      // accent surface (recommended highlight bg)
        'coffee-deep': '#4b2e1e', // secondary accent
        'coffee-light': '#6B3A1F',
        mahogany: '#6B3A1F',
        bone: '#F5F1EB',        // muted off-white for body copy
        line: '#1F1A17',        // subtle borders on dark bg
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'SF Pro Display', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'SF Mono', 'monospace'],
        serif: ['var(--font-instrument-serif)', 'Instrument Serif', 'Lyon Text', 'Newsreader', 'serif'],
        // Legacy alias kept for backward-compat during transition
        montserrat: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
        '4xl': ['36px', '44px'],
        '5xl': ['48px', '54px'],
        '6xl': ['60px', '64px'],
        '7xl': ['72px', '76px'],
      },
      spacing: {
        '4xs': '4px',
        '3xs': '8px',
        '2xs': '12px',
        xs: '16px',
        sm: '24px',
        md: '32px',
        lg: '48px',
        xl: '64px',
        '2xl': '80px',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.32, 0.72, 0, 1)',
        'spring-snap': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        700: '700ms',
        900: '900ms',
      },
      boxShadow: {
        bezel: 'inset 0 1px 1px rgba(255,255,255,0.08)',
        'bezel-strong': 'inset 0 1px 1.5px rgba(255,255,255,0.12)',
        'glow-coffee': '0 0 60px -10px rgba(107,58,31,0.55)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'sway': 'sway 4.5s cubic-bezier(0.45, 0, 0.55, 1) infinite',
        'orb-a': 'orbA 28s ease-in-out infinite',
        'orb-b': 'orbB 34s ease-in-out infinite',
        /** Duplicated row → -50% seamless loop */
        'mass-marquee-fast': 'massMarquee 8s linear infinite',
        'mass-marquee-slow': 'massMarquee 28s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0, transform: 'translateY(10px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        sway: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        orbA: {
          '0%, 100%': { transform: 'translate3d(0%, 0%, 0) scale(1)' },
          '50%':      { transform: 'translate3d(8%, -6%, 0) scale(1.1)' },
        },
        orbB: {
          '0%, 100%': { transform: 'translate3d(0%, 0%, 0) scale(1.05)' },
          '50%':      { transform: 'translate3d(-10%, 8%, 0) scale(0.95)' },
        },
        massMarquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
