import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddToCartButton from "../components/AddCart.jsx";
import './Feature.css';

function Feature() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async function getRandomMovies() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}`
      );

      const moviesData = response.data.results;
      const randomMovies = [];
      let availableMovies = [...moviesData];

      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * availableMovies.length);
        const randomMovie = availableMovies[randomIndex];

        randomMovies.push(randomMovie);
        availableMovies.splice(randomIndex, 1);
      }
      setMovies(randomMovies);
    })();
  }, []);

  return (
    <div className="feature-list-container">
      <div className="titles-container">
        <span className="feature-list-title">Now Playing</span>
        <span className="feature-list-more" onClick={() => navigate("/movies")}>
          See more
        </span>
      </div>
      <div className="feature-list-wrapper">
        <div className="feature-list">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="feature-list-item"

            >
              <img
                className="feature-list-item-img"
                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                alt={movie.title}
                onClick={() => navigate(`/movies/details/${movie.id}`)}
              />
              <span className="feature-list-item-title" onClick={() => navigate(`/movies/details/${movie.id}`)}>{movie.title}</span>
              <p className="feature-list-item-description" onClick={() => navigate(`/movies/details/${movie.id}`)}>
                {movie.overview.length > 150
                  ? movie.overview.substring(0, 150) + "..."
                  : movie.overview}
              </p>
              <AddToCartButton movie={movie} variant="feature" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feature;
