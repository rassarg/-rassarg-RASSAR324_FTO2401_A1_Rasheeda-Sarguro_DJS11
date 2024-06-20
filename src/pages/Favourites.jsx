// Favourites.jsx
import React from "react";
import { useFavourites } from "../context/FavouritesContext";
import "./Favourites.css";

const Favourites = () => {
  const { favouriteEpisodes, removeFavourite } = useFavourites();

  return (
    <div className="favourites-container">
      <h1 className="favourites-title">Favourites</h1>
      {favouriteEpisodes.length > 0 ? (
        <ol className="favourites-list">
          {favouriteEpisodes.map((episode, index) => (
            <li key={episode.id} className="favourite-item">
              <span className="favourite-index">{index + 1}.</span>
              <img
                src={episode.image}
                alt={episode.title}
                width="50"
                className="favourite-image"
              />
              <div className="favourite-details">
                <span className="favourite-show">{episode.showName}</span>
                <span className="favourite-title">{episode.title}</span>
                <span className="favourite-season">
                  Season: {episode.season}
                </span>
              </div>
              <button
                className="remove-button"
                onClick={() => removeFavourite(episode.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      ) : (
        <p className="no-favourites">Nothing added yet!</p>
      )}
    </div>
  );
};

export default Favourites;
