import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchShowById } from "../utils/api";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { usePlayer } from "../context/PlayerContext";
import FavouriteButton from "../components/FavouriteButton";
import "./ShowDetail.css";
import { useClickedButton } from "../hooks/useClickedButton";
import { useSelectedSeason } from "../hooks/useSelectedSeason";

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { playEpisode } = usePlayer();
  const { selectedSeason, setSelectedSeason } = useSelectedSeason();
  const { clickedButton, setClickedButton } = useClickedButton();
  const [favouriteEpisodes, setFavouriteEpisodes] = useState([]);

  // Fetch show data when component mounts or 'id' parameter changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchShowById(id);
        setShow(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching show details:", error);
        setError("Error fetching show details. Please try again later.");
        setLoading(false);
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

  // Toggle favourite episode
  const toggleFavorite = (episodeIndex, season) => {
    if (!season) {
      console.error("No season selected.");
      return;
    }
    const episode = selectedSeason.episodes[episodeIndex];
    const episodeId = `${show.id}-${season.season}-${episode.episode}`;
    const index = favouriteEpisodes.findIndex((ep) => ep.id === episodeId);
    const episodeData = {
      id: episodeId,
      showName: show.title,
      title: episode.title,
      season: season.season,
      image: show.image,
      message: "Added to favourites!",
    };
    if (index === -1) {
      setFavouriteEpisodes([...favouriteEpisodes, episodeData]);
    } else {
      const updatedFavourites = [...favouriteEpisodes];
      updatedFavourites.splice(index, 1);
      setFavouriteEpisodes(updatedFavourites);
    }
    // console.log("Toggled favourite:", episodeData);
  };

  if (loading) {
    return <Loading />;
  }
  if (error || !show) {
    return (
      <Error message="There was an error fetching show details. Please try again later." />
    );
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
          <img
            src={selectedSeason.image}
            alt={show.title}
            className="show-image"
          />

          <div className="show-info"></div>
          <h2 className="episodes-heading">
            Episodes in Season {selectedSeason.season}:
          </h2>
          <div className="episode-list">
            {selectedSeason.episodes.map((episode, index) => (
              <div
                key={`${selectedSeason.season}-${index}`}
                className="episode"
              >
                <h3>
                  {episode.episode}. {episode.title}{" "}
                  <FavouriteButton
                    onToggle={() => toggleFavorite(index, selectedSeason)}
                    episodeData={{
                      showName: show.title,
                      id: `${show.id}-${selectedSeason.season}-${index}`,
                      title: episode.title,
                      season: selectedSeason.season,
                      image: show.image,
                    }}
                  />
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
            <img
              src={show.seasons[0].image}
              alt={show.title}
              className="show-image"
            />
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
