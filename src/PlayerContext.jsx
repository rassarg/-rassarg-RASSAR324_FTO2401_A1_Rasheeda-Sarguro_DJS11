import React, { createContext, useState, useEffect } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentEpisode, setCurrentEpisode] = useState(() => {
    const savedEpisode = localStorage.getItem("currentEpisode");
    return savedEpisode ? JSON.parse(savedEpisode) : null;
  });

  const playEpisode = (episode) => {
    setCurrentEpisode(episode);
    localStorage.setItem("currentEpisode", JSON.stringify(episode));
  };

  useEffect(() => {
    const savedEpisode = localStorage.getItem("currentEpisode");
    if (savedEpisode) {
      setCurrentEpisode(JSON.parse(savedEpisode));
    }
  }, []);

  const value = {
    currentEpisode,
    playEpisode,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
