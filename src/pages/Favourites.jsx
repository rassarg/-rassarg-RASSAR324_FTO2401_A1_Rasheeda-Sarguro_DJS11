// pages/Favourites.jsx
import React from "react";
import { useFavourites } from "../components/FavouritesList";
import { NavLink } from "react-router-dom";

const Favourites = () => {
  const { favourites, removeFavourite } = useFavourites();

  return (
    <div>
      <h1>Favourites</h1>
      {favourites.length === 0 ? (
        <p>Nothing added yet!</p>
      ) : (
        <ul>
          {favourites.map(({ episode, show, season }) => (
            <li key={episode.id}>
              <NavLink to={`/show/${show.id}`}>
                {show.title} - Season {season.season}, Episode {episode.episode}
                : {episode.title}
              </NavLink>
              <button onClick={() => removeFavourite(episode.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favourites;
