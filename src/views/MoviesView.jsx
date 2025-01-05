import { Outlet } from "react-router-dom";
import Genres from "../components/Genres";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useStoreContext } from "../context/Context.jsx";
import './MoviesView.css';

function MoviesView() {
  const { genres } = useStoreContext();

  return (
    <div>
      <div className="movies-view-container">
        <Header />
        <div className="main-content">
          <aside className="genre-view">
            <Genres genres={genres} />
          </aside>
          <main className="detail-view">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MoviesView;
