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
  const [clickedButton, setClickedButton] = useState(null);

  // Fetch show data when component mounts or 'id' parameter changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchShowById(id);
        setShow(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching show details:", error);
      }
    };

    fetchData();
  }, [id]);

  // Handle season change
  const handleSeasonChange = (season) => {
    setSelectedSeason(season);
    setClickedButton(null);
  };
  // Handle episode button click
  const handleButtonClick = (episode, show, season, index) => {
    playEpisode(episode, show, season);
    setClickedButton(index);
  };

  if (loading) {
    return <Loading />;
  }
  if (!show) {
    return <div>There was an error</div>;
  }

  return (
    <div className="show-details">
      {selectedSeason ? (
        <div>
          <button
            className="back-button"
            onClick={() => setSelectedSeason(null)}
          >
            &#8592; Back to Show
          </button>
          <h1 className="show-title">{show.title}</h1>
          <div className="image-container">
            <img src={show.image} alt={show.title} className="show-image" />
          </div>
          <div className="show-info"></div>
          <div className="episode-list">
            <h2 className="episodes-heading">
              Episodes in Season {selectedSeason.season}:
            </h2>
            {selectedSeason.episodes.map((episode, index) => (
              <div
                key={`${selectedSeason.season}-${index}`}
                className="episode"
              >
                <h3>
                  {episode.episode}. {episode.title}
                </h3>
                <button
                  className={`episode-play-button ${
                    clickedButton === index ? "clicked" : ""
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
      ) : (
        <div>
          <h1 className="show-title">{show.title}</h1>
          <div className="image-container">
            <img src={show.image} alt={show.title} className="show-image" />
          </div>
          <div className="show-info">
            <p className="show-description">{show.description}</p>
          </div>
          <div className="season-selector">
            <h2 className="seasons-heading">Seasons:</h2>
            {show.seasons.map((season, index) => (
              <button
                key={`${show.id}-${season.season}`}
                onClick={() => handleSeasonChange(season)}
                className="season-button"
              >
                Season {season.season} ({season.episodes.length} episodes)
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ShowDetail;
