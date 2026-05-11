/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDF8F3',
        'brown-dark': '#2A1405',
        'orange-brand': '#E87020',
        brand: {
          orange: '#E87020',
          'orange-dark': '#C55E15',
          brown: '#3B1F0A',
          mahogany: '#6B3A1F',
          amber: '#F9A55A',
        },
        neutral: {
          cream: '#FAF7F2',
          linen: '#F3EDE4',
          sand: '#EDE4D8',
          body: '#1C1208',
          muted: '#6B5E52',
        },
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
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
        '6xl': ['60px', '72px'],
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
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'bounce-subtle': 'bounce-subtle 2s infinite',
      },
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
