import { useState, useEffect, useRef } from 'react';

const useBackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/src/assets/background-music.wav');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2; // Low volume for background music
    audioRef.current.preload = 'auto';

    // Audio event listeners
    const audio = audioRef.current;

    const handleCanPlayThrough = () => {
      setIsLoaded(true);
      setError(null);
    };

    const handleError = (e) => {
      setError('Failed to load background music');
      setIsLoaded(false);
      console.error('Audio error:', e);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);

    // Cleanup
    return () => {
      if (audio) {
        audio.removeEventListener('canplaythrough', handleCanPlayThrough);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('ended', handleEnded);
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current || !isLoaded) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Handle autoplay restrictions
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Error toggling music:', error);
      setError('Failed to play music. User interaction may be required.');
    }
  };

  const setVolume = (volume) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  };

  return {
    isPlaying,
    isLoaded,
    error,
    toggleMusic,
    setVolume
  };
};

export default useBackgroundMusic;

