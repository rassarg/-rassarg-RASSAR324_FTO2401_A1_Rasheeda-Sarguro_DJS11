import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { usePlayer } from "../utils/usePlayer";
import "./ShowDetail.css";

const ShowDetail = () => {
  const { showId } = useParams();
  // const { playEpisode, setEpisodes, updateShows } = usePlayer();
  const [show, setShow] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${showId}`)
      .then((response) => response.json())
      .then((data) => {
        setShow(data);
        setEpisodes(data.seasons);
        updateShows(data);
        if (data.seasons.length > 0) {
          setSelectedSeason(data.seasons[0]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching show details:", error);
        setError(
          "An error occurred while fetching the show details. Please try again later."
        );
        setLoading(false);
      });
  }, [showId, setEpisodes, updateShows]);

  const handlePlayClick = (episode) => {
    playEpisode(episode);
    setSelectedEpisode(episode.episode);
  };

  const handleSeasonChange = (event) => {
    const seasonIndex = event.target.value;
    setSelectedSeason(show.seasons[seasonIndex]);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!show) {
    return <div className="loading">No show found.</div>;
  }

  return (
    <div className="show-container">
      <h1 className="show-title">{show.title}</h1>
      <p className="show-description">{show.description}</p>
      <h2 className="seasons-title"></h2>
      <select
        className="season-dropdown"
        onChange={handleSeasonChange}
        value={selectedSeason ? show.seasons.indexOf(selectedSeason) : ""}
      >
        <option value="" disabled>
          Select a season
        </option>
        {show.seasons.map((season, index) => (
          <option key={season.season} value={index}>
            {season.title}
          </option>
        ))}
      </select>

      {selectedSeason && (
        <div className="season-detail">
          <h3 className="season-title">{selectedSeason.title}</h3>
          <img
            className="season-image"
            src={selectedSeason.image}
            alt={selectedSeason.title}
          />
          <ol className="episodes-list">
            {selectedSeason.episodes.map((episode) => (
              <li key={episode.episode} className="episode-item">
                <h4 className="episode-title">
                  Episode: {episode.episode} - {episode.title}
                </h4>
                <p className="episode-description">{episode.description}</p>
                <button
                  className="play-button"
                  onClick={() => handlePlayClick(episode)}
                  disabled={selectedEpisode === episode.episode}
                >
                  {selectedEpisode === episode.episode
                    ? "Currently Selected"
                    : "Select this episode"}
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default ShowDetail;
