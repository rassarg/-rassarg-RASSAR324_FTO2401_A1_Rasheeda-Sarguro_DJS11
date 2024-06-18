import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlayer } from "../usePlayer";
import "./ShowDetail.css";

const ShowDetail = () => {
  const { showId } = useParams();
  const { playEpisode, setEpisodes } = usePlayer();
  const [show, setShow] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${showId}`)
      .then((response) => response.json())
      .then((data) => {
        setShow(data);
        setEpisodes(data.seasons);
        if (data.seasons.length > 0) {
          setSelectedSeason(data.seasons[0]);
        }
      })
      .catch((error) => console.error("Error fetching show details:", error));
  }, [showId, setEpisodes]);

  const handlePlayClick = (episode) => {
    playEpisode(episode);
    setSelectedEpisode(episode.episode);
  };

  const handleSeasonChange = (event) => {
    const seasonIndex = event.target.value;
    setSelectedSeason(show.seasons[seasonIndex]);
  };

  if (!show) {
    return <div className="loading">Loading...</div>;
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

/* Component responsible for displaying the details of a podcast show,
including its seasons and episodes.
It uses the usePlayer hook to access the player state
and functions to play episodes.
This component focuses on the presentation of show details and
interacts with the player through the usePlayer hook */
