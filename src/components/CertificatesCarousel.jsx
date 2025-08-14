import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { useInView } from "react-intersection-observer";

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

const CertificatesCarousel = () => {
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const scrollSnaps = api.scrollSnapList();
    setCount(scrollSnaps.length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Check if there are certificates to display
  if (!userData.certificates || userData.certificates.length === 0) {
    return null; // Don't render anything if there are no certificates
  }

  const scrollTo = (index) => {
    api && api.scrollTo(index);
  };

  return (
    <section id="certificates" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            inView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Certificados
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Minha jornada de aprendizado contínuo e conquistas.
            </p>
          </div>

          <div className="p-4">
            <Carousel
              setApi={setApi}
              orientation="vertical"
              plugins={[
                Autoplay({
                  delay: 2000,
                  stopOnInteraction: true,
                }),
              ]}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="h-[200px] md:h-[300px] lg:h-[400px]">
                {userData.certificates.map((certificate, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-1/2 md:basis-1/3 lg:basis-1/4 group"
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
                        <CardContent className="flex flex-col items-center justify-center p-4 gap-4 aspect-square overflow-hidden">
                          <img
                            src={certificate.image}
                            alt={certificate.name}
                            className="w-full h-4/5 object-contain rounded-md transition-transform duration-300 group-hover:scale-105"
                          />
                          <span className="text-sm font-semibold text-center mt-2 text-muted-foreground h-1/5">
                            {certificate.name}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="flex" />
              <CarouselNext className="flex" />
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
  );
};

export default CertificatesCarousel;
