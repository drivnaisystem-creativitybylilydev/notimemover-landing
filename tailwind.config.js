/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // NoTimeMover dark palette (per client PDF)
        ink: '#000000',         // page background
        coffee: '#2A1405',      // primary surface / accent
        'coffee-deep': '#4b2e1e', // secondary surface / recommended highlight
        'coffee-light': '#6B3A1F',
        bone: '#F5F1EB',        // muted off-white for body copy
        line: '#1F1A17',        // subtle borders on dark bg
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
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
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'sway': 'sway 4s ease-in-out infinite',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
}
