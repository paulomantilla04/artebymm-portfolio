import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { PortfolioSection } from '@/components/portfolio-section'
import TestimonialsSection from '@/components/testimonials-section'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Arte Personalizado',
  description:
    'Retratos al óleo, retratos digitales y llaveros personalizados por Montserrat Mantilla. Encarga una obra única hecha con alma.',
  alternates: {
    canonical: '/',
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Montserrat Mantilla',
  url: 'https://artebymm.com',
  jobTitle: 'Artista visual',
  knowsAbout: ['Retratos al óleo', 'Retratos digitales', 'Arte personalizado'],
  sameAs: [
    'https://www.instagram.com/artebymm/',
    'https://www.tiktok.com/@artebymm_',
    'https://www.facebook.com/share/1Doj2fHZR1/?mibextid=wwXIfr',
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <main>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <TestimonialsSection />
        <Footer />
      </main>
    </>
  )
}
