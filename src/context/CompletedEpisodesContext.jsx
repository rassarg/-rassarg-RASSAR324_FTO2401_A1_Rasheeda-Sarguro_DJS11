import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context for managing completed episodes
const CompletedEpisodesContext = createContext();

export const CompletedEpisodesProvider = ({ children }) => {
  const [completedEpisodes, setCompletedEpisodes] = useState([]);

  // useEffect to load completed episodes from localStorage when the component mounts
  useEffect(() => {
    const storedCompletedEpisodes =
      JSON.parse(localStorage.getItem("completedEpisodes")) || [];
    setCompletedEpisodes(storedCompletedEpisodes);
  }, []);

  // Function to save an episode as completed
  const saveCompletedEpisode = (episode) => {
    const updatedCompletedEpisodes = [...completedEpisodes, episode];
    setCompletedEpisodes(updatedCompletedEpisodes);
    localStorage.setItem(
      "completedEpisodes",
      JSON.stringify(updatedCompletedEpisodes)
    );
  };

  // Function to check if an episode is in the completed episodes list
  const isEpisodeCompleted = (episodeId) => {
    return completedEpisodes.some((episode) => episode.id === episodeId);
  };

  // Function to clear all completed episodes
  const clearCompletedEpisodes = () => {
    setCompletedEpisodes([]);
    localStorage.removeItem("completedEpisodes");
  };

  return (
    <CompletedEpisodesContext.Provider
      value={{
        completedEpisodes,
        saveCompletedEpisode,
        isEpisodeCompleted,
        clearCompletedEpisodes,
      }}
    >
      {children}
    </CompletedEpisodesContext.Provider>
  );
};

// Custom hook
export const useCompletedEpisodes = () => useContext(CompletedEpisodesContext);
