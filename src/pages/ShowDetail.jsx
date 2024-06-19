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
      <div className="season-selector">
        {show.seasons.map((season) => (
          <button
            key={season.id}
            onClick={() => handleSeasonChange(season)}
            className={season === selectedSeason ? "active" : ""}
          >
            Season {season.number}
          </button>
        ))}
      </div>
      <div className="season-preview">
        {selectedSeason && (
          <img
            src={selectedSeason.image}
            alt={`Season ${selectedSeason.number}`}
          />
        )}
      </div>
      <div className="episode-list">
        {selectedSeason.episodes.map((episode) => (
          <div key={episode.id} className="episode">
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
