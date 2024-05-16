import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      screens: {
        xl: '1222px'
      }
    },
    extend: {
      backgroundImage: {
        'banner-conq': "url('/banners/conq.png')",
        'cart-header': "url('/banner-cart-header.png')",
        'cart-header-product-type': "url('/banner-product-type.png')",
        'super-discount': "url('/background-super-discount.png')",
        'confetti-signup': "url('/confetti-signup.gif')",
        'coupon-details': "url('/coupons/coupon-details-background.svg')",
        'order-progress-line': "url('/orders/progress-line.svg')",
        'vendor-info': "url('/icons/frame-company.svg')",
        coupon: "url('/coupons/coupon-background.svg')",
        header: "url('/header-background.svg')"
      },
      backgroundSize: {
        'full-size': '100% 100%'
      },
      boxShadow: {
        coupon: '0px 4px 10px 0px rgba(0, 0, 0, 0.12), 0px 4px 12px 0px rgba(0, 0, 0, 0.12)',
        'dark-gray':
          '0px 20px 25px 0px rgba(77, 77, 79, 0.04), 0px 12.326px 9.861px 0px rgba(77, 77, 79, 0.04), 0px 6.546px 5.237px 0px rgba(77, 77, 79, 0.03), 0px 2.724px 2.179px 0px rgba(77, 77, 79, 0.02)'
      },
      colors: {
        // https://icolorpalette.com/color
        // https://chir.ag/projects/name-that-color/
        // https://www.colorhexa.com/
        // can set value here, no need to set CSS root variable
        // Only use root variable when Javascript needs it
        'athens-gray-solid': '#eef0f3',
        'athens-gray': '#f5f5f6',
        'autumn-bloom': '#ffe1cc',
        'azure-radiance': '#007aff',
        'black-rock': '#13012f',
        'blue-ribbon': '#0569fb',
        'blue-sparkle': '#0075ff',
        'dodger-blue': '#3d94ff',
        'dusty-gray': '#979797',
        'gainsboro-solid': '#dcdcdc',
        'gray-10': '#e6e7e8',
        'gray-40': '#a7a9ac',
        'international-orange': '#ff5a00',
        'lock-account': '#eaf4ff',
        'mourn-mountain-snow': '#eaebec',
        'neo-tokyo-grey': '#bcbec0',
        'north-texas-green': '#0a9830',
        'peach-cream': '#ffecdf',
        'red-solid': '#ff0000',
        'regent-st-blue': '#a0c1e5',
        'rose-tonic': '#ffdfdf',
        'santas-gray': '#999da9',
        'sefid-white': '#fff0f0',
        'silver-sand': '#c7c8ca',
        'stone-cairn': '#8a8c8e',
        'super-silver': '#f1f1f1',
        'tuft-bush': '#ffe2ce',
        'unbur-pink': '#fbe7e7',
        'vivid-orange': '#ff7917',
        'web-orange': '#ffa500',
        'white-smoke': '#f2f2f2',
        'wild-sand': '#f6f6f6',
        abbey: '#4d4d4f',
        alabaster: '#f8f7f7',
        alto: '#d9d9d9',
        brilliance: '#fcfcfc',
        doctor: '#fafafa',
        gainsboro: '#e3e3e3',
        gallery: '#f0f0f0',
        iron: '#e6e7e8',
        lighthouse: '#f6f7f7',
        mercury: '#e9e9e9',
        nevada: '#6d6e71',
        pumpkin: '#ff7a1a',
        red: '#f00f00',
        sazerac: '#fff2df',
        silver: '#c8c8c8',
        snowflake: '#f1f2f2',
        steam: '#ddd',
        thunder: '#231f20',
        vermilion: '#ee2d0c',
        zumthor: '#eaf4ff',

        // use hsl
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '1xl': '1.25rem'
      },
      fontSize: {
        '10': '0.625rem',
        '12': '0.75rem',
        '14': '0.875rem',
        '16': '1rem',
        '18': '1.125rem',
        '20': '1.25rem',
        '24': '1.5rem',
        '32': '2rem'
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        roboto: ['var(--font-roboto)']
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      screens: {
        xs: '475px',
        xl: '1222px'
      },
      container: {
        center: true,
        padding: '1.25rem'
      },
      transitionProperty: {
        'height-500': 'height 500ms'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#ff6b00'
        }
      }
    ],
    prefix: 'dy-'
  }
} satisfies Config

export default config
