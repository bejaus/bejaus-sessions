import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  ExternalLink,
  Instagram,
  Youtube,
  Mail,
  ChevronDown,
  Loader2,
  ShoppingCart,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { YouTubeApiResponse, YouTubeVideo } from "@shared/api";
import { useCart } from "../contexts/CartContext";
import { mockProducts } from "../../shared/types";
import { useToast } from "../hooks/use-toast";
import { Badge } from "../components/ui/badge";

export default function Index() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [youtubeData, setYoutubeData] = useState<YouTubeApiResponse | null>(
    null,
  );
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [videoError, setVideoError] = useState<string | null>(null);
  const { addToCart, cart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch YouTube videos
  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      try {
        setIsLoadingVideos(true);
        setVideoError(null);

        console.log("Fetching YouTube videos from /api/youtube-videos");

        const response = await fetch("/api/youtube-videos");
        console.log("Response status:", response.status, response.statusText);

        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ error: "Unknown error" }));
          console.error("API Error Response:", errorData);
          throw new Error(
            `API Error (${response.status}): ${errorData.error || "Failed to fetch videos"}`,
          );
        }

        const data: YouTubeApiResponse = await response.json();
        console.log("YouTube data received:", data);
        setYoutubeData(data);
      } catch (error) {
        // Silently handle all errors and use fallback content
        console.log("YouTube fetch failed, using fallback content:", error instanceof Error ? error.message : 'Unknown error');
        setVideoError("");
        // Keep static content as fallback
      } finally {
        setIsLoadingVideos(false);
      }
    };

    fetchYouTubeVideos();
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

              {/* Cart Button */}
              <Link to="/cart" className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-beige text-beige hover:bg-beige hover:text-forest-green"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Carrito
                  {cart.itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-terracotta text-beige border-0 text-xs">
                      {cart.itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>
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

      {/* Bejaus Sessions - Events */}
      <section
        id="eventos"
        className="py-24 px-6 bg-gradient-to-b from-beige to-forest-green/5 relative overflow-hidden"
      >
        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-32 left-16 w-64 h-64 rounded-full bg-forest-green blur-3xl"></div>
          <div className="absolute bottom-32 right-16 w-80 h-80 rounded-full bg-terracotta blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <span className="inline-block bg-forest-green/10 text-forest-green px-6 py-3 rounded-full text-sm font-semibold mb-6 tracking-wide uppercase">
              ���� Bejaus Sessions
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-forest-green mb-6">
              Vibra con nosotros
            </h2>
            <p className="text-xl text-forest-green/80 max-w-3xl mx-auto leading-relaxed">
              Descubre la magia de nuestros eventos únicos. Música en vivo, DJs
              locales, café de especialidad y una comunidad que celebra la
              creatividad y la buena vibra.
            </p>
          </div>

          {/* Featured Video */}
          <div className="mb-20">
            <div className="max-w-5xl mx-auto">
              <Card className="bg-forest-green/5 border-forest-green/20 p-4 lg:p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-forest-green mb-2">
                    🎵 Última Sesión Completa
                  </h3>
                  <p className="text-forest-green/70">
                    {youtubeData?.latest
                      ? `Publicado ${new Date(youtubeData.latest.publishedAt).toLocaleDateString()}`
                      : "Disfruta la sesi��n completa de 1 hora desde nuestro canal de YouTube"}
                  </p>
                </div>
                <div className="aspect-video bg-forest-green/10 rounded-xl overflow-hidden shadow-2xl">
                  {isLoadingVideos ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-forest-green" />
                    </div>
                  ) : youtubeData?.latest ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeData.latest.id}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <iframe
                      src="https://www.youtube.com/embed/bR29G5pSpaQ"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
              </Card>
            </div>
          </div>

          {/* Events Gallery */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-forest-green mb-4">
                {youtubeData ? "Los Más Vistos" : "Momentos únicos"}
              </h3>
              <p className="text-lg text-forest-green/70 max-w-2xl mx-auto">
                {youtubeData
                  ? "Nuestras sesiones más populares, elegidas por la comunidad"
                  : "Cada sesión es una experiencia irrepetible donde la música, el café y la comunidad se encuentran"}
              </p>
              {videoError && (
                <p className="text-sm text-terracotta mt-2">{videoError}</p>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {isLoadingVideos
                ? // Loading skeletons
                  Array.from({ length: 3 }).map((_, index) => (
                    <Card
                      key={index}
                      className="bg-white/50 border-forest-green/20 overflow-hidden"
                    >
                      <div className="aspect-video bg-forest-green/10 animate-pulse"></div>
                      <div className="p-6">
                        <div className="h-5 bg-forest-green/20 rounded animate-pulse mb-2"></div>
                        <div className="h-4 bg-forest-green/10 rounded animate-pulse"></div>
                      </div>
                    </Card>
                  ))
                : youtubeData?.popular
                  ? // Dynamic videos
                    youtubeData.popular.map((video, index) => (
                      <Card
                        key={video.id}
                        className="group hover:scale-105 transition-all duration-500 bg-white/50 border-forest-green/20 overflow-hidden"
                      >
                        <div className="aspect-video bg-forest-green/10 overflow-hidden">
                          <iframe
                            src={`https://www.youtube.com/embed/${video.id}`}
                            className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <div className="p-6">
                          <h4 className="font-semibold text-forest-green mb-2 line-clamp-2">
                            {video.title.length > 50
                              ? `${video.title.substring(0, 50)}...`
                              : video.title}
                          </h4>
                          <p className="text-sm text-forest-green/70">
                            {video.viewCount
                              ? `${parseInt(video.viewCount).toLocaleString()} visualizaciones`
                              : "Sesión especial"}
                          </p>
                        </div>
                      </Card>
                    ))
                  : // Fallback static videos
                    [
                      {
                        id: "fflf6I7UHXM",
                        title: "Jou Nielsen",
                        description: "Una noche mágica con sonidos únicos",
                      },
                      {
                        id: "zaoEoFKjoR4",
                        title: "Noé",
                        description: "Ritmos que conectan almas",
                      },
                      {
                        id: "X52oRpXKOxM",
                        title: "Alexx Zander Johnson",
                        description: "Experiencias que trascienden",
                      },
                    ].map((video, index) => (
                      <Card
                        key={video.id}
                        className="group hover:scale-105 transition-all duration-500 bg-white/50 border-forest-green/20 overflow-hidden"
                      >
                        <div className="aspect-video bg-forest-green/10 overflow-hidden">
                          <iframe
                            src={`https://www.youtube.com/embed/${video.id}`}
                            className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <div className="p-6">
                          <h4 className="font-semibold text-forest-green mb-2">
                            {video.title}
                          </h4>
                          <p className="text-sm text-forest-green/70">
                            {video.description}
                          </p>
                        </div>
                      </Card>
                    ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-forest-green to-forest-green/90 text-beige p-8 lg:p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">
                ¿Listo para la próxima sesión?
              </h3>
              <p className="text-xl text-beige/90 mb-8 max-w-2xl mx-auto">
                Síguenos en nuestras redes para no perderte ningún evento y ser
                parte de la vibra Bejaus
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-terracotta hover:bg-terracotta/90 text-beige px-8 py-4 text-lg font-semibold"
                  onClick={() =>
                    window.open(
                      "https://www.youtube.com/@bejaussessions",
                      "_blank",
                    )
                  }
                >
                  <Youtube className="mr-2 h-5 w-5" />
                  Ver más videos
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-beige text-forest-green hover:bg-beige hover:text-forest-green px-8 py-4 text-lg"
                  onClick={() =>
                    window.open("https://instagram.com/bejauscafe", "_blank")
                  }
                >
                  <Instagram className="mr-2 h-5 w-5" />
                  Síguenos
                </Button>
              </div>
            </Card>
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
              <Link to="/product/bejaus-tshirt">
                <div className="aspect-square bg-forest-green/10 overflow-hidden cursor-pointer">
                  <img
                    src="/placeholder.svg"
                    alt="Camiseta Bejaus Sessions"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </Link>
              <div className="p-6">
                <Link to="/product/bejaus-tshirt">
                  <h3 className="text-xl font-semibold text-forest-green mb-2 min-h-[3.5rem] flex items-center hover:text-forest-green/80 cursor-pointer">
                    Camiseta Bejaus Sessions
                  </h3>
                </Link>
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
                <div className="flex gap-2">
                  <Link to="/product/bejaus-tshirt" className="flex-1">
                    <Button variant="outline" className="w-full border-terracotta text-terracotta hover:bg-terracotta hover:text-beige">
                      Ver producto
                    </Button>
                  </Link>
                  <Button
                    className="flex-1 bg-terracotta hover:bg-terracotta/90 text-beige"
                    onClick={() => {
                      const product = mockProducts.find(p => p.id === 'bejaus-tshirt');
                      if (product) {
                        addToCart(product, 1);
                        toast({
                          title: "¡Producto añadido!",
                          description: `${product.name} se ha añadido al carrito`,
                        });
                      }
                    }}
                  >
                    Añadir
                  </Button>
                </div>
              </div>
            </Card>

            {/* Product 2 - Hoodie */}
            <Card className="bg-beige border-0 overflow-hidden group hover:scale-105 transition-transform duration-300">
              <Link to="/product/bejaus-hoodie">
                <div className="aspect-square bg-forest-green/10 overflow-hidden cursor-pointer">
                  <img
                    src="/placeholder.svg"
                    alt="Hoodie Bejaus Sessions"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </Link>
              <div className="p-6">
                <Link to="/product/bejaus-hoodie">
                  <h3 className="text-xl font-semibold text-forest-green mb-2 min-h-[3.5rem] flex items-center hover:text-forest-green/80 cursor-pointer">
                    Hoodie Bejaus Sessions
                  </h3>
                </Link>
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
                <div className="flex gap-2">
                  <Link to="/product/bejaus-hoodie" className="flex-1">
                    <Button variant="outline" className="w-full border-terracotta text-terracotta hover:bg-terracotta hover:text-beige">
                      Ver producto
                    </Button>
                  </Link>
                  <Button
                    className="flex-1 bg-terracotta hover:bg-terracotta/90 text-beige"
                    onClick={() => {
                      const product = mockProducts.find(p => p.id === 'bejaus-hoodie');
                      if (product) {
                        addToCart(product, 1);
                      }
                    }}
                  >
                    Añadir
                  </Button>
                </div>
              </div>
            </Card>

            {/* Product 3 - Vinyl */}
            <Card className="bg-beige border-0 overflow-hidden group hover:scale-105 transition-transform duration-300">
              <Link to="/product/bejaus-vinyl">
                <div className="aspect-square bg-forest-green/10 overflow-hidden cursor-pointer">
                  <img
                    src="/placeholder.svg"
                    alt="Compilation Vinyl Vol.1"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </Link>
              <div className="p-6">
                <Link to="/product/bejaus-vinyl">
                  <h3 className="text-xl font-semibold text-forest-green mb-2 min-h-[3.5rem] flex items-center hover:text-forest-green/80 cursor-pointer">
                    Compilation Vinyl Vol.1
                  </h3>
                </Link>
                <p className="text-forest-green/70 text-sm mb-4">
                  Edición limitada numerada
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-forest-green">
                    35€
                  </span>
                  <span className="text-sm text-forest-green/60">Vinilo</span>
                </div>
                <div className="flex gap-2">
                  <Link to="/product/bejaus-vinyl" className="flex-1">
                    <Button variant="outline" className="w-full border-terracotta text-terracotta hover:bg-terracotta hover:text-beige">
                      Ver producto
                    </Button>
                  </Link>
                  <Button
                    className="flex-1 bg-terracotta hover:bg-terracotta/90 text-beige"
                    onClick={() => {
                      const product = mockProducts.find(p => p.id === 'bejaus-vinyl');
                      if (product) {
                        addToCart(product, 1);
                      }
                    }}
                  >
                    Añadir
                  </Button>
                </div>
              </div>
            </Card>

            {/* Product 4 - Tote Bag */}
            <Card className="bg-beige border-0 overflow-hidden group hover:scale-105 transition-transform duration-300">
              <Link to="/product/bejaus-tote">
                <div className="aspect-square bg-forest-green/10 overflow-hidden cursor-pointer">
                  <img
                    src="/placeholder.svg"
                    alt="Tote Bag Bejaus"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </Link>
              <div className="p-6">
                <Link to="/product/bejaus-tote">
                  <h3 className="text-xl font-semibold text-forest-green mb-2 min-h-[3.5rem] flex items-center hover:text-forest-green/80 cursor-pointer">
                    Tote Bag Bejaus
                  </h3>
                </Link>
                <p className="text-forest-green/70 text-sm mb-4">
                  Algodón sostenible
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-forest-green">
                    15€
                  </span>
                  <span className="text-sm text-forest-green/60">Ecológico</span>
                </div>
                <div className="flex gap-2">
                  <Link to="/product/bejaus-tote" className="flex-1">
                    <Button variant="outline" className="w-full border-terracotta text-terracotta hover:bg-terracotta hover:text-beige">
                      Ver producto
                    </Button>
                  </Link>
                  <Button
                    className="flex-1 bg-terracotta hover:bg-terracotta/90 text-beige"
                    onClick={() => {
                      const product = mockProducts.find(p => p.id === 'bejaus-tote');
                      if (product) {
                        addToCart(product, 1);
                      }
                    }}
                  >
                    Añadir
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Ver toda la tienda */}
          <div className="text-center mt-16">
            <Link to="/shop">
              <Button
                size="lg"
                className="bg-beige hover:bg-beige/90 text-forest-green px-8 py-4 text-lg"
              >
                Ver toda la tienda
              </Button>
            </Link>
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
