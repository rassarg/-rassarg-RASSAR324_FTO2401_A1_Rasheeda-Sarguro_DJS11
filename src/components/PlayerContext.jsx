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
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && currentEpisode) {
      audioRef.current.src = currentEpisode.file;
      audioRef.current.play();
    }
  }, [currentEpisode]);

  const playEpisode = (episode, show, season) => {
    setCurrentEpisode(episode);
    setCurrentShow(show);
    setCurrentSeason(season);
  };

  const value = {
    currentEpisode,
    currentShow,
    currentSeason,
    playEpisode,
    audioRef,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
