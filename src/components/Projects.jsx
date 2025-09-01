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

  // Função melhorada para obter cores de tecnologia com melhor contraste
  const getTechColor = (tech) => {
    const isDarkMode = document.documentElement.classList.contains("dark");

    const colors = {
      JavaScript: isDarkMode
        ? "bg-yellow-500/30 text-yellow-100 border-yellow-500/50"
        : "bg-yellow-500/30 text-yellow-900 border-yellow-500/50",
      Python: isDarkMode
        ? "bg-blue-500/30 text-blue-100 border-blue-500/50"
        : "bg-blue-500/30 text-blue-900 border-blue-500/50",
      React: isDarkMode
        ? "bg-cyan-500/30 text-cyan-100 border-cyan-500/50"
        : "bg-cyan-500/30 text-cyan-900 border-cyan-500/50",
      HTML: isDarkMode
        ? "bg-orange-500/30 text-orange-100 border-orange-500/50"
        : "bg-orange-500/30 text-orange-900 border-orange-500/50",
      CSS: isDarkMode
        ? "bg-blue-600/30 text-blue-100 border-blue-600/50"
        : "bg-blue-600/30 text-blue-900 border-blue-600/50",
      TypeScript: isDarkMode
        ? "bg-blue-700/30 text-blue-100 border-blue-700/50"
        : "bg-blue-700/30 text-blue-900 border-blue-700/50",
      default: isDarkMode
        ? "bg-primary/30 text-primary-foreground border-primary/50"
        : "bg-primary/30 text-primary-foreground border-primary/50",
    };

    return colors[tech] || colors.default;
  };

  // Função para obter a imagem do projeto
  const getProjectThumbnail = (project) => {
    return project.thumbnail || "/thumbnails/portfoliomaster.png";
  };

  // Função para obter estilos de botão com melhor contraste
  const getButtonStyles = (isDarkMode) => {
    return {
      primary: isDarkMode
        ? "bg-primary text-white hover:bg-primary/90 border-primary"
        : "bg-primary text-white hover:bg-primary/90 border-primary",
      outline: isDarkMode
        ? "bg-transparent text-white border-primary hover:bg-primary/20"
        : "bg-transparent text-white border-primary hover:bg-primary/10",
      secondary: isDarkMode
        ? "bg-secondary text-white hover:bg-secondary/80 border-secondary"
        : "bg-secondary text-white hover:bg-secondary/80 border-secondary",
    };
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
                {featuredProjects.map((project, index) => {
                  const isDarkMode =
                    document.documentElement.classList.contains("dark");
                  const buttonStyles = getButtonStyles(isDarkMode);

                  return (
                    <div
                      key={index}
                      className={`transition-all duration-1000 ${
                        hasIntersected ? "animate-fade-in-up" : "opacity-0"
                      }`}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <Card className="h-full bg-card/50 backdrop-blur-sm border-border hover:border-primary/40 transition-all duration-500 hover:shadow-xl group hover-lift overflow-hidden">
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

                          {/* Overlay com botões - CORRIGIDO para melhor visibilidade */}
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                            <Button
                              className={`${buttonStyles.secondary} font-semibold px-4 py-2 rounded-md transition-all`}
                              asChild
                            >
                              <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2"
                              >
                                <Github className="h-4 w-4" />
                                <span className="text-sm">Código</span>
                              </a>
                            </Button>
                            {project.onlineLink && (
                              <Button
                                className={`${buttonStyles.primary} font-semibold px-4 py-2 rounded-md transition-all`}
                                asChild
                              >
                                <a
                                  href={project.onlineLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-2"
                                >
                                  <Eye className="h-4 w-4" />
                                  <span className="text-sm">Demo</span>
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>

                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center justify-between">
                            <span className="text-foreground group-hover:text-primary transition-colors text-lg font-semibold">
                              {project.name}
                            </span>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-primary/20 text-white hover:text-white"
                                asChild
                              >
                                <a
                                  href={project.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-white text-white"
                                >
                                  <Github className="h-4 w-4" />
                                </a>
                              </Button>
                              {project.onlineLink && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 hover:bg-primary/20 text-white hover:text-white"
                                  asChild
                                >
                                  <a
                                    href={project.onlineLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white text-white"
                                  >
                                    <ExternalLink className="h-4 w-4" />
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
                                )} text-xs px-2 py-1 font-medium hover:scale-105 transition-transform`}
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          {/* Botões principais - CORRIGIDOS para melhor visibilidade */}
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className={`flex-1 font-medium ${buttonStyles.outline}`}
                              asChild
                            >
                              <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="mr-2 h-4 w-4" />
                                Código
                              </a>
                            </Button>
                            {project.onlineLink && (
                              <Button
                                size="sm"
                                className={`flex-1 font-medium ${buttonStyles.primary}`}
                                asChild
                              >
                                <a
                                  href={project.onlineLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Demo
                                </a>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Projects */}
      <GitHubProjects />
    </PageTransition>
  );
};

export default Projects;
