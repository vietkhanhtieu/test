import FloatingChatWidget from '@/components/FloatingChatWidget/FloatingChatWidget'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

import MarketingApi from './MarketingApi'
import { StoreProvider } from './StoreProvider'
import './app.css'
import { roboto } from './fonts'
import { Footer, Header } from './ui/layouts'

interface Props {
  readonly children: ReactNode
}

export const metadata: Metadata = {
  title: 'Trung Tâm Dược Phẩm',
  description: 'Trung Tâm Dược Phẩm'
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <body className={`body ${roboto.variable} bg-alabaster font-roboto text-abbey`}>
        <StoreProvider>
          <Header />
          <main className='mb-24'>{children}</main>
          <Footer />
          <FloatingChatWidget />
          <MarketingApi />
        </StoreProvider>
      </body>
    </html>
  )
}
