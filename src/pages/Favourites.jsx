import React from "react";

const Favourites = () => {
  const favouriteEpisodes =
    JSON.parse(localStorage.getItem("favouriteEpisodes")) || [];

  return (
    <div>
      <h1>Favourites</h1>
      {favouriteEpisodes.length > 0 ? (
        <ul>
          {favouriteEpisodes.map((episode) => (
            <li key={episode.id}>
              <img src={episode.image} alt={episode.title} width="50" />
              {episode.title} - Season: {episode.season}
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
