export function Footer() {
  return (
    <footer
      className="w-full py-12 px-6 md:px-12"
      style={{ background: "#1A1A1A", color: "rgba(250,247,242,0.4)" }}
      aria-label="Pie de página"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span
          className="font-serif text-xl tracking-wide"
          style={{ color: "rgba(250,247,242,0.7)", fontWeight: 300 }}
        >
          Montserrat Mantilla
        </span>

        <p className="font-sans text-xs tracking-[0.18em] uppercase text-center">
          © {new Date().getFullYear()} Arte Personalizado — Todos los derechos reservados
        </p>

        <nav aria-label="Redes sociales">
          <ul className="flex gap-6 list-none p-0 m-0">
            {["Instagram", "Pinterest"].map((social) => (
              <li key={social}>
                <a
                  href="#"
                  className="font-sans text-xs uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[#C9A99A] focus:outline-none focus-visible:text-[#C9A99A]"
                  style={{ color: "rgba(250,247,242,0.4)" }}
                  aria-label={`Visitar perfil de Instagram de Montserrat Mantilla`}
                >
                  {social}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
