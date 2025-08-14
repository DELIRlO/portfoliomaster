import { useState, useEffect, useRef } from "react";

const useBackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio("/src/assets/background-music.mp3");
    audioRef.current = audio;
    audio.loop = true; // Música em loop
    audio.volume = 0.2;
    audio.preload = "auto";

    const handleCanPlayThrough = () => {
      setIsLoaded(true);
      setError(null);

      // Toca automaticamente SE o usuário já interagiu
      if (userInteracted && !isPlaying) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((e) => setError("Autoplay bloqueado: " + e.message));
      }
    };

    const handleError = () => setError("Falha ao carregar a música");
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("canplaythrough", handleCanPlayThrough);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);

    // Detecta a primeira interação do usuário (ex: clique)
    const handleFirstInteraction = () => {
      setUserInteracted(true);
      document.removeEventListener("click", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);

    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
      document.removeEventListener("click", handleFirstInteraction);
    };
  }, [userInteracted]);

  const toggleMusic = async () => {
    if (!audioRef.current || !isLoaded) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        if (audioRef.current.ended) {
          audioRef.current.currentTime = 0; // Reinicia se a música terminou
        }
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying); // Atualiza o estado
    } catch (error) {
      setError("Erro ao controlar música: " + error.message);
    }
  };

  const setVolume = (volume) => {
    if (audioRef.current) audioRef.current.volume = volume;
  };

  return { isPlaying, isLoaded, error, toggleMusic, setVolume };
};

export default useBackgroundMusic;
