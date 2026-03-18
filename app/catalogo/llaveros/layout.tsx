import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Llaveros Personalizados',
  description:
    'Mini retratos personalizados tipo llavero con acabado artesanal y opciones de personalización.',
  alternates: {
    canonical: '/catalogo/llaveros',
  },
}

export default function LlaverosLayout({ children }: { children: React.ReactNode }) {
  return children
}
