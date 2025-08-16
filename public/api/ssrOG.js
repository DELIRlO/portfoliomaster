// api/ssrOG.js - Serverless function para injetar meta tags
import { readFileSync } from "fs";
import { join } from "path";

export default async function handler(req, res) {
  try {
    // Lê o HTML estático
    const htmlPath = join(process.cwd(), "dist", "index.html");
    let htmlContent = readFileSync(htmlPath, "utf8");

    // Define os meta dados baseado na rota
    const ogData = getOGDataForRoute(req.url);

    // Substitui os placeholders pelas meta tags reais
    htmlContent = htmlContent.replace(/__TITLE__/g, ogData.title);
    htmlContent = htmlContent.replace(/__DESCRIPTION__/g, ogData.description);
    htmlContent = htmlContent.replace(/__OG_TITLE__/g, ogData.ogTitle);
    htmlContent = htmlContent.replace(
      /__OG_DESCRIPTION__/g,
      ogData.ogDescription
    );
    htmlContent = htmlContent.replace(/__OG_IMAGE__/g, ogData.ogImage);
    htmlContent = htmlContent.replace(/__OG_URL__/g, ogData.ogUrl);

    // Retorna o HTML com meta tags injetadas
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "public, max-age=300");
    return res.status(200).send(htmlContent);
  } catch (error) {
    console.error("Erro ao processar SSR:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

function getOGDataForRoute(url) {
  const baseUrl = "https://carlosaugusto.vercel.app";
  const imageUrl = `${baseUrl}/miniatura-social.jpg`;

  // Meta dados padrão para todas as rotas
  const defaultData = {
    title:
      "Carlos Filho - Desenvolvedor Full Stack | React | Node.js | TypeScript",
    description:
      "Engenheiro de Computação formado pelo ITA com experiência em desenvolvimento full stack e soluções inovadoras. Especialista em React, Node.js e TypeScript.",
    ogTitle: "Carlos Filho - Desenvolvedor Full Stack",
    ogDescription:
      "Engenheiro de Computação formado pelo ITA com experiência em desenvolvimento full stack e soluções inovadoras. Especialista em React, Node.js e TypeScript.",
    ogImage: imageUrl,
    ogUrl: `${baseUrl}${url}`,
  };

  // Você pode customizar para rotas específicas
  switch (url) {
    case "/":
      return defaultData;

    case "/projetos":
      return {
        ...defaultData,
        title: "Projetos - Carlos Filho | Desenvolvedor Full Stack",
        ogTitle: "Projetos - Carlos Filho",
        ogDescription:
          "Conheça os projetos desenvolvidos por Carlos Filho usando React, Node.js, TypeScript e outras tecnologias modernas.",
        ogUrl: `${baseUrl}/projetos`,
      };

    case "/sobre":
      return {
        ...defaultData,
        title: "Sobre - Carlos Filho | Desenvolvedor Full Stack",
        ogTitle: "Sobre Carlos Filho",
        ogDescription:
          "Engenheiro de Computação formado pelo ITA, especialista em desenvolvimento full stack com foco em soluções inovadoras.",
        ogUrl: `${baseUrl}/sobre`,
      };

    default:
      return defaultData;
  }
}
