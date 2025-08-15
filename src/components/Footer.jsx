import { Github, Linkedin, Instagram, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useInView } from "react-intersection-observer";
import PageTransition from "./PageTransition";

const Footer = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <PageTransition isVisible={inView}>
      <footer className="py-8 border-t border-border bg-card/30" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-muted-foreground text-center md:text-left">
                © 2025 Carlos Filho. Feito com{" "}
                <Heart className="inline h-4 w-4 text-red-500 mx-1" /> usando
                React - tailwind
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com/DELIRlO"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://www.linkedin.com/in/ysneshy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://www.instagram.com/ysneshy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </PageTransition>
  );
};

export default Footer;
