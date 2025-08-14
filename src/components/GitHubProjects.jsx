import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';
import useGitHubRepos from '../hooks/useGitHubRepos';

const GitHubProjects = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
    <section className="py-12">
      <div ref={ref} className={`transition-all duration-1000 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">Repositórios do GitHub</h3>
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
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/DELIRlO" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Ver todos os repositórios
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GitHubProjects;

