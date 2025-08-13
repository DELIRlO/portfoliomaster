import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Github, ExternalLink } from 'lucide-react';
import GitHubProjects from './GitHubProjects';
import userData from '../userData';

const Projects = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const getTechColor = (tech) => {
    const colors = {
      'JavaScript': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      'Python': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'React': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      'HTML': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'CSS': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
      'TypeScript': 'bg-blue-700/20 text-blue-400 border-blue-700/30',
    };
    return colors[tech] || 'bg-primary/20 text-primary border-primary/30';
  };

  // Featured projects (manually curated)
  const featuredProjects = userData.projects.slice(0, 6);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Projetos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Alguns dos projetos que desenvolvi ao longo da minha carreira
            </p>
          </div>

          {/* Featured Projects */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center gradient-text">Projetos em Destaque</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000 ${
                    inView ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="gradient-text group-hover:text-primary transition-colors">
                          {project.name}
                        </span>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" asChild>
                            <a 
                              href={project.githubLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:text-primary"
                            >
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                          {project.onlineLink && (
                            <Button variant="ghost" size="icon" asChild>
                              <a 
                                href={project.onlineLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-primary"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 min-h-[3rem]">
                        {project.description || 'Projeto em desenvolvimento...'}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge 
                            key={techIndex} 
                            variant="outline" 
                            className={`${getTechColor(tech)} text-xs`}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-3 w-3" />
                            Código
                          </a>
                        </Button>
                        {project.onlineLink && (
                          <Button size="sm" className="flex-1" asChild>
                            <a href={project.onlineLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-3 w-3" />
                              Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Projects */}
          <GitHubProjects />
        </div>
      </div>
    </section>
  );
};

export default Projects;

