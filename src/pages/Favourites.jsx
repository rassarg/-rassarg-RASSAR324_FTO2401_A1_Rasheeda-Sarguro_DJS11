import React, { useEffect, useState } from "react";
import { useFavourites } from "../context/FavouritesContext";
import Loading from "../components/Loading";
import Error from "../components/Error";
import "./Favourites.css";

const Favourites = () => {
  const { favouriteEpisodes, removeFavourite } = useFavourites();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate fetching data
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000); // Simulate a delay of 1 second
      } catch (err) {
        setError("Failed to load favourites.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to group episodes by show and season
  const groupEpisodes = (episodes) => {
    const grouped = {};

    episodes.forEach((episode) => {
      const { showName, season } = episode;
      if (!grouped[showName]) {
        grouped[showName] = {};
      }
      if (!grouped[showName][season]) {
        grouped[showName][season] = [];
      }
      grouped[showName][season].push(episode);
    });

    return grouped;
  };

  // Group the favourite episodes
  const groupedEpisodes = groupEpisodes(favouriteEpisodes);

  let globalIndex = 0;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="favourites-container">
      <h1 className="favourites-title">Favourites</h1>
      {favouriteEpisodes.length > 0 ? (
        <ol className="favourites-list">
          {Object.keys(groupedEpisodes).map((showName) =>
            Object.keys(groupedEpisodes[showName]).map((season) => (
              <React.Fragment key={`${showName}-${season}`}>
                <li className="group-header">
                  <h2 className="season-title">
                    {showName} - Season {season}
                  </h2>
                </li>
                {groupedEpisodes[showName][season].map((episode) => {
                  globalIndex += 1;
                  return (
                    <li key={episode.id} className="favourite-item">
                      <span className="favourite-index">{globalIndex}.</span>
                      <img
                        src={episode.image}
                        alt={episode.title}
                        width="50"
                        className="favourite-image"
                      />
                      <div className="favourite-details">
                        <span className="favourite-title">{episode.title}</span>
                      </div>
                      <button
                        className="remove-button"
                        onClick={() => removeFavourite(episode.id)}
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </React.Fragment>
            ))
          )}
        </ol>
      ) : (
        <p className="no-favourites">Nothing added yet!</p>
      )}
    </div>
  );
};

export default Favourites;
