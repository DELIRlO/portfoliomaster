import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Github, ExternalLink, Eye, FolderOpen } from "lucide-react";
import GitHubProjects from "./GitHubProjects";
import userData from "../userData";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import PageTransition from "./PageTransition";
import DisintegrationTitle from "./DisintegrationTitle";

const Projects = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const { ref: projectsRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px",
  });

  const getTechColor = (tech) => {
    const colors = {
      JavaScript: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      Python: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      React: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      HTML: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      CSS: "bg-blue-600/20 text-blue-400 border-blue-600/30",
      TypeScript: "bg-blue-700/20 text-blue-400 border-blue-700/30",
    };
    return colors[tech] || "bg-primary/20 text-primary border-primary/30";
  };

  // Função para obter a imagem do projeto
  const getProjectThumbnail = (project) => {
    // Usar a thumbnail do projeto se existir, senão usar fallback
    return project.thumbnail || "/thumbnails/portfoliomaster.png";
  };

  // Featured projects (manually curated)
  const featuredProjects = userData.projects.slice(0, 6);

  return (
    <PageTransition isVisible={inView}>
      <section id="projects" className="py-20">
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
                  <FolderOpen className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                }
                delay={300}
                particleCount={35}
              >
                Projetos
              </DisintegrationTitle>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Alguns dos projetos que desenvolvi ao longo da minha carreira
              </p>
            </div>

            {/* Featured Projects */}
            <div className="mb-16" ref={projectsRef}>
              <DisintegrationTitle
                className="text-2xl md:text-3xl font-bold mb-8 text-center gradient-text flex items-center justify-center gap-3"
                icon={<Eye className="h-6 w-6 md:h-8 md:w-8 text-primary" />}
                delay={800}
                particleCount={30}
              >
                Projetos em Destaque
              </DisintegrationTitle>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-1000 ${
                      hasIntersected ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 group hover-lift overflow-hidden">
                      {/* Imagem do Projeto */}
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                        <img
                          src={getProjectThumbnail(project)}
                          alt={`${project.name} thumbnail`}
                          className="w-full h-full object-cover transition-transform duration-500 transform scale-75 group-hover:scale-90"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        {/* Fallback quando a imagem não carrega */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center hidden">
                          <div className="text-4xl font-bold text-primary/60">
                            {project.name.charAt(0).toUpperCase()}
                          </div>
                        </div>

                        {/* Overlay com botões */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                          <Button
                            variant="secondary"
                            size="sm"
                            asChild
                            className="smooth-transition"
                          >
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2"
                            >
                              <Github className="h-4 w-4" />
                              <span>Código</span>
                            </a>
                          </Button>
                          {project.onlineLink && (
                            <Button
                              size="sm"
                              asChild
                              className="smooth-transition"
                            >
                              <a
                                href={project.onlineLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2"
                              >
                                <Eye className="h-4 w-4" />
                                <span>Demo</span>
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>

                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center justify-between">
                          <span className="gradient-text group-hover:text-primary transition-colors text-lg">
                            {project.name}
                          </span>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              asChild
                            >
                              <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary smooth-transition"
                              >
                                <Github className="h-3 w-3" />
                              </a>
                            </Button>
                            {project.onlineLink && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                asChild
                              >
                                <a
                                  href={project.onlineLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-primary smooth-transition"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <p className="text-muted-foreground mb-4 text-sm leading-relaxed min-h-[2.5rem]">
                          {project.description ||
                            "Projeto em desenvolvimento..."}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className={`${getTechColor(
                                tech
                              )} text-xs px-2 py-1 smooth-transition hover:scale-105`}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 smooth-transition"
                            asChild
                          >
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="mr-2 h-3 w-3" />
                              Código
                            </a>
                          </Button>
                          {project.onlineLink && (
                            <Button
                              size="sm"
                              className="flex-1 smooth-transition"
                              asChild
                            >
                              <a
                                href={project.onlineLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
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
          </div>
        </div>
      </section>

      {/* GitHub Projects - SEM PageTransition aqui, pois ele já tem seu próprio controle de animação */}
      <GitHubProjects />
    </PageTransition>
  );
};

export default Projects;
