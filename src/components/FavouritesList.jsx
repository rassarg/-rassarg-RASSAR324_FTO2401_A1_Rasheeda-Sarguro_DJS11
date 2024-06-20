import React, { createContext, useContext, useState } from "react";

const FavouritesContext = createContext();

export const useFavourites = () => useContext(FavouritesContext);

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const addFavourite = (episode, show, season) => {
    setFavourites((prevFavourites) => [
      ...prevFavourites,
      { episode, show, season },
    ]);
  };

  const removeFavourite = (episodeId) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((fav) => fav.episode.id !== episodeId)
    );
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
