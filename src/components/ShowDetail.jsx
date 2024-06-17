import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlayer } from "../usePlayer";

const ShowDetail = () => {
  const { showId } = useParams();
  const { playEpisode, setEpisodes } = usePlayer();
  const [show, setShow] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${showId}`)
      .then((response) => response.json())
      .then((data) => {
        setShow(data);
        setEpisodes(data.seasons);
      })
      .catch((error) => console.error("Error fetching show details:", error));
  }, [showId, setEpisodes]);

  const handlePlayClick = (episode) => {
    playEpisode(episode);
    setSelectedEpisode(episode.episode);
  };

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{show.title}</h1>
      <p>{show.description}</p>
      <h2>Seasons</h2>
      <ul>
        {show.seasons.map((season) => (
          <li key={season.season}>
            <h3>{season.title}</h3>
            <img
              src={season.image}
              alt={season.title}
              style={{ width: "200px" }}
            />
            <ul>
              {season.episodes.map((episode) => (
                <li key={episode.episode}>
                  <h4>{episode.title}</h4>
                  <p>{episode.description}</p>
                  <button
                    onClick={() => handlePlayClick(episode)}
                    disabled={selectedEpisode === episode.episode}
                  >
                    {selectedEpisode === episode.episode ? "Playing" : "Play"}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowDetail;
