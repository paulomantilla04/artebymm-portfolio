export function Footer() {
  return (
    <footer
      className="w-full py-12 px-6 md:px-12"
      style={{ background: "#1A1A1A", color: "rgba(250,247,242,0.4)" }}
      aria-label="Pie de página"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <img src="/images/montse-firma.PNG" alt="Logo Montserrat Mantilla" className="w-40" />

        <p className="font-sans text-xs tracking-[0.18em] uppercase text-center">
          © {new Date().getFullYear()} Artebymm — Todos los derechos reservados
        </p>

        <a href="https://paulomantilla.vercel.app/" target="_blank" className="font-sans text-xs tracking-[0.18em] uppercase text-center">
          POWERED BY PAULO MANTILLA
        </a>
      </div>
    </footer>
  )
}
