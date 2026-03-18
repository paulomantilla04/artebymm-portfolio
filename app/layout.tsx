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

const siteName = 'Montserrat Mantilla'
const siteUrl = 'https://artebymm.com'
const description =
  'Artista visual especializada en arte personalizado. Descubre obras únicas creadas con pasión, técnica y alma.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Montserrat Mantilla — Arte Personalizado',
    template: '%s | Montserrat Mantilla',
  },
  description,
  alternates: {
    canonical: '/',
  },
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
    'arte',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: siteUrl,
    siteName,
    title: 'Montserrat Mantilla — Arte Personalizado',
    description,
    images: [
      {
        url: '/images/studio-montse.jpeg',
        width: 1200,
        height: 630,
        alt: 'Montserrat Mantilla - Arte Personalizado',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Montserrat Mantilla — Arte Personalizado',
    description,
    images: ['/images/studio-montse.jpeg'],
  },
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
      'max-video-preview': -1,
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
