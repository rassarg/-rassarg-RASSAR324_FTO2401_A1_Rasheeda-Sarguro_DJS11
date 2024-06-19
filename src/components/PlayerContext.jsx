import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

const PlayerContext = createContext();

export const usePlayer = () => {
  return useContext(PlayerContext);
};

export const PlayerProvider = ({ children }) => {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [currentShow, setCurrentShow] = useState(null);
  const [currentSeason, setCurrentSeason] = useState(null);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && currentEpisode) {
      audioRef.current.src = currentEpisode.file;
      audioRef.current.play();
    }
  }, [currentEpisode]);

  const playEpisode = (episode, show, season) => {
    setLoading(true);
    setCurrentEpisode(null);
    setCurrentShow(show);
    setCurrentSeason(season);

    setTimeout(() => {
      setCurrentEpisode(episode);
      setLoading(false);
    }, 1000); // Simulate loading delay
  };

  const value = {
    currentEpisode,
    currentShow,
    currentSeason,
    playEpisode,
    audioRef,
    loading,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
