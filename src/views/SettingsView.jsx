import { useState } from 'react';
import { useStoreContext } from '../context/Context';
import { useNavigate, Link } from 'react-router-dom';
import './SettingsView.css';

function SettingsView() {
  const navigate = useNavigate();
  const { user, setUser, genres, setGenres } = useStoreContext();

  const [firstNameInput, setFirstNameInput] = useState(user.displayName.split(' ')[0]);
  const [lastNameInput, setLastNameInput] = useState(user.displayName.split(' ')[1]);
  const [selectedGenres, setSelectedGenres] = useState(genres || []);

  const availableGenres = [
    { id: 28, name: 'Action' },
    { id: 80, name: 'Crime' },
    { id: 27, name: 'Horror' },
    { id: 53, name: 'Thriller' },
    { id: 12, name: 'Adventure' },
    { id: 10751, name: 'Family' },
    { id: 10402, name: 'Music' },
    { id: 10752, name: 'War' },
    { id: 16, name: 'Animation' },
    { id: 14, name: 'Fantasy' },
    { id: 9648, name: 'Mystery' },
    { id: 37, name: 'Western' },
    { id: 35, name: 'Comedy' },
    { id: 36, name: 'History' },
    { id: 878, name: 'Sci-Fi' },
  ];

  const handleGenreClick = (id, name) => {
    if (selectedGenres.some((availableGenre) => availableGenre.id === id)) {
      setSelectedGenres(selectedGenres.filter((availableGenre) => availableGenre.id !== id));
    } else {
      setSelectedGenres([...selectedGenres, { id, name }]);
    }
  };

  const updateProfile = async (user, updatedData) => {
    return Promise.resolve(updatedData);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (selectedGenres.length < 10) {
      alert("Select at least 10 genres");
    } else {
      const updatedUser = { ...user, displayName: `${firstNameInput} ${lastNameInput}` };
      await updateProfile(updatedUser, { displayName: `${firstNameInput} ${lastNameInput}` });

      setGenres(selectedGenres);
      setUser(updatedUser);
      navigate('/');
      alert("Settings Saved");
    }
  };

  return (
    <div className="sign-up-page">
      <nav className="logo-nav">
        <Link to="/"><img src="../src/imgs/logo.png" alt="Logo" /></Link>
      </nav>
      <div className="sign-up">
        <h2>Settings</h2>
        <form onSubmit={handleSave}>
          <div className="info">
            <input
              type="text"
              value={firstNameInput}
              onChange={(e) => setFirstNameInput(e.target.value)}
              required
            />
            <label>New First Name</label>
          </div>
          <div className="info">
            <input
              type="text"
              value={lastNameInput}
              onChange={(e) => setLastNameInput(e.target.value)}
              required
            />
            <label>New Last Name</label>
          </div>
          <div className="email-container">
            <input type="text" value={user.email} readOnly />
            <label>Email</label>
          </div>
          <div className="genre-select-container">
            <h3>Select Your Favorite Genres</h3>
            <div className="genres-grid">
              {availableGenres.map((availableGenre) => (
                <button
                  key={availableGenre.id}
                  type="button"
                  className={`genre-select-button ${selectedGenres.some((selected) => selected.id === availableGenre.id) ? 'selected' : ''}`}
                  onClick={() => handleGenreClick(availableGenre.id, availableGenre.name)}
                >
                  {availableGenre.name}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="sign-up-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default SettingsView;
