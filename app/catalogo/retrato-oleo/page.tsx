"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Scheherazade_New } from "next/font/google"
import { retratoOleoSizes } from "@/lib/products/retrato-oleo"
import { AnimatePresence, motion, Variants, useReducedMotion } from "motion/react"
import { FaWhatsapp } from "react-icons/fa";

const scheherazade = Scheherazade_New({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})

const carouselImages = [
  "/images/retrato-5.avif",
  "/images/retrato-2.avif",
  "/images/retrato-1.avif",
  "/images/retrato-7.avif",
  "/images/retrato-10.avif",
  "/images/retrato-8.avif",
]

export default function PinturaOleoPage() {
  const reduceMotion = useReducedMotion()
  const [selectedSizeId, setSelectedSizeId] = useState("20x20")
  const [activeImage, setActiveImage] = useState(0)
  const [isSwitchingImage, setIsSwitchingImage] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})

  const markImageAsLoaded = useCallback((src: string) => {
    setLoadedImages((prev) => (prev[src] ? prev : { ...prev, [src]: true }))
  }, [])

  const preloadImage = useCallback(
    (src: string) => {
      if (typeof window === "undefined" || loadedImages[src]) {
        return Promise.resolve()
      }

      return new Promise<void>((resolve) => {
        const img = new window.Image()
        img.src = src

        if (img.complete) {
          markImageAsLoaded(src)
          resolve()
          return
        }

        img.onload = () => {
          markImageAsLoaded(src)
          resolve()
        }

        img.onerror = () => resolve()
      })
    },
    [loadedImages, markImageAsLoaded],
  )

  useEffect(() => {
    carouselImages.forEach((src) => {
      void preloadImage(src)
    })
  }, [preloadImage])

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

  const selectedSize = useMemo(() => {
    return retratoOleoSizes.find((item) => item.id === selectedSizeId) ?? retratoOleoSizes[0]
  }, [selectedSizeId])

  const changeImage = useCallback(
    async (nextIndex: number) => {
      if (nextIndex === activeImage) return

      const nextSrc = carouselImages[nextIndex]

      if (!loadedImages[nextSrc]) {
        setIsSwitchingImage(true)
        await preloadImage(nextSrc)
      }

      setActiveImage(nextIndex)
      setIsSwitchingImage(false)
    },
    [activeImage, loadedImages, preloadImage],
  )

  const goPrevImage = () => {
    const next = (activeImage - 1 + carouselImages.length) % carouselImages.length
    void changeImage(next)
  }

  const goNextImage = () => {
    const next = (activeImage + 1) % carouselImages.length
    void changeImage(next)
  }
  
  const contactWhatsApp = (size: string) => {
    const message = `Hola, estoy interesad@ en el retrato ${size}`
    const url = `https://wa.me/9221994995?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
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
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-zinc-200 shadow-lg">
              <AnimatePresence initial={false} mode="wait">
                <motion.img
                  key={activeImage}
                  src={carouselImages[activeImage]}
                  alt="Retrato al óleo"
                  className="absolute inset-0 h-full w-full object-cover"
                  onLoad={() => markImageAsLoaded(carouselImages[activeImage])}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: "easeOut" }}
                />
              </AnimatePresence>

              {isSwitchingImage ? (
                <div
                  className="absolute inset-0 animate-pulse bg-linear-to-r from-black/10 via-white/15 to-black/10"
                  aria-hidden="true"
                />
              ) : null}

              <button
                type="button"
                onClick={goPrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white transition-colors duration-150 hover:bg-black/60"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={goNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white transition-colors duration-150 hover:bg-black/60"
                aria-label="Siguiente imagen"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="flex justify-center gap-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => void changeImage(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors duration-150 ${
                    activeImage === index ? "bg-[#BB9C87]" : "bg-zinc-300 hover:bg-zinc-400"
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          <motion.div variants={containerStagger} className="flex flex-col justify-center gap-6 lg:gap-8">
            <motion.h1
              variants={fadeInUp}
              className={`${scheherazade.className} text-balance text-4xl font-light uppercase md:text-5xl`}
              style={{ color: "#1A1A1A", lineHeight: 1.1 }}
            >
              Retrato al Óleo
            </motion.h1>

            <motion.p variants={fadeInUp} className="max-w-xl text-zinc-600">
              Cada retrato es una pieza única hecha a mano. Elige el tamaño ideal para tu espacio y te
              mostraré el precio y condiciones correspondientes.
            </motion.p>
            
            <motion.p variants={fadeInUp} className="max-w-xl text-zinc-600 font-medium text-sm">
              IMPORTANTE: Para agendarte y apartar tu lugar se hace el 50% de anticipo y el otro 50% al momento de mostrarte el primer avance. Se te manda foto por cualquier cambio que quieras hacer antes de enviar.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
              {retratoOleoSizes.map((size) => {
                const isActive = size.id === selectedSize.id

                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSizeId(size.id)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? "border-[#BB9C87] bg-[#BB9C87] text-white"
                        : "border-zinc-300 bg-white text-zinc-700 hover:border-[#BB9C87] hover:text-[#433328]"
                    }`}
                  >
                    {size.title}
                  </button>
                )
              })}
            </motion.div>

            <motion.div
              key={selectedSize.id}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: "easeOut" }}
              className="space-y-3 rounded-xl border border-[#DCCFC6] bg-white/80 p-6"
            >
              <h2 className={`${scheherazade.className} text-2xl font-medium text-[#2E251F]`}>
                {selectedSize.title}
              </h2>

              <p className="text-xl font-semibold text-[#433328]">{selectedSize.price}</p>

              <p className="text-zinc-700">{selectedSize.description}</p>

              <p className="font-medium text-zinc-800">{selectedSize.included}</p>

              {selectedSize.extraPerson ? (
                <p className="text-sm text-[#7B5E4C]">{selectedSize.extraPerson}</p>
              ) : null}
              
              <button onClick={() => contactWhatsApp(selectedSize.title)} className="bg-green-600 text-white rounded p-3 w-full font-semibold flex items-center justify-center gap-2 hover:bg-green-700 hover:scale-[98%] cursor-pointer transition-all duration-300">
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
