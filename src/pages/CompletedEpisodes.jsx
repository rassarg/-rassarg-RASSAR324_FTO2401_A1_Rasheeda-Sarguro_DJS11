import React, { useEffect, useState } from "react";
import { useCompletedEpisodes } from "../context/CompletedEpisodesContext";
import Loading from "../components/Loading";
import Error from "../components/Error";
import "./CompletedEpisodes.css";

const CompletedEpisodes = () => {
  const { completedEpisodes, clearCompletedEpisodes } = useCompletedEpisodes();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (err) {
      setError("Failed to load completed episodes.");
      setLoading(false);
    }
  }, []);

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

  const groupedEpisodes = groupEpisodes(completedEpisodes);

  let globalIndex = 0;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div>
      <h1 className="completed-episodes-title">Completed Episodes</h1>
      <button
        className={`clear-button ${
          completedEpisodes.length === 0 ? "disabled" : ""
        }`}
        onClick={completedEpisodes.length === 0 ? null : clearCompletedEpisodes}
        disabled={completedEpisodes.length === 0}
      >
        Clear All
      </button>
      {completedEpisodes.length > 0 ? (
        <ol className="completed-episodes-list">
          {Object.keys(groupedEpisodes).map((showName) =>
            Object.keys(groupedEpisodes[showName]).map((season) => (
              <React.Fragment key={`${showName}-${season}`}>
                <li>
                  <h2 className="season-title">
                    {showName} - Season {season}
                  </h2>
                </li>
                {groupedEpisodes[showName][season].map((episode) => {
                  globalIndex += 1;
                  return (
                    <li
                      key={`${episode.id}-${globalIndex}`}
                      className="completed-episode-item"
                    >
                      <span className="completed-episode-index">
                        {globalIndex}.
                      </span>
                      <img
                        src={episode.image}
                        alt={episode.title}
                        width="50"
                        className="completed-episode-image"
                      />
                      <div className="completed-episode-details">
                        <span className="completed-episode-title">
                          {episode.title}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </React.Fragment>
            ))
          )}
        </ol>
      ) : (
        <p className="no-completed-episodes">Start listening!</p>
      )}
    </div>
  );
};

export default CompletedEpisodes;
