"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

type ProductCarouselProps = {
  images: string[]
  alt: string
  className?: string
}

export function ProductCarousel({ images, alt, className }: ProductCarouselProps) {
  const reduceMotion = useReducedMotion()
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
    images.forEach((src) => {
      void preloadImage(src)
    })
  }, [images, preloadImage])

  const changeImage = useCallback(
    async (nextIndex: number) => {
      if (nextIndex === activeImage) return

      const nextSrc = images[nextIndex]

      if (!loadedImages[nextSrc]) {
        setIsSwitchingImage(true)
        await preloadImage(nextSrc)
      }

      setActiveImage(nextIndex)
      setIsSwitchingImage(false)
    },
    [activeImage, images, loadedImages, preloadImage],
  )

  const goPrevImage = () => {
    const next = (activeImage - 1 + images.length) % images.length
    void changeImage(next)
  }

  const goNextImage = () => {
    const next = (activeImage + 1) % images.length
    void changeImage(next)
  }

  if (images.length === 0) {
    return null
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-zinc-200 shadow-lg">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeImage}
            className="absolute inset-0 h-full w-full object-cover"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: "easeOut" }}
          >
            <Image
              src={images[activeImage]}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="absolute inset-0 h-full w-full object-cover"
              priority={activeImage === 0}
              onLoad={() => markImageAsLoaded(images[activeImage])}
            />
          </motion.div>
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
        {images.map((_, index) => (
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
    </div>
  )
}
