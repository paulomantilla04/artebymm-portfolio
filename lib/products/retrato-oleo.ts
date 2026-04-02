export const currencyCodes = ["MXN", "USD", "EUR"] as const

export type CurrencyCode = (typeof currencyCodes)[number]

type PriceByCurrency = Record<CurrencyCode, string>

export type RetratoOleoSize = {
  id: string
  title: string
  price: PriceByCurrency
  included: string
  description: string
  extraPerson: PriceByCurrency | null
}

export const retratoOleoSizes: RetratoOleoSize[] = [
  {
    id: "20x20",
    title: "20x20 cm",
    price: {
      MXN: "$3,900 MXN",
      USD: "$230 USD",
      EUR: "200€ EUR",
    },
    included: "Máximo 2 personas",
    description: "Ideal para retratos íntimos, mascotas o un recuerdo especial en formato pequeño.",
    extraPerson: null,
  },
  {
    id: "30x40",
    title: "30x40 cm",
    price: {
      MXN: "$5,900 MXN",
      USD: "$340 USD",
      EUR: "295€ EUR",
    },
    included: "Precio por 2 personas",
    description: "Tamaño clásico y versátil. Perfecto para retratos familiares o de pareja.",
    extraPerson: {
      MXN: "$1,000 MXN",
      USD: "$60 USD",
      EUR: "60€ EUR",
    },
  },
  {
    id: "40x50",
    title: "40x50 cm",
    price: {
      MXN: "$6,900 MXN",
      USD: "$400 USD",
      EUR: "345€ EUR",
    },
    included: "Precio por 2 personas",
    description: "Tamaño clásico y versátil. Perfectos para retratos familiares o de pareja.",
    extraPerson: {
      MXN: "$1,000 MXN",
      USD: "$60 USD",
      EUR: "60€ EUR",
    },
  },
  {
    id: "50x70",
    title: "50x70 cm",
    price: {
      MXN: "$7,900 MXN",
      USD: "$450 USD",
      EUR: "390€ EUR",
    },
    included: "Precio por 2 personas",
    description:
      "Tamaño grande con alto nivel de detalle. Para homenajes, retratos familiares completos o piezas protagonistas.",
    extraPerson: {
      MXN: "$1,000 MXN",
      USD: "$60 USD",
      EUR: "60€ EUR",
    },
  },
  {
    id: "80x80",
    title: "80x80 cm",
    price: {
      MXN: "$12,500 MXN",
      USD: "$720 USD",
      EUR: "620€ EUR",
    },
    included: "Precio por 2 personas",
    description: "Cuadro cuadrado de gran impacto visual. Ideal para salas principales o espacios abiertos.",
    extraPerson: {
      MXN: "$1,600 MXN",
      USD: "$90 USD",
      EUR: "90€ EUR",
    },
  },
  {
    id: "100x100",
    title: "100x100 cm",
    price: {
      MXN: "$14,500 MXN",
      USD: "$830 USD",
      EUR: "715€ EUR",
    },
    included: "Precio por 2 personas",
    description: "Formato monumental y elegante. Una obra central para rendir homenaje a los vínculos más importantes.",
    extraPerson: {
      MXN: "$1,600 MXN",
      USD: "$90 USD",
      EUR: "90€ EUR",
    },
  },
  {
    id: "100x150",
    title: "100x150 cm",
    price: {
      MXN: "$17,000 MXN",
      USD: "$1,000 USD",
      EUR: "900€ EUR",
    },
    included: "Precio por 2 personas",
    description: "Mi formato más grande: pensado para homenajes familiares o retratos con muchos detalles y narrativa visual.",
    extraPerson: {
      MXN: "$2,000 MXN",
      USD: "$100 USD",
      EUR: "100€ EUR",
    },
  },
]
