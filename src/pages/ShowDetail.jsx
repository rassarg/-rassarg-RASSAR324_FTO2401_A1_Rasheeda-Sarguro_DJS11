import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchShowById } from "../utils/api";
import Loading from "../components/Loading";
import "./ShowDetail.css";

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const buttons = document.querySelectorAll(".season-selector button");
    buttons.forEach((button) => {
      if (button.textContent === `Season ${season.season}`) {
        button.classList.add("clicked");
      } else {
        button.classList.remove("clicked");
      }
    });
  };

  if (loading) {
    return <Loading />;
  }
  if (!show) {
    return <div>There was an error</div>;
  }

  return (
    <div className="show-details">
      <h1>{show.title}</h1>

      <div className="season-preview">
        {selectedSeason && (
          <img
            src={selectedSeason.image}
            alt={`Season ${selectedSeason.season}`}
          />
        )}
      </div>
      <div className="season-selector">
        {show.seasons.map((season) => (
          <button
            key={`${show.id}-${season.season}`} // Combine show ID and season number for unique keys
            onClick={() => handleSeasonChange(season)}
            className={season === selectedSeason ? "active" : "inactive"}
          >
            Season {season.season}
          </button>
        ))}
      </div>
      <div className="episode-list">
        <h2 className="episodes-heading">Episodes:</h2>
        {selectedSeason.episodes.map((episode, index) => (
          <div key={`${selectedSeason.season}-${index}`} className="episode">
            <h3>{episode.title}</h3>
            <audio controls>
              <source src={episode.file} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowDetails;
