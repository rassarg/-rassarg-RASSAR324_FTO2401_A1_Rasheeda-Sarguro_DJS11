import React, { createContext, useState } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentEpisode, setCurrentEpisode] = useState(() => {
    const savedEpisode = localStorage.getItem("currentEpisode");
    return savedEpisode ? JSON.parse(savedEpisode) : null;
  });

  const [episodes, setEpisodes] = useState([]);

  const playEpisode = (episode) => {
    setCurrentEpisode(episode);
    localStorage.setItem("currentEpisode", JSON.stringify(episode));
  };

  const value = {
    currentEpisode,
    playEpisode,
    episodes,
    setEpisodes,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

/* Defines the context for player state using createContext from React
It provides a PlayerProvider component that wraps the application and
manages the player state using the useState hook.
This file is responsible for providing the player state to the rest of the application
through the context. */
