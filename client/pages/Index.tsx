import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  ExternalLink,
  Instagram,
  Youtube,
  Mail,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Index() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="min-h-screen bg-beige">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-forest-green/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div
          className={`w-full px-6 xl:px-16 2xl:px-24 transition-all duration-300 ease-in-out ${
            isScrolled ? "py-2" : "py-4"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fb483dd511682401f9f00211e632d2fcf%2F86b6c0b2bd3546578e69525b96f2c572"
                alt="Bejaus Logo"
                className="w-auto transition-all duration-300 ease-in-out opacity-80 hover:opacity-100"
                style={{ height: isScrolled ? "48px" : "72px" }}
              />
            </div>

            {/* Navigation - Optional for future */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => {
                  const section = document.querySelector("#sobre-bejaus");
                  if (section) {
                    const offsetTop = section.offsetTop - 80;
                    window.scrollTo({
                      top: offsetTop,
                      behavior: "smooth",
                    });
                  }
                }}
                className="text-beige/80 hover:text-beige transition-colors text-sm font-medium"
              >
                Sobre nosotros
              </button>
              <button
                onClick={() => {
                  const section = document.querySelector("#eventos");
                  if (section) {
                    const offsetTop = section.offsetTop - 80;
                    window.scrollTo({
                      top: offsetTop,
                      behavior: "smooth",
                    });
                  }
                }}
                className="text-beige/80 hover:text-beige transition-colors text-sm font-medium"
              >
                Eventos
              </button>
              <button
                onClick={() => {
                  const section = document.querySelector("#merch");
                  if (section) {
                    const offsetTop = section.offsetTop - 80;
                    window.scrollTo({
                      top: offsetTop,
                      behavior: "smooth",
                    });
                  }
                }}
                className="text-beige/80 hover:text-beige transition-colors text-sm font-medium"
              >
                Merch
              </button>
              <button
                onClick={() => {
                  const section = document.querySelector("#contacto");
                  if (section) {
                    const offsetTop = section.offsetTop - 80;
                    window.scrollTo({
                      top: offsetTop,
                      behavior: "smooth",
                    });
                  }
                }}
                className="text-beige/80 hover:text-beige transition-colors text-sm font-medium"
              >
                Contacto
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-125"
          >
            <source
              src="https://cdn.builder.io/o/assets%2Fb483dd511682401f9f00211e632d2fcf%2Fab8a6d09dd1b4d80a427d0eecee15f31?alt=media&token=48dbe188-4c32-4e72-bb94-f053f51a48b4&apiKey=b483dd511682401f9f00211e632d2fcf"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-forest-green/20"></div>
        </div>

        {/* Spacer for video content */}
        <div className="relative z-10"></div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
          onClick={() => {
            const nextSection = document.querySelector("#sobre-bejaus");
            nextSection?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <span className="text-beige/70 text-sm font-medium group-hover:text-beige transition-colors">
              Conócenos
            </span>
            <ChevronDown className="h-6 w-6 text-beige/70 group-hover:text-beige transition-colors" />
          </div>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section id="sobre-bejaus" className="py-24 px-6 bg-beige">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-forest-green mb-6">
              Sobre nosotros
            </h2>
          </div>

          {/* Section 1: Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-24">
            <div className="aspect-[4/3] bg-forest-green/10 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Interior de Bejaus Café"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-forest-green mb-4 lg:mb-6">
                Nuestro espacio
              </h3>
              <p className="text-base lg:text-lg text-forest-green/80 leading-relaxed mb-4 lg:mb-6">
                Un espacio único en el corazón de Les Corts. Inspirados por la
                energía vibrante de Barcelona, hemos creado un lugar acogedor
                donde disfrutar de café de especialidad, cervezas locales y una
                gastronomía fresca, de proximidad y de calidad.
              </p>
              <p className="text-base lg:text-lg text-forest-green/80 leading-relaxed">
                Nuestro enfoque es sencillo: cuidar cada detalle, desde el
                primer sorbo de café hasta el último bocado de un pastel casero.
                Celebramos lo local y lo auténtico, priorizando ingredientes
                sostenibles de productores cercanos.
              </p>
            </div>
          </div>

          {/* Section 2: Text Left, Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-24">
            <div className="order-2 lg:order-1">
              <h3 className="text-xl lg:text-2xl font-bold text-forest-green mb-4 lg:mb-6">
                Comunidad
              </h3>
              <p className="text-base lg:text-lg text-forest-green/80 leading-relaxed mb-4 lg:mb-6">
                Creemos en el poder de la comunidad, en las conversaciones que
                surgen al compartir una tapa o en las ideas que nacen con una
                taza en las manos.
              </p>
              <p className="text-base lg:text-lg text-forest-green/80 leading-relaxed">
                Bejaus es el lugar donde vecinos y visitantes se conectan,
                creando momentos memorables y compartiendo buenos ratos en un
                ambiente relajado y amigable.
              </p>
            </div>
            <div className="aspect-[4/3] bg-forest-green/10 rounded-lg overflow-hidden order-1 lg:order-2">
              <img
                src="/placeholder.svg"
                alt="Comunidad en Bejaus"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Section 3: Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="aspect-[4/3] bg-forest-green/10 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Productos locales"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-forest-green mb-4 lg:mb-6">
                Localidad y Calidad
              </h3>
              <p className="text-base lg:text-lg text-forest-green/80 leading-relaxed mb-4 lg:mb-6">
                Apoyamos a productores locales utilizando ingredientes frescos y
                de proximidad, celebrando lo mejor de nuestra tierra y apoyando
                la economía local.
              </p>
              <p className="text-base lg:text-lg text-forest-green/80 leading-relaxed">
                Seleccionamos cuidadosamente cada producto para ofrecerte una
                experiencia excepcional, siempre a un precio justo que refleje
                el valor de lo que ofrecemos. En Bejaus, queremos que te sientas
                como en casa y encuentres un lugar que inspire tu día.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Aftermovies */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-forest-green text-center mb-16">
            Vibra con nosotros
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-forest-green/10 rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/bR29G5pSpaQ"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Additional videos */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="aspect-video bg-forest-green/10 rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/fflf6I7UHXM"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="aspect-video bg-forest-green/10 rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/zaoEoFKjoR4"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="aspect-video bg-forest-green/10 rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/I12W9RiDqF8"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* YouTube Channel Button */}
          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-terracotta hover:bg-terracotta/90 text-beige px-8 py-4 text-lg"
              onClick={() =>
                window.open("https://www.youtube.com/@bejaussessions", "_blank")
              }
            >
              Ver más videos en YouTube
              <Youtube className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Merch Section */}
      <section id="merch" className="py-24 px-6 bg-forest-green">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-beige text-center mb-8">
            Merch Bejaus
          </h2>
          <p className="text-xl text-beige/90 text-center mb-16 max-w-2xl mx-auto">
            Lleva la vibra Bejaus contigo. Diseños únicos inspirados en la
            comunidad musical de Barcelona.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Product 1 - Camiseta */}
            <Card className="bg-beige border-0 overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="aspect-square bg-forest-green/10 overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Camiseta Bejaus Sessions"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-forest-green mb-2 min-h-[3.5rem] flex items-center">
                  Camiseta Bejaus Sessions
                </h3>
                <p className="text-forest-green/70 text-sm mb-4">
                  100% Algodón orgánico
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-forest-green">
                    25€
                  </span>
                  <span className="text-sm text-forest-green/60">
                    S, M, L, XL
                  </span>
                </div>
                <Button className="w-full bg-terracotta hover:bg-terracotta/90 text-beige">
                  Añadir al carrito
                </Button>
              </div>
            </Card>

            {/* Product 2 - Hoodie */}
            <Card className="bg-beige border-0 overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="aspect-square bg-forest-green/10 overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Hoodie Bejaus Sessions"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-forest-green mb-2 min-h-[3.5rem] flex items-center">
                  Hoodie Bejaus Sessions
                </h3>
                <p className="text-forest-green/70 text-sm mb-4">
                  80% Algodón, 20% Poliéster
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-forest-green">
                    45€
                  </span>
                  <span className="text-sm text-forest-green/60">
                    S, M, L, XL
                  </span>
                </div>
                <Button className="w-full bg-terracotta hover:bg-terracotta/90 text-beige">
                  Añadir al carrito
                </Button>
              </div>
            </Card>

            {/* Product 3 - Taza */}
            <Card className="bg-beige border-0 overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="aspect-square bg-forest-green/10 overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Taza Bejaus Sessions"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-forest-green mb-2 min-h-[3.5rem] flex items-center">
                  Taza Bejaus Sessions
                </h3>
                <p className="text-forest-green/70 text-sm mb-4">
                  Cerámica de alta calidad
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-forest-green">
                    15€
                  </span>
                  <span className="text-sm text-forest-green/60">330ml</span>
                </div>
                <Button className="w-full bg-terracotta hover:bg-terracotta/90 text-beige">
                  Añadir al carrito
                </Button>
              </div>
            </Card>

            {/* Product 4 - Tote Bag */}
            <Card className="bg-beige border-0 overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="aspect-square bg-forest-green/10 overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Tote Bag Bejaus Sessions"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-forest-green mb-2 min-h-[3.5rem] flex items-center">
                  Tote Bag Bejaus Sessions
                </h3>
                <p className="text-forest-green/70 text-sm mb-4">
                  Algodón sostenible
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-forest-green">
                    18€
                  </span>
                  <span className="text-sm text-forest-green/60">40x35cm</span>
                </div>
                <Button className="w-full bg-terracotta hover:bg-terracotta/90 text-beige">
                  Añadir al carrito
                </Button>
              </div>
            </Card>
          </div>

          {/* Ver toda la tienda */}
          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-terracotta hover:bg-terracotta/90 text-beige px-8 py-4 text-lg"
            >
              Ver toda la tienda
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-24 px-6 bg-beige">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-forest-green mb-8">
            Sé parte de la vibra Bejaus
          </h2>
          <p className="text-xl text-forest-green mb-12 leading-relaxed">
            Apúntate para recibir noticias de próximos eventos, descuentos y
            sesiones exclusivas.
          </p>

          <Card className="bg-forest-green/5 backdrop-blur p-8 border-forest-green/20 max-w-2xl mx-auto">
            <form className="space-y-4">
              <Input
                type="text"
                placeholder="Tu nombre"
                className="bg-beige border-forest-green/30 text-forest-green placeholder:text-forest-green/60"
              />
              <Input
                type="email"
                placeholder="Tu email"
                className="bg-beige border-forest-green/30 text-forest-green placeholder:text-forest-green/60"
              />
              <Button
                type="submit"
                size="lg"
                className="w-full bg-terracotta hover:bg-terracotta/90 text-beige"
              >
                Suscribirme
                <Mail className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Collaboration Section */}
      <section id="contacto" className="py-24 px-6 bg-forest-green/95">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-beige mb-8">
            ¿Tienes un espacio o proyecto y quieres colaborar?
          </h2>
          <p className="text-xl text-beige mb-12 leading-relaxed">
            Llevamos Bejaus Sessions a colivings, hostels y espacios creativos.
            Escríbenos y hablemos.
          </p>

          <Button
            size="lg"
            className="bg-beige hover:bg-beige/90 text-forest-green px-8 py-4 text-lg font-semibold"
          >
            Contactar
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-forest-green">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
            <div className="text-beige">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fb483dd511682401f9f00211e632d2fcf%2F3cb05d7d76a94745984779edb5aafdae?format=webp&width=800"
                alt="Bejaus"
                className="h-12 w-auto mb-4"
              />
              <p className="text-beige/80">
                Música, café y comunidad en Barcelona
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex space-x-6">
                <a
                  href="https://instagram.com/bejauscafe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-beige hover:text-terracotta transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="https://www.youtube.com/@bejaussessions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-beige hover:text-terracotta transition-colors"
                >
                  <Youtube className="h-6 w-6" />
                </a>
              </div>

              <div className="text-beige/80 text-center md:text-right">
                <a
                  href="https://bejauscafe.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-terracotta transition-colors"
                >
                  bejauscafe.com
                </a>
                <a
                  href="mailto:hola@bejaus.com"
                  className="block hover:text-terracotta transition-colors"
                >
                  hola@bejaus.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
