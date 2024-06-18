import React from "react";

const Home = ({ shows }) => {
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
