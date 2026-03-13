export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full py-24 md:py-32"
      style={{ background: "#F5F6F0" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Left: Portrait Image */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5" }}>
          <img
            src="/images/artist-portrait.jpg"
            alt="Montserrat Mantilla en su estudio de arte, sosteniendo un pincel"
            className="w-full h-full object-cover object-center"
            style={{ filter: "saturate(0.88) contrast(1.04)" }}
          />
          {/* Subtle accent border */}
          <div
            className="absolute bottom-0 left-0 w-1/3 h-0.5"
            style={{ background: "#C9A99A" }}
            aria-hidden="true"
          />
        </div>

        {/* Right: Text Content */}
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Eyebrow */}
          <span
            className="font-sans uppercase tracking-[0.3em] text-xs"
            style={{ color: "#C9A99A", fontWeight: 500 }}
          >
            Sobre Mí
          </span>

          {/* Heading */}
          <h2
            id="about-heading"
            className="font-serif text-balance"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              fontWeight: 300,
              letterSpacing: "0.02em",
              lineHeight: 1.15,
              color: "#1A1A1A",
            }}
          >
            Pasión convertida<br className="hidden md:block" /> en arte
          </h2>

          {/* Divider */}
          <div
            className="w-10 border-t"
            style={{ borderColor: "#C9A99A" }}
            aria-hidden="true"
          />

          {/* Body paragraphs */}
          <div
            className="flex flex-col gap-5 font-sans leading-relaxed"
            style={{ color: "#6B6257", fontWeight: 300, fontSize: "1rem" }}
          >
            <p>
              Nací rodeada de colores, texturas y formas. Desde pequeña, el arte fue mi lenguaje — una forma de traducir emociones que las palabras no alcanzaban a contener. Hoy, con más de una década de trayectoria, cada obra que creo lleva en su interior un pedazo de mi historia.
            </p>
            <p>
              Mi técnica combina el óleo tradicional con capas de acrílico y medios mixtos, creando superficies ricas y vivas que invitan a ser contempladas. Me inspiro en la naturaleza, la memoria y la belleza efímera de lo cotidiano — en ese instante preciso donde la luz transforma lo ordinario en extraordinario.
            </p>
            <p>
              Cada encargo es una colaboración. Escucho la historia detrás de cada solicitud y la transformo en una pieza única, irrepetible, que habita el espacio y el corazón de quien la recibe.
            </p>
          </div>

          {/* CTA text link */}
          <a
            href="#catalog"
            className="inline-flex items-center gap-2 font-sans uppercase tracking-[0.2em] text-xs transition-all duration-300 hover:gap-4 focus:outline-none focus-visible:underline group"
            style={{ color: "#1A1A1A", fontWeight: 500, marginTop: "0.5rem" }}
            aria-label="Ver el catálogo de obras de Montserrat Mantilla"
          >
            Ver mi trabajo
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
