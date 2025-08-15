import React, { useState, useEffect } from "react";

const Typewriter = ({ text, speed = 200, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [startTyping, setStartTyping] = useState(false);

  // Efeito para o delay inicial
  useEffect(() => {
    setStartTyping(false);
    const timer = setTimeout(() => {
      setStartTyping(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, text]); // Reseta se o delay ou o texto mudar

  // Efeito para a animação de digitação
  useEffect(() => {
    if (startTyping) {
      const words = text.split(" ");
      let i = 0;

      // Limpa o texto anterior antes de iniciar
      setDisplayedText("");

      const intervalId = setInterval(() => {
        if (i < words.length) {
          // Constrói a string palavra por palavra de forma mais segura
          setDisplayedText(words.slice(0, i + 1).join(" "));
          i++;
        } else {
          clearInterval(intervalId);
        }
      }, speed);

      return () => clearInterval(intervalId);
    } else {
      // Se não estiver digitando, garante que o texto esteja limpo
      setDisplayedText("");
    }
  }, [startTyping, text, speed]);

  return <span>{displayedText}</span>;
};

export default Typewriter;
