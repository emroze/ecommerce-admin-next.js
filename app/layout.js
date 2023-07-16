import './globals.css'
import './stats.css'
import { Inter } from 'next/font/google'
import Providers from '@/components/providers'
import LogAuthPage from '@/components/logAuthPage'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ecommerce Emroze',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter?.className}>
      {/* <body> */}
        <Providers>
          <LogAuthPage>
            {children}
          </LogAuthPage>
        </Providers>
      </body>
    </html>
  )
}
