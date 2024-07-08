import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context for managing favourites
const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favouriteEpisodes, setFavouriteEpisodes] = useState([]);

  // useEffect to load favourite episodes from localStorage when the component mounts
  useEffect(() => {
    const storedFavourites =
      JSON.parse(localStorage.getItem("favouriteEpisodes")) || [];
    setFavouriteEpisodes(storedFavourites);
  }, []);

  // Function to add an episode to the favourites list
  const addFavourite = (episode) => {
    const updatedFavourites = [...favouriteEpisodes, episode];
    setFavouriteEpisodes(updatedFavourites);
    localStorage.setItem(
      "favouriteEpisodes",
      JSON.stringify(updatedFavourites)
    );
  };

  // Function to remove an episode from the favourites list (by its Id)
  const removeFavourite = (episodeId) => {
    const updatedFavourites = favouriteEpisodes.filter(
      (episode) => episode.id !== episodeId
    );
    setFavouriteEpisodes(updatedFavourites);
    localStorage.setItem(
      "favouriteEpisodes",
      JSON.stringify(updatedFavourites)
    );
  };

  // Function to check if an episode is in the favourites list
  const isFavourite = (episodeId) => {
    return favouriteEpisodes.some((episode) => episode.id === episodeId);
  };

  return (
    <FavouritesContext.Provider
      value={{ favouriteEpisodes, addFavourite, removeFavourite, isFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
