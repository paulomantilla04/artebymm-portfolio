"use client"

import { ChevronDown } from "lucide-react"

export function HeroSection() {
  return (
    <section
      id="home"
      aria-label="Portada"
      className="relative flex items-center justify-center w-full"
      style={{ height: "100vh", minHeight: "600px" }}
    >
      {/* Background Image */}
      <img
        src="/images/studio-montse.jpeg"
        alt="Estudio de arte — pinceles y paleta de colores cálidos sobre lienzo"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ zIndex: 0 }}
        fetchPriority="high"
      />

      {/* Dark overlay at exactly 50% */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.5)", zIndex: 1 }}
        aria-hidden="true"
      />

      {/* Centered content */}
      <div
        className="relative flex flex-col items-center justify-center text-center px-6 gap-5"
        style={{ zIndex: 2 }}
      >
        {/* Main title */}
        <h1
          className="font-serif text-white uppercase text-balance"
          style={{
            fontSize: "clamp(2.4rem, 7vw, 6.5rem)",
            fontWeight: 300,
            letterSpacing: "0.12em",
            lineHeight: 1.08,
          }}
        >
          Montserrat Mantilla
        </h1>

        {/* Subtitle */}
        <p
          className="font-sans text-white/80 uppercase tracking-[0.35em] text-sm md:text-base"
          style={{ fontWeight: 400 }}
        >
          Arte Personalizado
        </p>

        {/* Divider */}
        <div
          className="w-12 border-t"
          style={{ borderColor: "rgba(201,169,154,0.6)" }}
          aria-hidden="true"
        />

        {/* CTA Button */}
        <a
          href="#catalog"
          className="mt-2 inline-block font-sans text-white/90 uppercase tracking-[0.22em] bg-[#BB9C87] text-xs border px-8 py-4 transition-all duration-400 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          style={{
            borderColor: "#BB9C87",
            fontWeight: 500,
            letterSpacing: "0.22em",
          }}
          aria-label="Ver el catálogo de obras"
        >
          Ver Catálogo
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-0 right-0 flex justify-center"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      >
        <ChevronDown
          size={24}
          strokeWidth={1.2}
          className="text-white/50 animate-bounce"
          style={{ animationDuration: "2s" }}
        />
      </div>
    </section>
  )
}
