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
      MXN: "$2,650 MXN",
      USD: "$160 USD",
      EUR: "140€ EUR",
    },
    included: "Máximo 2 personas",
    description: "Ideal para retratos íntimos, mascotas o un recuerdo especial en formato pequeño.",
    extraPerson: null,
  },
  {
    id: "30x40",
    title: "30x40 cm",
    price: {
      MXN: "$3,900 MXN",
      USD: "$230 USD",
      EUR: "200€ EUR",
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
      MXN: "$4,900 MXN",
      USD: "$290 USD",
      EUR: "250€ EUR",
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
      MXN: "$5,900 MXN",
      USD: "$340 USD",
      EUR: "295€ EUR",
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
      MXN: "$10,000 MXN",
      USD: "$600 USD",
      EUR: "490€ EUR",
    },
    included: "Precio por 3 personas",
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
      MXN: "$12,500 MXN",
      USD: "$700 USD",
      EUR: "590€ EUR",
    },
    included: "Precio por 4 personas",
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
      MXN: "$16,000 MXN",
      USD: "$970 USD",
      EUR: "830€ EUR",
    },
    included: "Precio por 4 personas",
    description: "Mi formato más grande: pensado para homenajes familiares o retratos con muchos detalles y narrativa visual.",
    extraPerson: {
      MXN: "$2,000 MXN",
      USD: "$100 USD",
      EUR: "100€ EUR",
    },
  },
]
