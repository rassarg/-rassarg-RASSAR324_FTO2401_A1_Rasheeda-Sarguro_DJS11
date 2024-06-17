import React, { createContext, useState, useEffect } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentEpisode, setCurrentEpisode] = useState(() => {
    const savedEpisode = localStorage.getItem("currentEpisode");
    return savedEpisode ? JSON.parse(savedEpisode) : null;
  });

  const [episodes, setEpisodes] = useState([]); // Add episodes state

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
    episodes, // Include episodes in the context value
    setEpisodes, // Include setEpisodes in the context value
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
