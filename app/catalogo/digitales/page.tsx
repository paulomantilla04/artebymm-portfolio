"use client"

import { useMemo, useState } from "react"
import { Minus, Plus } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ProductCarousel } from "@/components/catalog/product-carousel"
import { Scheherazade_New } from "next/font/google"
import { motion, Variants, useReducedMotion } from "motion/react"
import { FaWhatsapp } from "react-icons/fa"

const scheherazade = Scheherazade_New({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})

const carouselImages = [
  "/images/digitales/digital-4.avif",
  "/images/digitales/digital-2.avif",
  "/images/digitales/digital-3.avif",
  "/images/digitales/digital-1.avif",
  "/images/digitales/digital-5.avif",
]

const currencyCodes = ["MXN", "USD", "EUR"] as const
type CurrencyCode = (typeof currencyCodes)[number]

const BASE_PRICE: Record<CurrencyCode, number> = {
  MXN: 1950,
  USD: 120,
  EUR: 110,
}
const BASE_INCLUDED = 2
const EXTRA_PERSON_PRICE: Record<CurrencyCode, number> = {
  MXN: 350,
  USD: 20,
  EUR: 18,
}
const PET_PRICE: Record<CurrencyCode, number> = {
  MXN: 250,
  USD: 15,
  EUR: 14,
}

const formatPrice = (amount: number, currency: CurrencyCode) => {
  const symbol = currency === "EUR" ? "€" : "$"
  return `${symbol}${new Intl.NumberFormat("es-MX", {
    maximumFractionDigits: 0,
  }).format(amount)} ${currency}`
}

export default function DigitalesPage() {
  const reduceMotion = useReducedMotion()
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("MXN")
  const [extraPeople, setExtraPeople] = useState(0)
  const [pets, setPets] = useState(0)

  const containerStagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.06,
            delayChildren: 0.04,
          },
        },
      }

  const fadeInUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.28, ease: "easeOut" },
        },
      }

  const totalPrice = useMemo(() => {
    return (
      BASE_PRICE[selectedCurrency] +
      extraPeople * EXTRA_PERSON_PRICE[selectedCurrency] +
      pets * PET_PRICE[selectedCurrency]
    )
  }, [extraPeople, pets, selectedCurrency])

  const totalPeople = BASE_INCLUDED + extraPeople

  const contactWhatsApp = () => {
    const message = `Hola, estoy interesad@ en un retrato digital. \nMoneda: ${selectedCurrency}. \nElegí ${totalPeople} personas y ${pets} mascota(s). \nTotal estimado: ${formatPrice(totalPrice, selectedCurrency)}.`
    const url = `https://wa.me/9221994995?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  const resetConfiguration = () => {
    setSelectedCurrency("MXN")
    setExtraPeople(0)
    setPets(0)
  }

  return (
    <main>
      <Navbar />
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F5F6F0] py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerStagger}
          className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 md:px-12 lg:grid-cols-2 lg:gap-16"
        >
          <motion.div variants={fadeInUp}>
            <ProductCarousel images={carouselImages} alt="Retrato digital" />
          </motion.div>

          <motion.div variants={containerStagger} className="flex flex-col justify-center gap-6 lg:gap-8">
            <motion.h1
              variants={fadeInUp}
              className={`${scheherazade.className} text-balance text-4xl font-light uppercase md:text-5xl`}
              style={{ color: "#1A1A1A", lineHeight: 1.1 }}
            >
              Retratos Digitales
            </motion.h1>

            <motion.p variants={fadeInUp} className="max-w-xl text-zinc-600">
              Retratos personalizados a partir de tu foto (se pueden unir fotos diferentes). Archivo
              digital en alta resolución listo para imprimir.
            </motion.p>

            <motion.p variants={fadeInUp} className="max-w-xl text-zinc-600 text-sm font-medium">
              IMPORTANTE: Para agendarte y apartar tu lugar se hace el 50% de anticipo y el otro 50% al
              momento de mostrarte el primer avance. Se te manda foto por cualquier cambio que quieras hacer
              antes de enviar.
            </motion.p>

            <motion.div variants={fadeInUp} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-700">
                Moneda
              </p>
              <div className="flex flex-wrap gap-2">
                {currencyCodes.map((currency) => {
                  const isActive = selectedCurrency === currency

                  return (
                    <button
                      key={currency}
                      type="button"
                      onClick={() => setSelectedCurrency(currency)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
                        isActive
                          ? "border-[#433328] bg-[#433328] text-white"
                          : "border-zinc-300 bg-white text-zinc-700 hover:border-[#433328] hover:text-[#433328]"
                      }`}
                    >
                      {currency}
                    </button>
                  )
                })}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4 rounded-xl border border-[#DCCFC6] bg-white/80 p-6">
              <div className="flex items-center justify-between">
                <p className="text-zinc-700">Incluye {BASE_INCLUDED} personas</p>
                <p className="font-semibold text-[#433328]">{formatPrice(BASE_PRICE[selectedCurrency], selectedCurrency)}</p>
              </div>

              <div className="space-y-3 rounded-lg bg-[#F7F2EE] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-zinc-800">Personas extra</p>
                    <p className="text-sm text-zinc-600">+{formatPrice(EXTRA_PERSON_PRICE[selectedCurrency], selectedCurrency)} c/u</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      onClick={() => setExtraPeople((prev) => Math.max(0, prev - 1))}
                      aria-label="Disminuir personas extra"
                    >
                      <Minus />
                    </Button>
                    <span className="min-w-7 text-center text-base font-semibold text-zinc-800">{extraPeople}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      onClick={() => setExtraPeople((prev) => prev + 1)}
                      aria-label="Aumentar personas extra"
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-zinc-800">Mascota</p>
                    <p className="text-sm text-zinc-600">+{formatPrice(PET_PRICE[selectedCurrency], selectedCurrency)} c/u</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      onClick={() => setPets((prev) => Math.max(0, prev - 1))}
                      aria-label="Disminuir mascotas"
                    >
                      <Minus />
                    </Button>
                    <span className="min-w-7 text-center text-base font-semibold text-zinc-800">{pets}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      onClick={() => setPets((prev) => prev + 1)}
                      aria-label="Aumentar mascotas"
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-1 border-t border-[#E6D8CF] pt-3">
                <p className="text-sm text-zinc-600">
                  Configuración actual: {totalPeople} personas y {pets} mascota(s).
                </p>
                <p className="text-2xl font-semibold text-[#433328]">Total: {formatPrice(totalPrice, selectedCurrency)}</p>
              </div>

              <button
                type="button"
                onClick={resetConfiguration}
                className="w-full cursor-pointer rounded border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors duration-150 hover:border-[#433328] hover:text-[#433328]"
              >
                Reiniciar configuración
              </button>

              <button
                onClick={contactWhatsApp}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-green-600 p-3 font-semibold text-white transition-all duration-300 hover:scale-[98%] hover:bg-green-700"
              >
                Contactar por WhatsApp
                <FaWhatsapp size={20} />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </main>
  )
}
