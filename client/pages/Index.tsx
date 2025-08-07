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
import { useToast } from "../hooks/use-toast";
import { Badge } from "../components/ui/badge";
import { CartPreview } from "../components/CartPreview";

export default function Index() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [youtubeData, setYoutubeData] = useState<YouTubeApiResponse | null>(
    null,
  );
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [videoError, setVideoError] = useState<string | null>(null);
  const { addToCart, cart } = useCart();
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Newsletter subscription state
  const [subscribeName, setSubscribeName] = useState("");
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

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

        const response = await fetch("/api/youtube-videos", {
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
        });
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
        console.log(
          "YouTube fetch failed, using fallback content:",
          error instanceof Error ? error.message : "Unknown error",
        );
        setVideoError("");
        // Keep static content as fallback
      } finally {
        setIsLoadingVideos(false);
      }
    };

    fetchYouTubeVideos();
  }, []);

  // Fetch products for merch section
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoadingProducts(true);
        setProductsError(null);
        const response = await fetch("/api/square-products", {
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const errorText = await response.text().catch(() => "Unknown error");
          throw new Error(
            `Error fetching products: ${response.status} ${errorText}`,
          );
        }
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        setProductsError("No se pudieron cargar los productos");
      } finally {
        setIsLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle newsletter subscription
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subscribeEmail || !subscribeEmail.includes('@')) {
      toast({
        title: "Email inválido",
        description: "Por favor, introduce un email válido.",
        variant: "destructive",
      });
      return;
    }

    if (!subscribeName || subscribeName.trim().length === 0) {
      toast({
        title: "Nombre requerido",
        description: "Por favor, introduce tu nombre.",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: subscribeName.trim(),
          email: subscribeEmail.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al suscribirse');
      }

      // Success
      toast({
        title: "¡Gracias por suscribirte!",
        description: "Te mantendremos informado sobre próximos eventos y novedades.",
      });

      // Clear form
      setSubscribeName("");
      setSubscribeEmail("");

    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Error al suscribirse",
        description: error instanceof Error ? error.message : "No se pudo completar la suscripción. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };
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
                  const section = document.querySelector(
                    "#sobre-bejaus",
                  ) as HTMLElement | null;
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
                  const section = document.querySelector(
                    "#eventos",
                  ) as HTMLElement | null;
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
                Bejaus Sessions
              </button>
              <button
                onClick={() => {
                  const section = document.querySelector(
                    "#merch",
                  ) as HTMLElement | null;
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
                    section.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                className="text-beige/80 hover:text-beige transition-colors text-sm font-medium"
              >
                Contacto
              </button>

              {/* Cart Button with Preview */}
              <CartPreview>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-beige text-beige hover:bg-beige hover:text-forest-green relative"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Carrito
                  {cart.itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-terracotta text-beige border-0 text-xs">
                      {cart.itemCount}
                    </Badge>
                  )}
                </Button>
              </CartPreview>
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
              Bejaus Sessions
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
            <div className="w-full">
              <div className="text-center mb-6 max-w-4xl mx-auto px-6">
                <h3 className="text-2xl font-bold text-forest-green mb-2">
                  🎵 Última Sesión Completa
                </h3>
                <p className="text-forest-green/70">
                  {youtubeData?.latest
                    ? `Publicado ${new Date(youtubeData.latest.publishedAt).toLocaleDateString()}`
                    : "Disfruta la sesión completa de 1 hora desde nuestro canal de YouTube"}
                </p>
              </div>
              <div className="aspect-video bg-forest-green/10 overflow-hidden w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
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

          {isLoadingProducts ? (
            <div className="text-center py-12">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-beige" />
              <p className="text-beige/80 mt-4">Cargando productos...</p>
            </div>
          ) : productsError ? (
            <div className="text-center py-12">
              <p className="text-beige/80">{productsError}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.slice(0, 4).map((product) => {
                // Map Square product to expected Product shape for cart
                const mappedProduct = {
                  id: product.id,
                  name: product.name,
                  description: product.description || "",
                  price: product.price / 100, // Convert cents to euros
                  images: [product.imageUrl || "/placeholder.svg"],
                  category: product.category || "",
                  sizes: [],
                  colors: [],
                  inStock: product.inStock !== false,
                  stockCount: undefined,
                  featured: false,
                };
                return (
                  <Card
                    key={product.id}
                    className="bg-beige border-0 overflow-hidden group hover:scale-105 transition-transform duration-300"
                  >
                    <Link to={`/product/${product.id}`}>
                      <div className="aspect-square bg-forest-green/10 overflow-hidden cursor-pointer">
                        <img
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                    <div className="p-6">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-xl font-semibold text-forest-green mb-2 min-h-[3.5rem] flex items-center hover:text-forest-green/80 cursor-pointer">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-forest-green/70 text-sm mb-4">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-forest-green">
                          {mappedProduct.price.toFixed(2)}€
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/product/${product.id}`} className="flex-1">
                          <Button
                            variant="outline"
                            className="w-full border-terracotta text-terracotta hover:bg-terracotta hover:text-beige"
                          >
                            Ver producto
                          </Button>
                        </Link>
                        <Button
                          className="flex-1 bg-terracotta hover:bg-terracotta/90 text-beige"
                          onClick={() => {
                            addToCart(mappedProduct, 1);
                            toast({
                              title: "¡Producto añadido!",
                              description: `${product.name} se ha añadido al carrito`,
                            });
                          }}
                          disabled={!mappedProduct.inStock}
                        >
                          Añadir
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

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
            <form onSubmit={handleSubscribe} className="space-y-4">
              <Input
                type="text"
                placeholder="Tu nombre"
                value={subscribeName}
                onChange={(e) => setSubscribeName(e.target.value)}
                className="bg-beige border-forest-green/30 text-forest-green placeholder:text-forest-green/60"
                disabled={isSubscribing}
              />
              <Input
                type="email"
                placeholder="Tu email"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                className="bg-beige border-forest-green/30 text-forest-green placeholder:text-forest-green/60"
                disabled={isSubscribing}
              />
              <Button
                type="submit"
                size="lg"
                className="w-full bg-terracotta hover:bg-terracotta/90 text-beige"
                disabled={isSubscribing}
              >
                {isSubscribing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Suscribiendo...
                  </>
                ) : (
                  <>
                    Suscribirme
                    <Mail className="ml-2 h-5 w-5" />
                  </>
                )}
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

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Google Map */}
            <div className="order-2 lg:order-1">
              <h3 className="text-xl font-semibold text-beige mb-4">📍 Encuéntranos</h3>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.0276735936815!2d2.1240000!3d41.3874000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a498c6c7d2d6e9%3A0x7c3b1f2e4d5a6b8c!2sCarrer%20de%20l'Equador%2C%2089%2C%20Les%20Corts%2C%2008029%20Barcelona%2C%20Spain!5e0!3m2!1sen!2ses!4v1640000000000!5m2!1sen!2ses"
                  width="100%"
                  height="300"
                  style={{border: 0}}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                ></iframe>
              </div>
              <div className="mt-4 space-y-2 text-beige/80">
                <p className="flex items-center">
                  <span className="mr-2">📍</span>
                  Carrer de l'Equador 89, Barcelona
                </p>
                <p className="flex items-center">
                  <span className="mr-2">☕</span>
                  Espacio abierto para colaboraciones
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="order-1 lg:order-2">
              {formSubmitted ? (
                <div className="text-center space-y-4">
                  <div className="text-6xl">✅</div>
                  <h3 className="text-2xl font-semibold text-beige">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-beige/80">
                    Gracias por contactarnos. Te responderemos muy pronto.
                  </p>
                  <Button
                    onClick={() => setFormSubmitted(false)}
                    className="bg-beige hover:bg-beige/90 text-forest-green"
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
            <form
              action="https://formspree.io/f/xzzbavqy"
              method="POST"
              className="max-w-md mx-auto space-y-6"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const submitButton = form.querySelector(
                  'button[type="submit"]',
                ) as HTMLButtonElement;

                if (submitButton) {
                  submitButton.disabled = true;
                  submitButton.textContent = "Enviando...";
                }

                try {
                  const formData = new FormData(form);
                  const response = await fetch(
                    "https://formspree.io/f/xzzbavqy",
                    {
                      method: "POST",
                      body: formData,
                      headers: {
                        Accept: "application/json",
                      },
                    },
                  );

                  if (response.ok) {
                    setFormSubmitted(true);
                    form.reset();
                  } else {
                    throw new Error("Error sending message");
                  }
                } catch (error) {
                  alert(
                    "Hubo un error enviando el mensaje. Por favor intenta de nuevo.",
                  );
                } finally {
                  if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = "Enviar mensaje";
                  }
                }
              }}
            >
              <input
                type="hidden"
                name="_subject"
                value="Nuevo mensaje desde Bejaus Sessions"
              />
              <input
                type="hidden"
                name="_next"
                value="https://bejaus.com/gracias"
              />

              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Tu nombre"
                  required
                  className="w-full px-4 py-3 rounded-md bg-beige/10 border border-beige/20 text-beige placeholder-beige/60 focus:outline-none focus:ring-2 focus:ring-beige focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Tu email"
                  required
                  className="w-full px-4 py-3 rounded-md bg-beige/10 border border-beige/20 text-beige placeholder-beige/60 focus:outline-none focus:ring-2 focus:ring-beige focus:border-transparent"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Cuéntanos sobre tu espacio y tu idea..."
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-md bg-beige/10 border border-beige/20 text-beige placeholder-beige/60 focus:outline-none focus:ring-2 focus:ring-beige focus:border-transparent resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-beige hover:bg-beige/90 text-forest-green px-8 py-4 text-lg font-semibold"
              >
                Enviar mensaje
              </Button>
              </form>
              )}
            </div>
          </div>
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
