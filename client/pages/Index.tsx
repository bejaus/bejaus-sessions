import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ExternalLink, Instagram, Youtube, Mail, ChevronDown } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-beige">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-forest-green/90 backdrop-blur-sm border-b border-beige/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fb483dd511682401f9f00211e632d2fcf%2F080970fcfe234ce8980095845b757d23?format=webp&width=800"
                alt="Bejaus Logo"
                className="h-8 w-auto"
              />
            </div>

            {/* Navigation - Optional for future */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#sobre-bejaus" className="text-beige/80 hover:text-beige transition-colors text-sm font-medium">
                Sobre nosotros
              </a>
              <a href="#eventos" className="text-beige/80 hover:text-beige transition-colors text-sm font-medium">
                Eventos
              </a>
              <a href="#merch" className="text-beige/80 hover:text-beige transition-colors text-sm font-medium">
                Merch
              </a>
              <a href="#contacto" className="text-beige/80 hover:text-beige transition-colors text-sm font-medium">
                Contacto
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src="https://www.youtube.com/embed/bR29G5pSpaQ?autoplay=1&mute=1&loop=1&playlist=bR29G5pSpaQ&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&start=0&end=20"
            className="w-full h-full object-cover scale-125"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
          <div className="absolute inset-0 bg-forest-green/60"></div>
        </div>

        {/* Spacer for video content */}
        <div className="relative z-10"></div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
          onClick={() => {
            const nextSection = document.querySelector('#sobre-bejaus');
            nextSection?.scrollIntoView({ behavior: 'smooth' });
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

      {/* Sobre Bejaus Sessions */}
      <section id="sobre-bejaus" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xl md:text-2xl text-forest-green leading-relaxed max-w-4xl mx-auto">
              Una serie de eventos musicales que combinan DJs locales, café de
              especialidad, vermut y una comunidad vibrante. Desde el corazón de
              Les Corts hacia el resto de Barcelona.
            </p>
          </div>

          {/* Event Images */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="aspect-square bg-forest-green/10 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Evento Bejaus Sessions 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-forest-green/10 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Evento Bejaus Sessions 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-forest-green/10 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Evento Bejaus Sessions 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Próximo Evento */}
      <section id="eventos" className="py-24 px-6 bg-gradient-to-br from-forest-green via-forest-green/95 to-forest-green/90 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-terracotta/20 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-beige/10 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block bg-terracotta/20 text-beige px-4 py-2 rounded-full text-sm font-medium mb-4">
              🎵 Próximo Evento
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-beige mb-4">
              Bejaus Sessions Vol. 4
            </h2>
            <p className="text-xl text-beige/80 max-w-2xl mx-auto">
              Una noche inolvidable con los mejores DJs locales, café de especialidad y la mejor vibra de Barcelona
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Event Poster */}
            <div className="lg:col-span-1">
              <Card className="bg-beige/10 backdrop-blur-sm border border-beige/20 overflow-hidden">
                <div className="aspect-[3/4] bg-gradient-to-br from-terracotta/20 to-beige/5 flex items-center justify-center">
                  <img
                    src="/placeholder.svg"
                    alt="Bejaus Sessions Vol. 4 Poster"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-beige">
                    <span className="text-sm font-medium">Entradas disponibles</span>
                    <span className="text-lg font-bold text-terracotta">15€</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Event Details */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Date & Time */}
                <Card className="bg-beige/10 backdrop-blur-sm border border-beige/20 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-terracotta/20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">📅</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-beige mb-1">Fecha y Hora</h3>
                      <p className="text-beige/80">Sábado 15 Febrero, 2025</p>
                      <p className="text-beige/80">21:00 - 02:00</p>
                    </div>
                  </div>
                </Card>

                {/* Location */}
                <Card className="bg-beige/10 backdrop-blur-sm border border-beige/20 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-terracotta/20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-beige mb-1">Ubicación</h3>
                      <p className="text-beige/80">Bejaus Café</p>
                      <p className="text-beige/80">Les Corts, Barcelona</p>
                    </div>
                  </div>
                </Card>

                {/* Lineup */}
                <Card className="bg-beige/10 backdrop-blur-sm border border-beige/20 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-terracotta/20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🎧</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-beige mb-1">Lineup</h3>
                      <p className="text-beige/80">DJ MARC VILLA</p>
                      <p className="text-beige/80">+ Artista Invitado</p>
                    </div>
                  </div>
                </Card>

                {/* Capacity */}
                <Card className="bg-beige/10 backdrop-blur-sm border border-beige/20 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-terracotta/20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">👥</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-beige mb-1">Capacidad</h3>
                      <p className="text-beige/80">80 personas máximo</p>
                      <p className="text-terracotta text-sm font-medium">¡Últimas entradas!</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* CTA Section */}
              <Card className="bg-gradient-to-r from-terracotta to-terracotta/90 border-0 p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-beige mb-4">
                    ¿Listo para vivir la experiencia Bejaus?
                  </h3>
                  <p className="text-beige/90 mb-6">
                    Música, café, vermut y la mejor comunidad de Barcelona te esperan
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-beige hover:bg-beige/90 text-terracotta px-8 py-4 text-lg font-semibold"
                    >
                      Comprar entradas - 15€
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-beige text-beige hover:bg-beige/10 px-8 py-4 text-lg"
                    >
                      Más información
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-16 text-center">
            <p className="text-beige/70 text-sm mb-4">Eventos anteriores sold out ✨</p>
            <div className="flex justify-center items-center space-x-8 text-beige/60">
              <span className="text-sm">+200 asistentes</span>
              <span className="text-sm">4.9⭐ valoración</span>
              <span className="text-sm">3 eventos sold out</span>
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
            Lleva la vibra Bejaus contigo. Diseños únicos inspirados en la comunidad musical de Barcelona.
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
                <h3 className="text-xl font-semibold text-forest-green mb-2">
                  Camiseta Bejaus Sessions
                </h3>
                <p className="text-forest-green/70 text-sm mb-4">
                  100% Algodón orgánico
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-forest-green">25€</span>
                  <span className="text-sm text-forest-green/60">S, M, L, XL</span>
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
                <h3 className="text-xl font-semibold text-forest-green mb-2">
                  Hoodie Bejaus Sessions
                </h3>
                <p className="text-forest-green/70 text-sm mb-4">
                  80% Algodón, 20% Poliéster
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-forest-green">45€</span>
                  <span className="text-sm text-forest-green/60">S, M, L, XL</span>
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
                <h3 className="text-xl font-semibold text-forest-green mb-2">
                  Taza Bejaus Sessions
                </h3>
                <p className="text-forest-green/70 text-sm mb-4">
                  Cerámica de alta calidad
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-forest-green">15€</span>
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
                <h3 className="text-xl font-semibold text-forest-green mb-2">
                  Tote Bag Bejaus Sessions
                </h3>
                <p className="text-forest-green/70 text-sm mb-4">
                  Algodón sostenible
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-forest-green">18€</span>
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
      <section className="py-24 px-6 bg-terracotta">
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
            className="bg-beige hover:bg-beige/90 text-terracotta px-8 py-4 text-lg font-semibold"
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
              <h3 className="text-2xl font-bold mb-4">Bejaus Sessions</h3>
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
                  href="https://youtube.com/@bejaus"
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
