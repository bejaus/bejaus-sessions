import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EventSection = () => (
    <section
        id="eventos"
        className="py-24 px-6 bg-gradient-to-br from-forest-green via-forest-green/95 to-forest-green/90 relative overflow-hidden"
    >
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
                    Una noche inolvidable con los mejores DJs locales, café de
                    especialidad y la mejor vibra de Barcelona
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
                                <span className="text-sm font-medium">
                                    Entradas disponibles
                                </span>
                                <span className="text-lg font-bold text-terracotta">
                                    15€
                                </span>
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
                                    <h3 className="text-lg font-semibold text-beige mb-1">
                                        Fecha y Hora
                                    </h3>
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
                                    <h3 className="text-lg font-semibold text-beige mb-1">
                                        Ubicación
                                    </h3>
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
                                    <h3 className="text-lg font-semibold text-beige mb-1">
                                        Lineup
                                    </h3>
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
                                    <h3 className="text-lg font-semibold text-beige mb-1">
                                        Capacidad
                                    </h3>
                                    <p className="text-beige/80">80 personas máximo</p>
                                    <p className="text-terracotta text-sm font-medium">
                                        ¡Últimas entradas!
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* CTA Section */}
                    <Card className="bg-beige/20 backdrop-blur-sm border border-beige/30 p-8">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-beige mb-4">
                                ¿Listo para vivir la experiencia Bejaus?
                            </h3>
                            <p className="text-beige/90 mb-6">
                                Música, café, vermut y la mejor comunidad de Barcelona te
                                esperan
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    size="lg"
                                    className="bg-terracotta hover:bg-terracotta/90 text-beige px-8 py-4 text-lg font-semibold"
                                >
                                    Comprar entradas - 15€
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-beige text-forest-green hover:bg-beige hover:text-forest-green px-8 py-4 text-lg"
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
                <p className="text-beige/70 text-sm mb-4">
                    Eventos anteriores sold out ✨
                </p>
                <div className="flex justify-center items-center space-x-8 text-beige/60">
                    <span className="text-sm">+200 asistentes</span>
                    <span className="text-sm">4.9⭐ valoración</span>
                    <span className="text-sm">3 eventos sold out</span>
                </div>
            </div>
        </div>
    </section>
);

export default EventSection; 