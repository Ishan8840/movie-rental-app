import { useNavigate, Link } from 'react-router-dom';
import { useStoreContext } from '../context/Context';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import './SignInView.css';

function SignInView() {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');

  const { user, setUser } = useStoreContext();

  async function loginByEmail(event) {
    event.preventDefault();

    try {
      const user = (await signInWithEmailAndPassword(auth, emailInput, passInput)).user;
      navigate('/movies');
      setUser(user);
    } catch (error) {
      alert(error);
    }
  }

  async function loginByGoogle() {
    try {
      const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
      navigate('/movies');
      setUser(user);
    } catch (error) {
      alert("Error signing in!");
    }
  }

  return (
    <div>
      <nav className="logo-nav">
        <Link to="/">
          <img src="../src/imgs/logo.png" alt="Logo" />
        </Link>
      </nav>
      <div className="sign-in-page">
        <div className="sign-in">
          <h2>SIGN IN</h2>
          <form onSubmit={(event) => { loginByEmail(event) }}>
            <div className="info">
              <input
                type="email"
                name="email"
                onChange={(event) => setEmailInput(event.target.value)}
                required
                value={emailInput}
              />
              <label>Email</label>
            </div>
            <div className="info">
              <input
                type="password"
                name="password"
                onChange={(event) => setPassInput(event.target.value)}
                required
                value={passInput}
              />
              <label>Password</label>
            </div>
            <button className="sign-in-btn" type="submit">Sign In</button>
          </form>
          <button className="sign-in-btn" onClick={() => loginByGoogle()}>Sign In With Google</button>
          <p>New to Flixit? <Link to="/signup">Sign up now</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignInView;
