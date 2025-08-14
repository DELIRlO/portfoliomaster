import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Mail, Github, Linkedin, Instagram, ExternalLink } from 'lucide-react';
import userData from '../userData';
import PageTransition from './PageTransition';

const Contact = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const contactLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: userData.social.github,
      description: 'Veja meus projetos e contribuições'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: userData.social.linkedin,
      description: 'Conecte-se comigo profissionalmente'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: userData.social.instagram,
      description: 'Acompanhe meu dia a dia'
    },
    {
      icon: ExternalLink,
      label: 'Portfólio 1',
      href: userData.social.portfolio1,
      description: 'Meu portfólio principal'
    },
    {
      icon: ExternalLink,
      label: 'Portfólio 2',
      href: userData.social.portfolio2,
      description: 'Projetos e experimentos'
    }
  ];

  return (
    <PageTransition isVisible={inView}>
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div ref={ref} className={`transition-all duration-1000 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Vamos Conversar?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Estou sempre aberto a novas oportunidades e colaborações. Entre em contato!
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className={`transition-all duration-1000 delay-200 ${inView ? 'animate-fade-in-left' : 'opacity-0'}`}>
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 h-full">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-2xl gradient-text">Entre em Contato</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-muted-foreground mb-6">
                        Interessado em trabalhar juntos? Tem alguma pergunta ou apenas quer dizer olá? 
                        Ficarei feliz em ouvir de você!
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-primary" />
                          <span className="text-muted-foreground">ysneshy@gmail.com</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-primary">📍</span>
                          <span className="text-muted-foreground">Belém, Pará - Brasil</span>
                        </div>
                      </div>

                      <Button className="mt-6 glow" asChild>
                        <a href="mailto:ysneshy@gmail.com">
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar Email
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className={`transition-all duration-1000 delay-400 ${inView ? 'animate-fade-in-right' : 'opacity-0'}`}>
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 h-full">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-2xl gradient-text">Redes Sociais</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-4">
                        {contactLinks.map((link, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors group">
                            <div className="flex items-center space-x-3">
                              <link.icon className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium">{link.label}</p>
                                <p className="text-sm text-muted-foreground">{link.description}</p>
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Contact;

