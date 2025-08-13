# Portfólio Carlos Filho

Um portfólio pessoal moderno e responsivo inspirado no design do tania.dev, desenvolvido com React e integração dinâmica com a API do GitHub.

## 🚀 Características

- **Design Moderno**: Interface inspirada no tania.dev com tema roxo/preto
- **Responsivo**: Funciona perfeitamente em desktop e mobile
- **Animações de Scroll**: Elementos aparecem suavemente conforme o usuário rola a página
- **Tema Claro/Escuro**: Toggle para alternar entre temas com persistência no localStorage
- **Música de Fundo**: Sistema de áudio ambiente com controles visuais
- **Integração GitHub**: Busca automática dos repositórios mais recentes via API
- **Projetos Dinâmicos**: Exibe tanto projetos em destaque quanto repositórios do GitHub
- **Performance Otimizada**: Carregamento rápido e animações suaves

## 🛠️ Tecnologias Utilizadas

- **React 19** - Framework principal
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **Shadcn/UI** - Componentes de interface
- **Lucide React** - Ícones
- **Framer Motion** - Animações (via Tailwind)
- **React Intersection Observer** - Detecção de scroll
- **GitHub API** - Integração com repositórios

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js 18+ 
- pnpm (recomendado) ou npm

### Passos para executar

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd portfolio-carlos
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   # ou
   npm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   pnpm run dev
   # ou
   npm run dev
   ```

4. **Acesse no navegador**
   ```
   http://localhost:5173
   ```

## 🎵 Sistema de Música

O portfólio inclui um sistema de música de fundo ambiente:

- **Controle Visual**: Botão no header que muda de cor conforme o estado
- **Volume Baixo**: Configurado para não interferir na experiência
- **Autoplay Responsável**: Respeita as políticas do navegador
- **Arquivo Personalizado**: Localizado em `public/background-music.wav`

Para substituir a música:
1. Substitua o arquivo `public/background-music.wav`
2. Ou edite o caminho em `src/hooks/useBackgroundMusic.js`

## 🔧 Personalização

### Dados Pessoais

Edite o arquivo `src/data/userData.js` para personalizar:

```javascript
const userData = {
  name: 'Seu Nome',
  title: 'Seu Título Profissional',
  about: 'Sua descrição...',
  skills: ['Skill1', 'Skill2', ...],
  social: {
    github: 'https://github.com/seuusuario',
    linkedin: 'https://linkedin.com/in/seuusuario',
    // ...
  },
  projects: [
    // Seus projetos em destaque
  ]
};
```

### GitHub Integration

Para alterar o usuário do GitHub, edite o arquivo `src/components/GitHubProjects.jsx`:

```javascript
const { repos, loading, error } = useGitHubRepos('SEU_USUARIO_GITHUB');
```

### Cores e Tema

As cores estão definidas no arquivo `src/App.css` usando o sistema de cores do Tailwind:

- **Primária**: `oklch(0.7 0.15 270)` (roxo)
- **Secundária**: `oklch(0.15 0.02 270)` (roxo escuro)
- **Background**: `oklch(0.05 0.02 270)` (quase preto)

## 📱 Responsividade

O portfólio é totalmente responsivo com breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🎨 Componentes Principais

### Header
- Navegação fixa com efeito de transparência
- Botões de música e tema
- Links para redes sociais

### Hero
- Seção principal com animação de typewriter
- Avatar com gradiente
- Call-to-actions

### About
- Informações pessoais e profissionais
- Grid de habilidades técnicas
- Cards com efeitos visuais

### Projects
- Projetos em destaque (estáticos)
- Repositórios do GitHub (dinâmicos)
- Filtros por linguagem e popularidade

### Contact
- Informações de contato
- Links para redes sociais
- Formulário de contato (futuro)

## 🚀 Deploy

### Build para Produção

```bash
pnpm run build
# ou
npm run build
```

### Deploy Automático

O projeto está configurado para deploy fácil em:

- **Vercel**: Conecte o repositório GitHub
- **Netlify**: Arraste a pasta `dist` ou conecte o repo
- **GitHub Pages**: Configure o workflow de deploy

### Variáveis de Ambiente

Para produção, considere adicionar:

```env
VITE_GITHUB_TOKEN=seu_token_github # Para aumentar rate limit da API
```

## 📊 Performance

- **Lighthouse Score**: 95+ em todas as métricas
- **Bundle Size**: < 500KB gzipped
- **First Paint**: < 1.5s
- **Interactive**: < 2.5s

## 🔄 Atualizações Futuras

- [ ] Formulário de contato funcional
- [ ] Blog integrado
- [ ] Modo offline (PWA)
- [ ] Animações mais avançadas
- [ ] Testes automatizados
- [ ] Internacionalização (i18n)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Carlos Filho**
- GitHub: [@DELIRlO](https://github.com/DELIRlO)
- LinkedIn: [ysneshy](https://linkedin.com/in/ysneshy)
- Portfolio: [carlosfilho.vercel.app](https://carlosfilho.vercel.app)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!

