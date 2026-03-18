import Image from "next/image"

export function Footer() {
  return (
    <footer
      className="w-full py-12 px-6 md:px-12"
      style={{ background: "#F5F6F0", color: "rgba(250,247,242,0.4)" }}
      aria-label="Pie de página"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/images/montse-firma.PNG"
            alt="Logo Montserrat Mantilla"
            width={160}
            height={58}
            className="w-40 h-auto"
          />
          <p className="text-xs text-black tracking-[0.18em] font-serif uppercase">Artista | Pintura en Óleo</p>
        </div>

        <p className="font-sans text-xs tracking-[0.18em] uppercase text-center text-black">
          © {new Date().getFullYear()} Artebymm — Todos los derechos reservados
        </p>

        <a href="https://paulomantilla.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-sans text-xs text-black tracking-[0.18em] uppercase text-center">
          POWERED BY PAULO MANTILLA
        </a>
      </div>
    </footer>
  )
}
