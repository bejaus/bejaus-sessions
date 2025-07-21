import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ExternalLink, Instagram, Youtube, Mail } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-beige">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src="https://www.youtube.com/embed/bR29G5pSpaQ?autoplay=1&mute=1&loop=1&playlist=bR29G5pSpaQ&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
            className="w-full h-full object-cover scale-150"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
          <div className="absolute inset-0 bg-forest-green/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-beige px-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            Bejaus Sessions
          </h1>
          <p className="text-xl md:text-2xl mb-12 font-light leading-relaxed">
            Música en vivo. Comunidad local. Buen café. Mejor vibra.
          </p>
          <Button
            size="lg"
            className="bg-terracotta hover:bg-terracotta/90 text-beige px-8 py-4 text-lg"
            onClick={() =>
              window.open("https://youtu.be/bR29G5pSpaQ", "_blank")
            }
          >
            Ver aftermovie
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Sobre Bejaus Sessions */}
      <section className="py-24 px-6">
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
      <section className="py-24 px-6 bg-forest-green">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-beige mb-16">
            Próximo Evento
          </h2>

          <Card className="bg-beige/95 backdrop-blur p-12 border-0">
            <div className="space-y-6 text-forest-green">
              <h3 className="text-2xl md:text-3xl font-semibold">
                Bejaus Sessions Vol. 4
              </h3>
              <div className="text-lg space-y-2">
                <p>
                  <strong>Fecha:</strong> Sábado 15 Febrero, 2025
                </p>
                <p>
                  <strong>Lugar:</strong> Bejaus Café, Les Corts
                </p>
                <p>
                  <strong>Lineup:</strong> DJ Local + Artista Invitado
                </p>
              </div>
              <Button
                size="lg"
                className="bg-terracotta hover:bg-terracotta/90 text-beige mt-8 px-8 py-4 text-lg"
              >
                Quiero asistir
              </Button>
            </div>
          </Card>
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
              className="bg-forest-green hover:bg-forest-green/90 text-beige px-8 py-4 text-lg"
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
                  href="https://instagram.com/bejaus"
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
