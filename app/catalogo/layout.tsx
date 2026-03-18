import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Catálogo',
  description:
    'Explora el catálogo de Artebymm: retratos al óleo, retratos digitales y llaveros personalizados.',
  alternates: {
    canonical: '/catalogo',
  },
}

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return children
}
