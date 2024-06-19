import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchShowById } from "../utils/api";
import Loading from "../components/Loading";
import { usePlayer } from "../components/PlayerContext";
import "./ShowDetail.css";

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [loading, setLoading] = useState(true);
  const { playEpisode } = usePlayer();

  const [clickedButtonIndex, setClickedButtonIndex] = useState(null);
  const [clickedSeasonIndex, setClickedSeasonIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchShowById(id);
        setShow(data);
        setSelectedSeason(data.seasons[0]); // Select the first season by default
        setLoading(false);
      } catch (error) {
        console.error("Error fetching show details:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSeasonChange = (season) => {
    setSelectedSeason(season);
    setClickedButtonIndex(null);
  };

  const handleButtonClick = (episode, show, season, index) => {
    playEpisode(episode, show, season);
    setClickedButtonIndex(index);
  };
  const handleSeasonButtonClick = (season, index) => {
    setSelectedSeason(season);
    setClickedSeasonIndex(index);
  };
  if (loading) {
    return <Loading />;
  }
  if (!show) {
    return <div>There was an error</div>;
  }

  return (
    <div className="show-details">
      <h1 className="show-title">{show.title}</h1>
      <div className="show-info">
        <div className="image-container">
          {selectedSeason && (
            <img
              src={selectedSeason.image}
              alt={`Season ${selectedSeason.season}`}
              className="season-image"
            />
          )}
        </div>
        <p className="show-description">{show.description}</p>
      </div>
      <div className="season-selector">
        {show.seasons.map((season, index) => (
          <button
            key={`${show.id}-${season.season}`}
            onClick={() => handleSeasonChange(season)}
            className={season === selectedSeason ? "active" : "inactive"}
            disabled={season === selectedSeason}
          >
            Season {season.season}{" "}
            {season === selectedSeason && "(currently selected)"}
          </button>
        ))}
      </div>
      <div className="episode-list">
        <h2 className="episodes-heading">Episodes:</h2>
        {selectedSeason.episodes.map((episode, index) => (
          <div key={`${selectedSeason.season}-${index}`} className="episode">
            <h3>{episode.title}</h3>
            <button
              className={`episode-play-button ${
                clickedButtonIndex === index ? "clicked" : ""
              }`}
              onClick={() =>
                handleButtonClick(episode, show, selectedSeason, index)
              }
            >
              Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowDetail;
