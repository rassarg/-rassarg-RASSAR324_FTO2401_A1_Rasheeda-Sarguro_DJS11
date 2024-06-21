import React, { createContext, useContext, useState, useEffect } from "react";

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favouriteEpisodes, setFavouriteEpisodes] = useState([]);

  useEffect(() => {
    const storedFavourites =
      JSON.parse(localStorage.getItem("favouriteEpisodes")) || [];
    setFavouriteEpisodes(storedFavourites);
  }, []);

  const addFavourite = (episode) => {
    const updatedFavourites = [...favouriteEpisodes, episode];
    setFavouriteEpisodes(updatedFavourites);
    localStorage.setItem(
      "favouriteEpisodes",
      JSON.stringify(updatedFavourites)
    );
  };

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
