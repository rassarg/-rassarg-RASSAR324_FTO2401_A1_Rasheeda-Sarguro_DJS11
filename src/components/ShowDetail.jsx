import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ShowDetail = () => {
  const { showId } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${showId}`)
      .then((response) => response.json())
      .then((data) => setShow(data))
      .catch((error) => console.error("Error fetching show details:", error));
  }, [showId]);

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
            <img src={season.image} alt={season.title} />
            <ul>
              {season.episodes.map((episode) => (
                <li key={episode.episode}>
                  <h4>{episode.title}</h4>
                  <p>{episode.description}</p>
                  <audio controls>
                    <source src={episode.file} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
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
