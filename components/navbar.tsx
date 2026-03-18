"use client"

import Image from "next/image"
import { useEffect, useState, useCallback } from "react"
import { X, Menu } from "lucide-react"

const navLinks = [
  { label: "Inicio", href: "/#home" },
  { label: "Acerca de mi", href: "/#about" },
  { label: "Portafolio", href: "/#portfolio" },
  { label: "Testimonios", href: "/#testimonials" },
  { label: "Catalogo", href: "/catalogo" },
  { label: "FAQ", href: "/faq" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 0)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 md:h-20"
        style={{
          background: scrolled ? "rgba(255,255,255,0.15)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent",
          transition: "all 0.4s ease",
        }}
      >
        <a
          href="#home"
          className="font-serif text-2xl md:text-3xl tracking-wide text-white"
          style={{ fontWeight: 400, letterSpacing: "0.04em" }}
          aria-label="Montserrat Mantilla — Arte Personalizado, ir al inicio"
        >
          <Image
            src="/images/montse-firma.PNG"
            alt="Logo Montserrat Mantilla"
            width={144}
            height={52}
            priority
            className="w-36 h-auto"
          />
        </a>

        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menú de navegación"
          aria-expanded={menuOpen}
          aria-controls="fullscreen-menu"
          className="text-white bg-[#BB9C87] rounded-xl p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-opacity hover:opacity-70"
        >
          <Menu size={28} strokeWidth={1.5} />
        </button>
      </nav>

      <div
        id="fullscreen-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación completo"
        className="fixed inset-0 z-100 flex flex-col items-center justify-center"
        style={{
          background: "rgba(20,16,12,0.92)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity 0.4s ease",
        }}
      >
        <button
          onClick={closeMenu}
          aria-label="Cerrar menú de navegación"
          className="absolute top-5 right-6 md:top-8 md:right-12 text-white/70 hover:text-white p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-colors"
        >
          <X size={28} strokeWidth={1.2} />
        </button>

        <nav aria-label="Fullscreen navigation">
          <ul className="flex flex-col items-center gap-8 md:gap-10 list-none p-0 m-0">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="font-serif text-4xl md:text-6xl text-white/80 hover:text-white tracking-widest uppercase transition-all duration-300 focus:outline-none focus-visible:text-white"
                  style={{
                    fontWeight: 300,
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 0.5s ease ${0.1 + i * 0.07}s, transform 0.5s ease ${0.1 + i * 0.07}s, color 0.3s ease`,
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
