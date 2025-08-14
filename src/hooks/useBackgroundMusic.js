import { useState, useEffect, useRef } from "react";

const useBackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio("/background-music.mp3");
    audioRef.current = audio;
    audio.loop = true;
    audio.volume = 0.2;
    audio.preload = "auto";

    const handleCanPlayThrough = () => setIsLoaded(true);
    const handleError = () => setError("Falha ao carregar a música");
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener("canplaythrough", handleCanPlayThrough);
    audio.addEventListener("error", handleError);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    // Interação do usuário
    const handleFirstInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        // Tenta tocar após interação
        if (!isPlaying) {
          audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch((e) => setError("Erro ao reproduzir: " + e.message));
        }
      }
    };

    const events = ["click", "touchstart", "keydown"];
    events.forEach((event) =>
      document.addEventListener(event, handleFirstInteraction, { once: true })
    );

    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      events.forEach((event) =>
        document.removeEventListener(event, handleFirstInteraction)
      );
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current || !isLoaded) return;

    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        // Reinicia se a música terminou
        if (
          audioRef.current.ended ||
          audioRef.current.currentTime === audioRef.current.duration
        ) {
          audioRef.current.currentTime = 0;
        }
        await audioRef.current.play();
      }
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
