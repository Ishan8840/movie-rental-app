import { useState } from 'react';
import { useStoreContext } from '../context/Context';
import { useNavigate, Link } from 'react-router-dom';
import { updateProfile, updatePassword } from "firebase/auth";

import { auth, firestore } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
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
      await setDoc(docRef, { purchases: validPurchases, genres: selectedGenres, });
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
          <div className={isGoogleUser ? 'email-container' : 'info'}>
            <input
              type="text"
              value={firstNameInput}
              onChange={(e) => setFirstNameInput(e.target.value)}
              required={isGoogleUser}
              readOnly={isGoogleUser}
            />
            <label>New First Name</label>
          </div>
          <div className={isGoogleUser ? 'email-container' : 'info'}>
            <input
              type="text"
              value={lastNameInput}
              onChange={(e) => setLastNameInput(e.target.value)}
              required={isGoogleUser}
              readOnly={isGoogleUser}
            />
            <label>New Last Name</label>
          </div>
          <div className="email-container">
            <input type="text" value={user.email} readOnly />
            <label>Email</label>
          </div>
          {!isGoogleUser && (
            <div>
              <div className="info">
                <input type="password" name="password" onChange={(e) => setPassInput(e.target.value)} />
                <label>New Password</label>
              </div>
              <div className="info">
                <input type="password" name="confirmPassword" onChange={(e) => setConfirmPass(e.target.value)} />
                <label>Confirm New Password</label>
              </div>
            </div>
          )}
          < div className="genre-select-container">
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
      </div >
    </div >
  );
}

export default SettingsView;
