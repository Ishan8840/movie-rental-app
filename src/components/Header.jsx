import "./Header.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStoreContext } from "../context/Context";
import { auth } from "../firebase";
import { signOut } from 'firebase/auth';


function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const { user, setUser } = useStoreContext();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <h1 className="logo" onClick={() => navigate("/")}>Flixit</h1>
        </div>
        <div className="menu-container">
          <ul className="menu-list">
            <li
              className={`menu-list-item ${isActive("/") ? "active" : ""}`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`menu-list-item ${isActive("/movies") ? "active" : ""}`}
              onClick={() => navigate("/movies")}
            >
              Movies
            </li>
          </ul>
        </div>

        {user ? (
          <>
            <div className="welcome-container">
              <p>Welcome, {user.displayName}</p>
            </div>
          </>
        ) : (
          <>
          </>
        )}

        <div className="search-bar">
          <form aria-label="Search the site">
            <input className="search-input" type="search" placeholder="Search..." />
            <button type="submit" aria-label="Search">
              <i className="search-icon fa fa-search"></i>
            </button>
          </form>
        </div>

        {user ? (
          <>
            <div className="sign-in-container">
              <div className="sign-in-button-container">
                <a
                  href="/cart"
                  className="signin-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/cart");
                  }}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                </a>
              </div>
            </div>
            <div className="sign-in-container">
              <div className="sign-in-button-container">
                <a
                  href="/settings"
                  className="signin-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/settings");
                  }}
                >
                  <i className="fa-solid fa-gear"></i>
                </a>
              </div>
            </div>
            <div className="sign-in-container">
              <div className="sign-in-button-container">
                <a
                  href="/signin"
                  className="signin-btn"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="sign-in-container">
              <div className="sign-in-button-container">
                <a
                  href="/signin"
                  className="signin-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/signin");
                  }}
                >
                  Sign In
                </a>
              </div>
            </div>
            <div className="sign-in-container">
              <div className="sign-in-button-container">
                <a
                  href="/signup"
                  className="signin-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/signup");
                  }}
                >
                  Sign Up
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
