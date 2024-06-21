import React, { useEffect, useState } from "react";

const CompletedEpisodes = () => {
  const [completedEpisodes, setCompletedEpisodes] = useState([]);

  useEffect(() => {
    const storedEpisodes =
      JSON.parse(localStorage.getItem("completedEpisodes")) || [];
    setCompletedEpisodes(storedEpisodes);
  }, []);

  return (
    <div className="completed-episodes-page">
      <h2>Completed Episodes: </h2>
      <ul>
        {completedEpisodes.map((episode, index) => (
          <li key={index}>
            {episode.title} (Episode {episode.episode})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedEpisodes;
