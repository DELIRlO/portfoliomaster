import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "./ui/card";
import userData from "../userData";
import PageTransition from "./PageTransition";
import Typewriter from "./Typewriter";
import { BarChart4, Bot, User, MapPin, GraduationCap, Cog, BookOpen } from "lucide-react"; // BarChart4 para Power BI, Bot para RPA, User para Sobre Mim

// Configuração completa de cores para todas as linguagens
const skillStyles = {
  // Frontend
  HTML: { border: "border-red-500", gradient: "from-red-500 to-orange-500" },
  CSS: { border: "border-blue-500", gradient: "from-blue-500 to-cyan-500" },
  JavaScript: {
    border: "border-yellow-500",
    gradient: "from-yellow-500 to-amber-500",
  },
  TypeScript: {
    border: "border-blue-600",
    gradient: "from-blue-600 to-indigo-500",
  },
  React: { border: "border-cyan-400", gradient: "from-cyan-400 to-blue-500" },
  "Next.js": {
    border: "border-purple-500",
    gradient: "from-purple-500 to-pink-500",
  },
  Tailwind: {
    border: "border-cyan-300",
    gradient: "from-cyan-300 to-teal-400",
  },
  "Styled Components": {
    border: "border-pink-400",
    gradient: "from-pink-400 to-rose-500",
  },

  // Backend
  "Node.js": {
    border: "border-green-500",
    gradient: "from-green-500 to-emerald-500",
  },
  Python: {
    border: "border-emerald-500",
    gradient: "from-emerald-500 to-green-500",
  },
  PHP: {
    border: "border-indigo-500",
    gradient: "from-indigo-500 to-purple-500",
  },
  Laravel: { border: "border-red-600", gradient: "from-red-600 to-orange-500" },
  Java: {
    border: "border-amber-600",
    gradient: "from-amber-600 to-yellow-500",
  },
  "C#": {
    border: "border-violet-600",
    gradient: "from-violet-600 to-purple-600",
  },

  // Mobile/Game
  Flutter: { border: "border-teal-400", gradient: "from-teal-400 to-blue-400" },
  Godot: { border: "border-green-400", gradient: "from-green-400 to-lime-400" },

  // Ferramentas
  Git: {
    border: "border-orange-500",
    gradient: "from-orange-500 to-amber-500",
  },
  GitHub: { border: "border-gray-500", gradient: "from-gray-500 to-gray-700" },
  "Power BI": {
    border: "border-blue-400",
    gradient: "from-blue-400 to-cyan-400",
    icon: <BarChart4 className="w-5 h-5" />,
  },
  RPA: {
    border: "border-gray-400",
    gradient: "from-gray-400 to-gray-500",
    icon: <Bot className="w-5 h-5" />,
  },
  "Material UI": {
    border: "border-lightBlue-400",
    gradient: "from-lightBlue-400 to-blue-500",
  },

  // Default
  default: { border: "border-primary", gradient: "from-primary to-accent" },
};

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <PageTransition isVisible={inView}>
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div
            ref={ref}
            className={`transition-all duration-1000 ${
              inView ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text flex items-center justify-center gap-3">
                <User className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                Sobre Mim
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Conheça um pouco mais sobre minha trajetória e habilidades
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Seção "Minha História" */}
              <div
                className={`transition-all duration-1000 delay-200 ${
                  inView ? "animate-fade-in-left" : "opacity-0"
                }`}
              >
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <BookOpen className="h-6 w-6 text-primary" />
                      Minha História
                    </h3>
                    <div className="text-muted-foreground mb-4">
                      <p className="font-bold">
                        Tecnologia da Informação com expertise em:
                      </p>
                      <ul className="list-disc list-inside">
                        <li>
                          <Typewriter
                            text="Desenvolvimento de sistemas e programação full-stack"
                            delay={0}
                          />
                        </li>
                        <li>
                          <Typewriter
                            text="Arquitetura e administração de redes computacionais"
                            delay={3500}
                          />
                        </li>
                        <li>
                          <Typewriter
                            text="Soluções técnicas personalizadas para infraestrutura de TI"
                            delay={7500}
                          />
                        </li>
                      </ul>
                      <br />
                      <p className="font-bold">Destaques profissionais:</p>
                      <ul className="list-disc list-inside">
                        <li>
                          <Typewriter
                            text="Autodidata com capacitação contínua nas últimas tecnologias"
                            delay={12000}
                          />
                        </li>
                        <li>
                          <Typewriter
                            text="Visão estratégica para análise e solução de problemas complexos"
                            delay={17000}
                          />
                        </li>
                        <li>
                          <Typewriter
                            text="Especialista em UX/UI e otimização da experiência do usuário"
                            delay={22500}
                          />
                        </li>
                        <li>
                          <Typewriter
                            text="Inovação aplicada com metodologias ágeis e boas práticas de desenvolvimento"
                            delay={28000}
                          />
                        </li>
                      </ul>
                      <br />
                      <p className="font-bold">Competências-chave:</p>
                      <ul className="list-disc list-inside">
                        <li>
                          <Typewriter
                            text="Pensamento analítico para arquitetura de sistemas"
                            delay={34000}
                          />
                        </li>
                        <li>
                          <Typewriter
                            text="Domínio de protocolos e topologias de rede"
                            delay={38500}
                          />
                        </li>
                        <li>
                          <Typewriter
                            text="Desenvolvimento de soluções tecnológicas customizadas"
                            delay={43000}
                          />
                        </li>
                        <li>
                          <Typewriter
                            text="Implementação de melhorias contínuas em produtos digitais"
                            delay={48000}
                          />
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Seção "Habilidades Técnicas" */}
              <div
                className={`transition-all duration-1000 delay-400 ${
                  inView ? "animate-fade-in-right" : "opacity-0"
                }`}
              >
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-bold mb-6">
                      Habilidades Técnicas
                    </h3>

                    {/* Grid de habilidades com efeitos */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {userData.skills.map((skill, index) => {
                        const style =
                          skillStyles[skill.name] || skillStyles.default;
                        return (
                          <div
                            key={index}
                            className="relative group w-4/5 justify-self-center"
                          >
                            {/* Animação de traço colorido */}
                            <div
                              className={`absolute -inset-0.5 rounded-lg bg-gradient-to-r ${style.gradient} 
                              opacity-75 group-hover:opacity-100 blur-sm group-hover:blur-none 
                              transition-all duration-300 animate-pulse group-hover:animate-none`}
                            ></div>

                            {/* Card da habilidade */}
                            <div
                              className={`relative bg-card rounded-lg px-3 py-2 text-sm font-medium 
                                border ${style.border} group-hover:border-transparent transition-all duration-300
                                hover:scale-105 hover:shadow-lg flex items-center justify-start space-x-2`}
                            >
                              {style.icon ? (
                                style.icon
                              ) : (
                                <img
                                  src={skill.icon}
                                  alt={`${skill.name} icon`}
                                  className="w-5 h-5"
                                />
                              )}
                              <span className="text-foreground">
                                {skill.name}
                              </span>

                              {/* Animação de brilho interno */}
                              <div
                                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 
                                transition-opacity duration-500"
                                style={{
                                  background: `radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 70%)`,
                                }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Seção "Localização" */}
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 mt-6">
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <MapPin className="h-6 w-6 text-primary" />
                      Localização
                    </h3>
                    <div className="space-y-3">
                      <p className="text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        Belém, Pará - Brasil
                      </p>
                      <p className="text-muted-foreground flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-green-500" />
                        ITA - Instituto de Tecnologia da Aeronáutica
                      </p>
                      <p className="text-muted-foreground flex items-center gap-2">
                        <Cog className="h-4 w-4 text-orange-500 animate-spin-slow" />
                        39 anos, Engenheiro de Computação
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default About;
