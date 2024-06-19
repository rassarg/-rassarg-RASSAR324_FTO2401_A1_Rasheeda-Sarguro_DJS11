import React, { useEffect, useState } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import { fetchPreviews, genreMapping } from "../utils/api";

const Home = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPreviews();
        setShows(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching previews:", error);
        setError(
          "An error occurred while fetching the previews. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home-container">
      <h1>Podcasts</h1>
      <ul className="home-list">
        {shows.map((show) => (
          <li key={show.id} className="home-list-item">
            <NavLink to={`/show/${show.id}`} className="a">
              <img className="season-image" src={show.image} alt={show.title} />
              <span className="show-title">{show.title}</span>
              <span className="show-genre">
                {show.genres.map((genreId) => genreMapping[genreId]).join(", ")}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
