import { useInView } from "react-intersection-observer";
import { useState } from "react";
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
  MessageCircle,
  Users,
  FileText,
} from "lucide-react";
import userData from "../userData";
import PageTransition from "./PageTransition";
import DisintegrationTitle from "./DisintegrationTitle";

const Contact = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [hoveredButton, setHoveredButton] = useState("");

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
      customIcon: "🪐",
    },
    {
      icon: ExternalLink,
      label: "Portfólio 8Bits",
      href: userData.social.portfolio2,
      description: "",
      customIcon: "megaman",
    },
  ];

  return (
    <>
      {/* Estilos CSS para as animações */}
      <style jsx>{`
        @keyframes textShimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes floatUp {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0);
          }
          10% {
            opacity: 1;
            transform: translateY(15px) scale(1);
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-20px) scale(0);
          }
        }

        @keyframes pulseScale {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        @keyframes professionalGlowRed {
          0%,
          100% {
            box-shadow: 0 0 3px rgba(239, 68, 68, 0.18),
              0 0 6px rgba(239, 68, 68, 0.12), 0 0 9px rgba(239, 68, 68, 0.06),
              inset 0 1px 0 rgba(255, 255, 255, 0.06);
          }
          50% {
            box-shadow: 0 0 6px rgba(239, 68, 68, 0.3),
              0 0 12px rgba(239, 68, 68, 0.18), 0 0 18px rgba(239, 68, 68, 0.12),
              inset 0 1px 0 rgba(255, 255, 255, 0.12);
          }
        }

        @keyframes slideShine {
          0% {
            transform: translateX(-100%) skewX(-15deg);
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(300%) skewX(-15deg);
            opacity: 0.6;
          }
        }

        /* Classe base para botões profissionais */
        .professional-button-cv {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.05)
          );
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transform: translateY(0);
        }

        .professional-button-cv:hover {
          transform: translateY(-2px);
          animation: pulseScale 2s ease-in-out infinite,
            professionalGlowRed 2s ease-in-out infinite;
        }

        /* Efeito de brilho deslizante */
        .professional-button-cv::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(239, 68, 68, 0.2),
            transparent
          );
          transition: left 0.5s;
        }

        .professional-button-cv:hover::before {
          left: 100%;
          animation: slideShine 2s ease-in-out infinite;
        }

        /* Texto com gradiente animado vermelho - IGUAL AO HERO */
        .animated-text-red {
          background: linear-gradient(
            90deg,
            #ef4444 0%,
            #ffffff 25%,
            #ef4444 50%,
            #ffffff 75%,
            #ef4444 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShimmer 2s ease-in-out infinite;
        }

        .animated-text {
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #e2e8f0 25%,
            #ffffff 50%,
            #e2e8f0 75%,
            #ffffff 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShimmer 3s ease-in-out infinite;
        }

        /* Ícone com cor vermelha e efeito shimmer */
        .icon-shimmer {
          filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
          transition: all 0.3s ease;
          color: #ffffff;
        }

        .icon-shimmer-red {
          color: #ef4444;
          filter: drop-shadow(0 0 3px rgba(239, 68, 68, 0.4));
        }

        .professional-button-cv:hover .icon-shimmer {
          transform: scale(1.1);
          filter: drop-shadow(0 0 4px currentColor);
        }

        /* Partículas flutuantes vermelhas */
        .floating-particles-cv {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .particle-cv {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(239, 68, 68, 0.8);
          border-radius: 50%;
          animation: floatUp 3s ease-out infinite;
        }

        /* Efeito de linha brilhante embaixo */
        .glow-line-cv {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ef4444, transparent);
          transition: width 0.4s ease-out;
        }

        .professional-button-cv:hover .glow-line-cv {
          width: 80%;
        }

        /* Borda animada vermelha */
        .animated-border-cv {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(45deg, transparent, #ef4444, transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: exclude;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .professional-button-cv:hover .animated-border-cv {
          opacity: 0.5;
        }
      `}</style>

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
                <DisintegrationTitle
                  className="text-3xl md:text-4xl font-bold mb-4 gradient-text flex items-center justify-center gap-3"
                  icon={
                    <MessageCircle className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                  }
                  delay={400}
                  particleCount={45}
                >
                  Vamos Conversar?
                </DisintegrationTitle>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Estou sempre aberto a novas oportunidades e colaborações.
                  Entre em contato!
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
                        <CardTitle className="text-2xl gradient-text flex items-center gap-2">
                          <Mail className="h-6 w-6 text-primary" />
                          Entre em Contato
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <p className="text-muted-foreground mb-6">
                          Interessado em trabalhar juntos? Tem alguma pergunta
                          ou apenas quer dizer olá? Ficarei feliz em ouvir de
                          você!
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

                  {/* Seção Redes Sociais */}
                  <div
                    className={`transition-all duration-1000 delay-400 ${
                      inView ? "animate-fade-in-right" : "opacity-0"
                    }`}
                  >
                    <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 h-full">
                      <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-2xl gradient-text flex items-center gap-2">
                          <Users className="h-6 w-6 text-primary" />
                          Redes Sociais
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        {/* Versão Desktop */}
                        <div className="hidden md:block space-y-4">
                          {contactLinks.map((link, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors group"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="h-5 w-5 flex items-center justify-center">
                                  {link.label === "Instagram" ? (
                                    <Instagram className="h-5 w-5 animate-[pulseColors_3s_infinite]" />
                                  ) : link.label === "GitHub" ? (
                                    <link.icon className="h-5 w-5 animate-[pulseGitHub_3s_infinite]" />
                                  ) : link.label === "LinkedIn" ? (
                                    <link.icon className="h-5 w-5 animate-[pulseLinkedIn_3s_infinite]" />
                                  ) : link.label === "Portfólio Lunar" ? (
                                    <span className="text-lg animate-pulse">
                                      🪐
                                    </span>
                                  ) : link.label === "Portfólio 8Bits" ? (
                                    <span className="text-lg animate-pulse-megaman">
                                      <img
                                        src="/thumbnails/megaman_icon.png"
                                        alt="Mega Man Icon"
                                        className="h-5 w-5"
                                      />
                                    </span>
                                  ) : (
                                    <link.icon className="h-5 w-5 text-primary" />
                                  )}
                                </div>

                                <div>
                                  <p
                                    className={`font-medium ${
                                      link.label === "Instagram"
                                        ? "transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-yellow-500"
                                        : link.label === "GitHub"
                                        ? "transition-colors duration-300 group-hover:text-purple-500"
                                        : link.label === "LinkedIn"
                                        ? "transition-colors duration-300 group-hover:text-blue-600"
                                        : ""
                                    }`}
                                  >
                                    {link.label}
                                  </p>
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

                        {/* Versão Mobile */}
                        <div className="md:hidden space-y-3">
                          {contactLinks.map((link, index) => (
                            <div
                              key={index}
                              className="p-4 rounded-lg bg-muted/50 border border-primary/20 hover:border-primary/40 transition-colors"
                            >
                              {/* Header do card com ícone animado e nome */}
                              <div className="flex items-center space-x-3 mb-3">
                                <div className="h-6 w-6 flex items-center justify-center">
                                  {link.label === "Instagram" ? (
                                    <Instagram className="h-6 w-6 animate-[pulseColors_3s_infinite]" />
                                  ) : link.label === "GitHub" ? (
                                    <link.icon className="h-6 w-6 animate-[pulseGitHub_3s_infinite]" />
                                  ) : link.label === "LinkedIn" ? (
                                    <link.icon className="h-6 w-6 animate-[pulseLinkedIn_3s_infinite]" />
                                  ) : link.label === "Portfólio Lunar" ? (
                                    <span className="text-2xl animate-pulse">
                                      🪐
                                    </span>
                                  ) : link.label === "Portfólio 8Bits" ? (
                                    <span className="text-2xl animate-pulse-megaman">
                                      <img
                                        src="/thumbnails/megaman_icon.png"
                                        alt="Mega Man Icon"
                                        className="h-6 w-6"
                                      />
                                    </span>
                                  ) : (
                                    <link.icon className="h-6 w-6 text-primary animate-pulse" />
                                  )}
                                </div>
                                <h3
                                  className={`font-semibold text-lg transition-colors duration-300 ${
                                    link.label === "Instagram"
                                      ? "text-pink-500 animate-[pulseColors_3s_infinite]"
                                      : link.label === "GitHub"
                                      ? "text-purple-400 animate-[pulseGitHub_3s_infinite]"
                                      : link.label === "LinkedIn"
                                      ? "text-blue-500 animate-[pulseLinkedIn_3s_infinite]"
                                      : link.label === "Portfólio Lunar"
                                      ? "text-indigo-400"
                                      : link.label === "Portfólio 8Bits"
                                      ? "text-green-400"
                                      : "text-foreground"
                                  }`}
                                >
                                  {link.label}
                                </h3>
                              </div>

                              {/* Descrição (se existir) */}
                              {link.description && (
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                  {link.description}
                                </p>
                              )}

                              {/* Botão sempre visível */}
                              <Button
                                variant="outline"
                                size="sm"
                                className={`w-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                                  link.label === "Instagram"
                                    ? "border-pink-500/50 hover:border-pink-500 hover:bg-pink-500/10 text-pink-500"
                                    : link.label === "GitHub"
                                    ? "border-purple-400/50 hover:border-purple-400 hover:bg-purple-400/10 text-purple-400"
                                    : link.label === "LinkedIn"
                                    ? "border-blue-500/50 hover:border-blue-500 hover:bg-blue-500/10 text-blue-500"
                                    : link.label === "Portfólio Lunar"
                                    ? "border-indigo-400/50 hover:border-indigo-400 hover:bg-indigo-400/10 text-indigo-400"
                                    : link.label === "Portfólio 8Bits"
                                    ? "border-green-400/50 hover:border-green-400 hover:bg-green-400/10 text-green-400"
                                    : "border-primary/50 hover:border-primary hover:bg-primary/10"
                                }`}
                                asChild
                              >
                                <a
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center"
                                >
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  {link.label === "Portfólio Lunar" ||
                                  link.label === "Portfólio 8Bits"
                                    ? `Acessar ${link.label}`
                                    : `Seguir no ${link.label}`}
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
                        <CardTitle className="text-2xl gradient-text flex items-center gap-2">
                          <FileText className="h-6 w-6 text-primary" />
                          Currículo
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <img
                          src="https://i.ibb.co/MxKmZVQR/CARLOSAUGUSTOFILHO2025.png"
                          alt="Currículo"
                          className="rounded-lg shadow-md cursor-pointer mb-4 hover:scale-105 transition-transform"
                          onClick={() =>
                            window.open(
                              "https://i.ibb.co/MxKmZVQR/CARLOSAUGUSTOFILHO2025.png",
                              "_blank"
                            )
                          }
                        />
                        <p className="text-sm text-muted-foreground mb-4">
                          Clique na imagem para visualizar em tela cheia
                        </p>

                        {/* Botão Download CV com todas as animações - REDUZIDO 40% */}
                        <div className="relative group">
                          <Button
                            className="professional-button-cv cv-button-red relative cursor-pointer px-5 py-3 text-base font-medium z-10 w-auto mx-auto"
                            onClick={() => {
                              const link = document.createElement("a");
                              link.href =
                                "https://drive.google.com/uc?export=download&id=1CqXH0dlmXrjeyCpGN0AY4EaIf828nc2R";
                              link.download = "CARLOSAUGUSTOFILHO2025.pdf";
                              link.click();
                            }}
                            onMouseEnter={() => setHoveredButton("downloadcv")}
                            onMouseLeave={() => setHoveredButton("")}
                          >
                            <FileDown
                              className={`mr-2 h-4 w-4 icon-shimmer transition-all duration-300 ${
                                hoveredButton === "downloadcv"
                                  ? "icon-shimmer-red"
                                  : ""
                              }`}
                            />
                            <span
                              className={
                                hoveredButton === "downloadcv"
                                  ? "animated-text-red"
                                  : "animated-text"
                              }
                            >
                              Download CV
                            </span>
                          </Button>

                          {/* Partículas flutuantes vermelhas */}
                          {hoveredButton === "downloadcv" && (
                            <div className="floating-particles-cv">
                              {[...Array(8)].map((_, i) => (
                                <div
                                  key={i}
                                  className="particle-cv"
                                  style={{
                                    left: `${20 + Math.random() * 60}%`,
                                    animationDelay: `${i * 0.25}s`,
                                  }}
                                />
                              ))}
                            </div>
                          )}

                          {/* Linha brilhante vermelha */}
                          <div className="glow-line-cv"></div>

                          {/* Borda animada vermelha */}
                          <div className="animated-border-cv"></div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageTransition>
    </>
  );
};

export default Contact;
