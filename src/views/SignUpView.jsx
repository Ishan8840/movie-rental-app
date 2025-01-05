import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStoreContext } from '../context/Context';
import { Map } from 'immutable';
import './SignUpView.css';

function SignUpView() {
  const navigate = useNavigate();
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);

  const { setEmail, setPass, setFirstName, setLastName, setGenres, setCart } = useStoreContext();

  const genres = [
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
    if (selectedGenres.some((genre) => genre.id === id)) {
      setSelectedGenres(selectedGenres.filter((genre) => genre.id !== id));
    } else {
      setSelectedGenres([...selectedGenres, { id, name }]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (passInput !== confirmPass) {
      alert("Password Don't Match");
    } else if (selectedGenres.length < 10) {
      alert("Select at least 10 genres");
    } else {
      setEmail(emailInput);
      setPass(passInput);
      setFirstName(firstNameInput);
      setLastName(lastNameInput);
      setGenres(selectedGenres);
      setCart(Map());

      navigate('/signin');
    }
  };

  return (
    <div>
      <nav className="logo-nav">
        <Link to="/"><img src="../src/imgs/logo.png" /></Link>
      </nav>
      <div className="sign-up-page">
        <div className="sign-up">
          <h2>SIGN UP</h2>
          <form onSubmit={handleSubmit}>
            <div className="info">
              <input type="text" name="first" onChange={(e) => setFirstNameInput(e.target.value)} required />
              <label>First Name</label>
            </div>
            <div className="info">
              <input type="text" name="last" onChange={(e) => setLastNameInput(e.target.value)} required />
              <label>Last Name</label>
            </div>
            <div className="info">
              <input type="email" name="email" onChange={(e) => setEmailInput(e.target.value)} required />
              <label>Email</label>
            </div>
            <div className="info">
              <input type="password" name="password" onChange={(e) => setPassInput(e.target.value)} required />
              <label>Password</label>
            </div>
            <div className="info">
              <input type="password" name="confirmPassword" onChange={(e) => setConfirmPass(e.target.value)} required />
              <label>Confirm Password</label>
            </div>

            <div className="genre-select-container">
              <h3>Select Your Favorite Genres</h3>
              <div className="genres-grid">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    type="button"
                    className={`genre-select-button ${selectedGenres.some(selected => selected.id === genre.id) ? 'selected' : ''}`}
                    onClick={() => handleGenreClick(genre.id, genre.name)}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>

            <button className="sign-up-btn" type="submit">Sign Up</button>
            <div className="help">
              <Link to="#">Need help?</Link>
            </div>
          </form>
          <p>Already Have An Account? <Link to="/signin">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignUpView;