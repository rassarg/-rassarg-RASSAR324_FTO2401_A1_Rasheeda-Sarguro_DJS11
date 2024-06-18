import React from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";

const Home = ({ shows }) => {
  return (
    <div className="home-container">
      {/* <h1>Podcasts</h1> */}
      <ul className="home-list">
        {shows.map((show) => (
          <li key={show.id} className="home-list-item">
            <NavLink to={`/show/${show.id}`} className="a">
              <img className="season-image" src={show.image} alt={show.title} />
              <span className="show-title">{show.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
