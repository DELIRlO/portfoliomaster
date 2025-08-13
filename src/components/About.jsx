import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import userData from '../userData';

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Sobre Mim</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conheça um pouco mais sobre minha trajetória e habilidades
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 delay-200 ${inView ? 'animate-fade-in-left' : 'opacity-0'}`}>
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold mb-4">Minha História</h3>
                  <p className="text-muted-foreground mb-4">
                    {userData.about}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Formado pelo ITA (Instituto de Tecnologia da Aeronáutica), tenho experiência sólida em desenvolvimento 
                    de sistemas e programas. Minha paixão pela tecnologia me leva a estar sempre aprendendo e explorando 
                    novas ferramentas e frameworks.
                  </p>
                  <p className="text-muted-foreground">
                    Atualmente, foco no desenvolvimento front-end com React, mas também tenho conhecimento em backend 
                    e outras tecnologias que me permitem criar soluções completas.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className={`transition-all duration-1000 delay-400 ${inView ? 'animate-fade-in-right' : 'opacity-0'}`}>
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold mb-6">Habilidades Técnicas</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {userData.skills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="justify-center py-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 mt-6">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold mb-4">Localização</h3>
                  <p className="text-muted-foreground">
                    📍 Belém, Pará - Brasil
                  </p>
                  <p className="text-muted-foreground">
                    🎓 ITA - Instituto de Tecnologia da Aeronáutica
                  </p>
                  <p className="text-muted-foreground">
                    👨‍💻 39 anos, Engenheiro de Computação
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

