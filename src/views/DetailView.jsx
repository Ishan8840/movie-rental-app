import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddToCartButton from "../components/AddCart.jsx";
import "./DetailView.css";

function DetailView() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    async function fetchMovieDetails() {
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
      );
      setMovie(movieResponse.data);

      const videosResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_KEY}`
      );
      setTrailers(videosResponse.data.results.filter((video) => video.type === "Trailer"));
    }
    fetchMovieDetails();
  }, []);

  return (
    <div className="detail-view-container">
      {movie ? (
        <div>
          <h1>{movie.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            alt={movie.title}
            className="detail-view-poster"
          />
          <div className="add-to-cart-button">
            <AddToCartButton movie={movie} variant="detail-view" />
          </div>
          <p className="detail-info"><span>Overview: </span>{movie.overview}</p>
          <p className="detail-info"><span>Release Date:</span> {movie.release_date}</p>
          <p className="detail-info"><span>Rating:</span> {movie.vote_average}</p>
          <p className="detail-info"><span>Genres:</span> {movie.genres.map((g) => g.name).join(", ")}</p>
          <p className="detail-info"><span>Runtime:</span> {movie.runtime} minutes</p>
          <p className="detail-info"><span>Language:</span> {movie.original_language}</p>
          <p className="detail-info"><span>Revenue:</span> {movie.revenue}$</p>

          {trailers.length > 0 && (
            <div className="trailer-section">
              <h3 className="trailer-text">Trailer:</h3>
              <div>
                <iframe
                  src={`https://www.youtube.com/embed/${trailers[0].key}`}
                  title={trailers[0].name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="no-movie-selected">Select a movie to view details.</p>
      )}
    </div>
  );
}

export default DetailView;
