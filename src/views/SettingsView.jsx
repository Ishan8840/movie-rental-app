import { useState } from 'react';
import { useStoreContext } from '../context/Context';
import { useNavigate, Link } from 'react-router-dom';
import { updateProfile, updatePassword } from "firebase/auth";
import { auth, firestore } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import './SettingsView.css';

function SettingsView() {
  const navigate = useNavigate();
  const { user, setUser, genres, setGenres, purchases } = useStoreContext();

  const [firstNameInput, setFirstNameInput] = useState(user.displayName.split(' ')[0]);
  const [lastNameInput, setLastNameInput] = useState(user.displayName.split(' ')[1]);
  const [passInput, setPassInput] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
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

  const isGoogleUser = user.providerData.some(profile => profile.providerId === 'google.com');

  const handleGenreClick = (id, name) => {
    if (selectedGenres.some((availableGenre) => availableGenre.id === id)) {
      setSelectedGenres(selectedGenres.filter((availableGenre) => availableGenre.id !== id));
    } else {
      setSelectedGenres([...selectedGenres, { id, name }]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (passInput !== confirmPass) {
      alert("Password Don't Match");
      return;
    } else if (selectedGenres.length < 10) {
      alert("Select at least 10 genres");
    } else {
      if (!isGoogleUser) {
        try {
          const updatedUser = { ...user, displayName: `${firstNameInput} ${lastNameInput}` };
          await updateProfile(auth.currentUser, { displayName: updatedUser.displayName });
          await updatePassword(auth.currentUser, passInput);
          setUser(updatedUser);
        } catch (error) {
          alert(error);
          return;
        }
      }

      setGenres(selectedGenres);
      const validPurchases = purchases ? purchases.toJS() : [];
      const docRef = doc(firestore, "users", user.uid);
      await updateDoc(docRef, { genres: selectedGenres, });
      navigate('/');
      alert("Settings Saved");
    }
  };

  return (
    <div className="settings-container">
      <nav className="settings-logo-nav">
        <Link to="/">
          <img src="../src/imgs/logo.png" alt="Logo" />
        </Link>
      </nav>
      <div className="settings-form-wrapper">
        <h2 className="settings-title">Settings</h2>
        <form onSubmit={handleSave} className="settings-form">
          <div className="settings-input-container">
            <input
              type="text"
              className="settings-input"
              value={firstNameInput}
              onChange={(e) => setFirstNameInput(e.target.value)}
              required={isGoogleUser}
              readOnly={isGoogleUser}
            />
            <label className="settings-label">New First Name</label>
          </div>
          <div className="settings-input-container">
            <input
              type="text"
              className="settings-input"
              value={lastNameInput}
              onChange={(e) => setLastNameInput(e.target.value)}
              required={isGoogleUser}
              readOnly={isGoogleUser}
            />
            <label className="settings-label">New Last Name</label>
          </div>
          <div className="settings-input-container">
            <input
              type="text"
              className="settings-input"
              value={user.email}
              readOnly
            />
            <label className="settings-label">Email</label>
          </div>
          {!isGoogleUser && (
            <>
              <div className="settings-input-container">
                <input
                  type="password"
                  className="settings-input"
                  onChange={(e) => setPassInput(e.target.value)}
                />
                <label className="settings-label">New Password</label>
              </div>
              <div className="settings-input-container">
                <input
                  type="password"
                  className="settings-input"
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
                <label className="settings-label">Confirm New Password</label>
              </div>
            </>
          )}
          <div className="settings-genres-container">
            <h3 className="settings-genres-title">Select Your Favorite Genres</h3>
            <div className="settings-genres-grid">
              {availableGenres.map((availableGenre) => (
                <button
                  key={availableGenre.id}
                  type="button"
                  className={`settings-genre-button ${selectedGenres.some((selected) => selected.id === availableGenre.id) ? 'selected' : ''}`}
                  onClick={() => handleGenreClick(availableGenre.id, availableGenre.name)}
                >
                  {availableGenre.name}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="settings-save-btn">
            Save Changes
          </button>
        </form>
      </div>
      {!purchases.isEmpty() ? (
        <div className="settings-purchases-container">
          <h3 className="settings-purchases-title">Your Past Purchases</h3>
          <div className="settings-purchases-list">
            {purchases.entrySeq().map(([key, value]) => (
              <div className="settings-purchase-item" key={key}>
                <img
                  className="settings-purchase-img"
                  src={`https://image.tmdb.org/t/p/w500${value.poster_path}`}
                  alt={value.title}
                  onClick={() => navigate(`/movies/details/${value.id}`)}
                />
                <div className="settings-purchase-details">
                  <h2 className="settings-purchase-title">{value.title}</h2>
                  <p className="settings-purchase-description">
                    {value.overview.split(" ").slice(0, 5).join(" ")}
                    {value.overview.split(" ").length > 5 && '...'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

    </div>
  );
}

export default SettingsView;
