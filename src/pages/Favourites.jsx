import React from "react";

const Favourites = () => {
  const favouriteEpisodes =
    JSON.parse(localStorage.getItem("favouriteEpisodes")) || [];

  const removeFavourite = (episodeId) => {
    const updatedFavourites = favouriteEpisodes.filter(
      (episode) => episode.id !== episodeId
    );
    localStorage.setItem(
      "favouriteEpisodes",
      JSON.stringify(updatedFavourites)
    );
    localStorage.setItem(`favourite-${episodeId}`, false);
    window.location.reload(); // Reload to reflect changes
  };

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
