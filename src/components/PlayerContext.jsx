import React, { createContext, useState } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentEpisode, setCurrentEpisode] = useState(() => {
    const savedEpisode = localStorage.getItem("currentEpisode");
    return savedEpisode ? JSON.parse(savedEpisode) : null;
  });

  const [episodes, setEpisodes] = useState([]);
  const [currentShowTitle, setCurrentShowTitle] = useState("");
  const [show, setShow] = useState(null); // Add show state

  const playEpisode = (episode) => {
    setCurrentEpisode(episode);
    setCurrentShowTitle(episode.showTitle);
    localStorage.setItem("currentEpisode", JSON.stringify(episode));
  };

  const updateShows = (data) => {
    setShow(data); // Update the show state
  };

  const value = {
    currentEpisode,
    playEpisode,
    episodes,
    setEpisodes,
    currentShowTitle,
    setCurrentShowTitle,
    show, // Include show in the context value
    updateShows, // Add updateShows function
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
