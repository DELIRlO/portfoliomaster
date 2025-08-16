import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { FaWhatsapp } from "react-icons/fa";
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  ExternalLink,
  FileDown,
  MapPin,
} from "lucide-react";
import userData from "../userData";
import PageTransition from "./PageTransition";

const Contact = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const contactLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: userData.social.github,
      description: "Veja meus projetos e contribuições",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: userData.social.linkedin,
      description: "Conecte-se comigo profissionalmente",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: userData.social.instagram,
      description: "Acompanhe meu dia a dia",
    },
    {
      icon: ExternalLink,
      label: "Portfólio Lunar",
      href: userData.social.portfolio1,
      description: "",
    },
    {
      icon: ExternalLink,
      label: "Portfólio 8Bits",
      href: userData.social.portfolio2,
      description: "",
    },
  ];

  return (
    <PageTransition isVisible={inView}>
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div
            ref={ref}
            className={`transition-all duration-1000 ${
              inView ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Vamos Conversar?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Estou sempre aberto a novas oportunidades e colaborações. Entre
                em contato!
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Contato */}
                <div
                  className={`transition-all duration-1000 delay-200 ${
                    inView ? "animate-fade-in-left" : "opacity-0"
                  }`}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 h-full">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-2xl gradient-text">
                        Entre em Contato
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-muted-foreground mb-6">
                        Interessado em trabalhar juntos? Tem alguma pergunta ou
                        apenas quer dizer olá? Ficarei feliz em ouvir de você!
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-primary" />
                          <span className="text-muted-foreground">
                            ysneshy@gmail.com
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaWhatsapp className="h-5 w-5 text-[#25D366]" />
                          <span className="text-muted-foreground">
                            +55 91 98819-9828
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-primary" />
                          <span className="text-muted-foreground">
                            Belém, Pará - Brasil
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <Button className="glow flex-1" asChild>
                          <a href="mailto:ysneshy@gmail.com">
                            <Mail className="mr-2 h-4 w-4" />
                            Email
                          </a>
                        </Button>
                        <Button
                          className="glow flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white"
                          asChild
                        >
                          <a
                            href={userData.social.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaWhatsapp className="mr-2 h-4 w-4" />
                            WhatsApp
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Redes sociais */}
                <div
                  className={`transition-all duration-1000 delay-400 ${
                    inView ? "animate-fade-in-right" : "opacity-0"
                  }`}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 h-full">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-2xl gradient-text">
                        Redes Sociais
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-4">
                        {contactLinks.map((link, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors group"
                          >
                            <div className="flex items-center space-x-3">
                              <link.icon className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium">{link.label}</p>
                                <p className="text-sm text-muted-foreground">
                                  {link.description}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Currículo */}
                <div
                  className={`transition-all duration-1000 delay-600 ${
                    inView ? "animate-fade-in-up" : "opacity-0"
                  }`}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 h-full text-center">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-2xl gradient-text">
                        Currículo
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <img
                        src="https://i.ibb.co/Xrrx3kS2/CARLOS-AUGUSTO-DINIZ-FILHO-2025.png"
                        alt="Currículo"
                        className="rounded-lg shadow-md cursor-pointer mb-4 hover:scale-105 transition-transform"
                        onClick={() =>
                          window.open(
                            "https://i.ibb.co/Xrrx3kS2/CARLOS-AUGUSTO-DINIZ-FILHO-2025.png",
                            "_blank"
                          )
                        }
                      />
                      <p className="text-sm text-muted-foreground mb-4">
                        Clique na imagem para visualizar em tela cheia
                      </p>

                      <Button
                        className="relative cursor-pointer transition-all duration-300 
                                   hover:scale-105 hover:shadow-lg hover:bg-primary/90 active:scale-95"
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href =
                            "https://drive.google.com/uc?export=download&id=1SgJETTmBMuwfhpDUp0DLn3v08SBc27EO";
                          link.download = "carlosfilho2025.pdf";
                          link.click();
                        }}
                      >
                        <FileDown className="mr-2 h-4 w-4" />
                        Download CV
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Contact;
