// HomeComponent.jsx
import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((response) => response.json())
      .then((data) => setShows(data))
      .catch((error) => console.error("Error fetching shows:", error));
  }, []);

  return (
    <div className="home-container">
      <h1>Podcasts</h1>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>
            <a href={`/show/${show.id}`}>{show.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
