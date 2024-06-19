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
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && currentEpisode) {
      audioRef.current.src = currentEpisode.file;
      audioRef.current.play();
    }
  }, [currentEpisode]);

  const playEpisode = (episode, show) => {
    setCurrentEpisode(episode);
    setCurrentShow(show);
  };

  const value = {
    currentEpisode,
    currentShow,
    playEpisode,
    audioRef,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
