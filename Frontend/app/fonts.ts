import { Inter, Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['vietnamese'],
  display: 'swap',
  variable: '--font-roboto'
})

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['vietnamese'],
  display: 'swap',
  variable: '--font-inter'
})

export { inter, roboto }
