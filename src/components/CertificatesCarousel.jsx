import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { useInView } from "react-intersection-observer";
import { Award } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import userData from "../userData";
import { cn } from "@/lib/utils";
import PageTransition from "./PageTransition";

const CertificatesCarousel = () => {
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const autoplay = React.useRef(
    Autoplay(
      { delay: 2000, stopOnInteraction: false },
      (emblaRoot) => emblaRoot.parentElement
    )
  );

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  React.useEffect(() => {
    if (!api) return;

    const scrollSnaps = api.scrollSnapList();
    setCount(scrollSnaps.length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  React.useEffect(() => {
    if (!api || !autoplay.current) return;

    const onInteraction = () => {
      autoplay.current.reset();
    };

    api.on("pointerDown", onInteraction);
    return () => {
      api.off("pointerDown", onInteraction);
    };
  }, [api]);

  if (!userData.certificates || userData.certificates.length === 0) {
    return null;
  }

  const scrollTo = (index) => {
    api && api.scrollTo(index);
  };

  return (
    <PageTransition isVisible={inView}>
      <section id="certificates" className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div
            ref={ref}
            className={`transition-all duration-1000 ${
              inView ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text flex items-center justify-center gap-3">
                <Award className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                Certificados
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Minha jornada de aprendizado contínuo e conquistas.
              </p>
            </div>

            <div className="p-4">
              <Carousel
                setApi={setApi}
                orientation="horizontal"
                plugins={[autoplay.current]}
                className="w-full"
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent className="w-full">
                  {userData.certificates.map((certificate, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 group"
                    >
                      <div className="p-1">
                        <Card
                          className={cn(
                            "bg-black/80 rounded-lg transition-all duration-300 border",
                            current === index
                              ? "border-purple-500/80"
                              : "border-purple-500/80"
                          )}
                        >
                          <CardContent className="flex flex-col items-center justify-center p-4 gap-4 aspect-square carousel-mobile-aspect overflow-hidden carousel-mobile-card">
                            <div
                              className="relative w-full h-4/5 overflow-hidden rounded-md carousel-mobile-image cursor-pointer"
                              onMouseEnter={() => setHoveredIndex(index)}
                              onMouseLeave={() => setHoveredIndex(null)}
                              onClick={() => window.open(certificate.image, '_blank')}
                            >
                              <img
                                src={certificate.image}
                                alt={certificate.name}
                                className={cn(
                                  "w-full h-full object-contain transition-transform duration-500 ease-in-out",
                                  hoveredIndex === index
                                    ? "scale-[1.4]"
                                    : "scale-100"
                                )}
                                style={{
                                  transformOrigin: "center center",
                                }}
                              />
                              {/* Overlay para indicar que é clicável */}
                              <div className={cn(
                                "absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300",
                                hoveredIndex === index ? "opacity-100" : "opacity-0"
                              )}>
                                <div className="bg-white/90 rounded-full p-2">
                                  <svg 
                                    className="w-6 h-6 text-gray-800" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                  >
                                    <path 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round" 
                                      strokeWidth={2} 
                                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <span className="text-sm font-semibold text-center mt-2 text-muted-foreground h-1/5 carousel-mobile-text">
                              {certificate.name}
                            </span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            <div className="py-4 text-center text-sm text-muted-foreground">
              Certificado {current + 1} de {count}
            </div>

            <div className="flex justify-center gap-2 mt-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    current === index ? "w-4 bg-primary" : "bg-primary/50"
                  )}
                  aria-label={`Ir para o certificado ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default CertificatesCarousel;
