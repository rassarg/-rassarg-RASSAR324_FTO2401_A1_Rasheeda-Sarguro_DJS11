import React, { createContext, useContext, useState, useEffect } from "react";

const CompletedEpisodesContext = createContext();

export const CompletedEpisodesProvider = ({ children }) => {
  const [completedEpisodes, setCompletedEpisodes] = useState([]);

  useEffect(() => {
    const storedCompletedEpisodes =
      JSON.parse(localStorage.getItem("completedEpisodes")) || [];
    setCompletedEpisodes(storedCompletedEpisodes);
  }, []);

  const saveCompletedEpisode = (episode) => {
    const updatedCompletedEpisodes = [...completedEpisodes, episode];
    setCompletedEpisodes(updatedCompletedEpisodes);
    localStorage.setItem(
      "completedEpisodes",
      JSON.stringify(updatedCompletedEpisodes)
    );
  };

  const isEpisodeCompleted = (episodeId) => {
    return completedEpisodes.some((episode) => episode.id === episodeId);
  };

  return (
    <CompletedEpisodesContext.Provider
      value={{ completedEpisodes, saveCompletedEpisode, isEpisodeCompleted }}
    >
      {children}
    </CompletedEpisodesContext.Provider>
  );
};

export const useCompletedEpisodes = () => useContext(CompletedEpisodesContext);
