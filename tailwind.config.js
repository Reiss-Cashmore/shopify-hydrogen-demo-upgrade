import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './app/styles/**/*.{css}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        contrast: 'rgb(var(--color-contrast) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        surfaceHighlight: 'rgb(var(--color-surface-highlight) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        notice: 'rgb(var(--color-accent) / <alpha-value>)',
        stroke: 'rgb(var(--color-stroke) / <alpha-value>)',
        shopPay: 'rgb(var(--color-shop-pay) / <alpha-value>)',
      },
      screens: {
        sm: '32em',
        md: '48em',
        lg: '64em',
        xl: '80em',
        '2xl': '96em',
        'sm-max': {max: '48em'},
        'sm-only': {min: '32em', max: '48em'},
        'md-only': {min: '48em', max: '64em'},
        'lg-only': {min: '64em', max: '80em'},
        'xl-only': {min: '80em', max: '96em'},
        '2xl-only': {min: '96em'},
      },
      spacing: {
        nav: 'var(--height-nav)',
        screen: 'var(--screen-height, 100vh)',
      },
      height: {
        screen: 'var(--screen-height, 100vh)',
        'screen-no-nav':
          'calc(var(--screen-height, 100vh) - var(--height-nav))',
        'screen-dynamic': 'var(--screen-height-dynamic, 100vh)',
      },
      width: {
        mobileGallery: 'calc(100vw - 3rem)',
      },
      fontFamily: {
        sans: [
          '"Space Grotesk"',
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif',
        ],
        serif: ['"IBMPlexSerif"', 'Palatino', 'ui-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontWeight: {
        extrabold: '800',
        black: '900',
      },
      fontSize: {
        display: ['var(--font-size-display)', '1.1'],
        heading: ['var(--font-size-heading)', '1.25'],
        lead: ['var(--font-size-lead)', '1.333'],
        copy: ['var(--font-size-copy)', '1.5'],
        fine: ['var(--font-size-fine)', '1.333'],
      },
      letterSpacing: {
        tighter: '-0.03em',
      },
      maxWidth: {
        'prose-narrow': '45ch',
        'prose-wide': '80ch',
      },
      boxShadow: {
        border: 'inset 0px 0px 0px 1px rgb(var(--color-stroke) / 0.35)',
        darkHeader: 'inset 0px -1px 0px 0px rgba(10, 10, 25, 0.6)',
        lightHeader: 'inset 0px -1px 0px 0px rgba(242, 242, 255, 0.08)',
        glow: '0 25px 80px rgba(4, 6, 22, 0.65)',
        card: '0 20px 50px rgba(5, 6, 20, 0.45)',
      },
      backgroundImage: {
        'mesh-radial':
          'radial-gradient(circle at 20% 20%, rgba(255, 111, 159, 0.25), transparent 40%), radial-gradient(circle at 80% 0%, rgba(134, 214, 255, 0.22), transparent 35%), radial-gradient(circle at 50% 80%, rgba(255, 94, 129, 0.2), transparent 45%)',
        'grid-overlay':
          'linear-gradient(transparent 95%, rgba(255,255,255,0.08) 96%), linear-gradient(90deg, transparent 95%, rgba(255,255,255,0.08) 96%)',
      },
    },
  },
  plugins: [formsPlugin, typographyPlugin],
};

export default config;

