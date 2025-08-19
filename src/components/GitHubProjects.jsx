import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';
import useGitHubRepos from '../hooks/useGitHubRepos';
import PageTransition from './PageTransition';

const GitHubProjects = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [hoveredButton, setHoveredButton] = useState("");

  const { repos, loading, error } = useGitHubRepos('DELIRlO');

  const getLanguageColor = (language) => {
    const colors = {
      'JavaScript': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      'Python': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'TypeScript': 'bg-blue-700/20 text-blue-400 border-blue-700/30',
      'HTML': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'CSS': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
      'Java': 'bg-red-500/20 text-red-300 border-red-500/30',
      'C++': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'C#': 'bg-green-500/20 text-green-300 border-green-500/30',
      'PHP': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      'Ruby': 'bg-red-600/20 text-red-400 border-red-600/30',
    };
    return colors[language] || 'bg-primary/20 text-primary border-primary/30';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground mt-2">Carregando repositórios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Erro ao carregar repositórios do GitHub</p>
      </div>
    );
  }

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
        .professional-button-repos {
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

        .professional-button-repos:hover {
          transform: translateY(-2px);
          animation: pulseScale 2s ease-in-out infinite,
            professionalGlowRed 2s ease-in-out infinite;
        }

        /* Efeito de brilho deslizante */
        .professional-button-repos::before {
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

        .professional-button-repos:hover::before {
          left: 100%;
          animation: slideShine 2s ease-in-out infinite;
        }

        /* Texto com gradiente animado vermelho */
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

        .professional-button-repos:hover .icon-shimmer {
          transform: scale(1.1);
          filter: drop-shadow(0 0 4px currentColor);
        }

        /* Partículas flutuantes vermelhas */
        .floating-particles-repos {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .particle-repos {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(239, 68, 68, 0.8);
          border-radius: 50%;
          animation: floatUp 3s ease-out infinite;
        }

        /* Efeito de linha brilhante embaixo */
        .glow-line-repos {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ef4444, transparent);
          transition: width 0.4s ease-out;
        }

        .professional-button-repos:hover .glow-line-repos {
          width: 80%;
        }

        /* Borda animada vermelha */
        .animated-border-repos {
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

        .professional-button-repos:hover .animated-border-repos {
          opacity: 0.5;
        }
      `}</style>

      <PageTransition isVisible={inView}>
        <section className="py-12">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text flex items-center justify-center gap-3">
              <Github className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              Repositórios do GitHub
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meus projetos mais recentes e populares no GitHub
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, index) => (
              <div
                key={repo.id}
                className={`transition-all duration-1000 ${
                  inView ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="gradient-text group-hover:text-primary transition-colors text-lg">
                        {repo.name}
                      </span>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" asChild>
                          <a 
                            href={repo.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-primary"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                        {repo.homepage && (
                          <Button variant="ghost" size="icon" asChild>
                            <a 
                              href={repo.homepage} 
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
                    <p className="text-muted-foreground mb-4 min-h-[3rem] text-sm">
                      {repo.description || 'Sem descrição disponível'}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.language && (
                        <Badge 
                          variant="outline" 
                          className={`${getLanguageColor(repo.language)} text-xs`}
                        >
                          {repo.language}
                        </Badge>
                      )}
                      {repo.topics && repo.topics.slice(0, 2).map((topic, topicIndex) => (
                        <Badge 
                          key={topicIndex} 
                          variant="outline" 
                          className="bg-muted/50 text-muted-foreground border-muted text-xs"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitFork className="h-3 w-3" />
                          <span>{repo.forks_count}</span>
                        </div>
                      </div>
                      <span>{formatDate(repo.updated_at)}</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-3 w-3" />
                          Código
                        </a>
                      </Button>
                      {repo.homepage && (
                        <Button size="sm" className="flex-1" asChild>
                          <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
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

          <div className="text-center mt-4">
            <div className="relative group">
              <Button
                className="professional-button-repos relative cursor-pointer px-6 py-3 text-base font-medium z-10 w-auto mx-auto"
                size="lg"
                onMouseEnter={() => setHoveredButton("repos")}
                onMouseLeave={() => setHoveredButton("")}
                asChild
              >
                <a href="https://github.com/DELIRlO" target="_blank" rel="noopener noreferrer">
                  <Github
                    className={`mr-2 h-4 w-4 icon-shimmer transition-all duration-300 ${
                      hoveredButton === "repos"
                        ? "icon-shimmer-red"
                        : ""
                    }`}
                  />
                  <span
                    className={
                      hoveredButton === "repos"
                        ? "animated-text-red"
                        : "animated-text"
                    }
                  >
                    Ver todos os repositórios
                  </span>
                </a>
              </Button>

              {/* Partículas flutuantes vermelhas */}
              {hoveredButton === "repos" && (
                <div className="floating-particles-repos">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="particle-repos"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.25}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Linha brilhante vermelha */}
              <div className="glow-line-repos"></div>

              {/* Borda animada vermelha */}
              <div className="animated-border-repos"></div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
    </>
  );
};

export default GitHubProjects;

