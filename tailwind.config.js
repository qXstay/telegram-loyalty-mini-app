/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 24px 50px -28px rgba(71, 45, 24, 0.28)',
        float: '0 30px 70px -35px rgba(91, 57, 32, 0.32)',
      },
      colors: {
        canvas: '#efe2d2',
        ink: '#2f2018',
        mist: '#fbf5ef',
        line: '#decdbd',
        accent: '#8f5c39',
        gold: '#bf8754',
        espresso: '#4b3022',
        caramel: '#b98558',
        latte: '#d9b79b',
        foam: '#fffaf4',
        sage: '#7b8662',
      },
      fontFamily: {
        sans: ['"Avenir Next"', '"Segoe UI Variable Display"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'app-glow':
          'radial-gradient(circle at top, rgba(255,250,245,0.96) 0%, rgba(255,243,232,0.85) 22%, rgba(239,226,210,0.92) 56%, rgba(230,211,193,1) 100%)',
      },
    },
  },
  plugins: [],
}
