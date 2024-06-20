import React from "react";
import { useFavourites } from "../context/FavouritesContext";

const Favourites = () => {
  const { favouriteEpisodes, removeFavourite } = useFavourites();

  return (
    <div>
      <h1>Favourites</h1>
      {favouriteEpisodes.length > 0 ? (
        <ul>
          {favouriteEpisodes.map((episode) => (
            <li key={episode.id}>
              <img src={episode.image} alt={episode.title} width="50" />
              {episode.title} - Season: {episode.season}
              <button onClick={() => removeFavourite(episode.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nothing added yet!</p>
      )}
    </div>
  );
};

export default Favourites;
