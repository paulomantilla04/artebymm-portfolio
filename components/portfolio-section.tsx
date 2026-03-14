import { Scheherazade_New } from "next/font/google"

const scheherazade = Scheherazade_New({
  weight: ["400", "500", "600", "700"],
});

export function PortfolioSection() { 
  const works = [
    { id: 1, src: '/images/messi-1.jpg', alt: 'obra de arte 1'},
    { id: 2, src: '/images/messi-2.jpg', alt: 'obra de arte 2'},
    { id: 3, src: '/images/messi-1.jpg', alt: 'obra de arte 3'},
    { id: 4, src: '/images/messi-2.jpg', alt: 'obra de arte 4'},
    { id: 5, src: '/images/messi-1.jpg', alt: 'obra de arte 5'},
    { id: 6, src: '/images/messi-2.jpg', alt: 'obra de arte 6'},
  ]
  
  return (
      <section
        id="portfolio"
        aria-labelledby="portfolio-heading"
        className="w-full py-24 md:py-32 bg-[#F5F6F0]"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col gap-12 md:gap-16">
          
          {/* Encabezado */}
          <div className="flex flex-col items-center text-center">

            <h2
              id="portfolio-heading"
              className="font-serif text-balance font-light"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.4rem)",
                letterSpacing: "0.02em",
                lineHeight: 1.15,
                color: "#1A1A1A",
              }}
            >
              MI <span className="font-semibold">PORTAFOLIO</span>
            </h2>
            
            {/* Divisor */}
            <div
              className="w-10 border-t mt-8"
              style={{ borderColor: "#C9A99A" }}
              aria-hidden="true"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {works.map((work) => (
              <div 
                key={work.id} 
                className="relative w-full overflow-hidden group cursor-pointer bg-neutral-100"
                style={{ aspectRatio: "4/6" }} // Mantiene la proporción 400x500
              >
                <img
                  src={work.src}
                  alt={work.alt}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: "saturate(0.9) contrast(1.05)" }}
                />
                {/* Overlay sutil oscuro al pasar el mouse (efecto premium) */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" aria-hidden="true" />
              </div>
            ))}
          </div>
  
          
        </div>
      </section>
    );
}