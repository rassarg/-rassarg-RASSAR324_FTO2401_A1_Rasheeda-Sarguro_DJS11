import React, { createContext, useState } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentEpisode, setCurrentEpisode] = useState(() => {
    const savedEpisode = localStorage.getItem("currentEpisode");
    return savedEpisode ? JSON.parse(savedEpisode) : null;
  });

  const [episodes, setEpisodes] = useState([]);
  const [currentShowTitle, setCurrentShowTitle] = useState("");

  const playEpisode = (episode) => {
    setCurrentEpisode(episode);
    setCurrentShowTitle;
    localStorage.setItem("currentEpisode", JSON.stringify(episode));
  };

  const value = {
    currentEpisode,
    playEpisode,
    episodes,
    setEpisodes,
    currentShowTitle,
    setCurrentShowTitle,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
