import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://artebymm.com'),
  title: {
    default: 'Montserrat Mantilla — Arte Personalizado',
    template: '%s | Montserrat Mantilla',
  },
  description: 'Artista visual especializada en arte personalizado. Descubre obras únicas creadas con pasión, técnica y alma.',
  keywords: [
    'arte personalizado',
    'artista visual',
    'commissions de arte',
    'ilustración personalizada',
    'Montserrat Mantilla',
    'arte único',
    'pintura personalizada',
    'retratos al oleo',
    'retratos digitales',
    'llaveros personalizados',
    'llaveros',
    'retratos',
    'arte'
  ],
  icons: {
     icon: '/icon-mm.png',
     shortcut: '/icon-mm.png',
     apple: '/apple-mm.png', 
   },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${cormorant.variable} ${jost.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
