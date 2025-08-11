import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from '../auth/modal/Modal';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import './navbar.css';
import { useAuth } from '../auth/useAuth';
import axios from 'axios';

function Navbar({ modalOpen, setModalOpen, showLogin, setShowLogin }) {
  const { user, login, logout: contextLogout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const openLogin = () => {
    setShowLogin(true);
    setModalOpen(true);
  };

  const openSignup = () => {
    setShowLogin(false);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);
  const toggleForm = () => setShowLogin((prev) => !prev);

  const handleAuthSuccess = (token) => {
    login(token);
    setModalOpen(false);
    navigate("/home");
  };

  const handleLogout = () => {
    contextLogout(); // clears everything
    setProfileOpen(false);
    navigate('/home', { replace: true });
  };

  const handleProtectedClick = (path) => {
    if (user) {
      navigate(path);
    } else {
      openLogin();
    }
  };

  return (
    <>
      <header className="navbar">
        <nav className="navbar-container">
          <div className="logo">
            <Link to='/home' className="logo">FindMyProperty</Link>
          </div>
          <ul className="nav-links">
            <li><Link to='/home'>Home</Link></li>
            <li>
              <span style={{ cursor: "pointer" }} onClick={() => handleProtectedClick('/properties')}>
                Properties
              </span>
            </li>
            <li>
              <Link to="/home#about">About</Link>
            </li>
            <li>
              <Link to="/home#contact">Contact</Link>
            </li>
          </ul>
          <div className="auth-buttons">
            {user ? (
              <div
                className="profile-dropdown"
                onMouseEnter={() => setProfileOpen(true)}
                onMouseLeave={() => setProfileOpen(false)}
                style={{ position: "relative", display: "inline-block" }}
              >
                <span className="profile" style={{ cursor: "pointer" }}>
                  Hi, {user.name}
                </span>
                {profileOpen && (
                  <div className="dropdown-menu">
                    <Link to={`/profile/${user.uid}`}>
                      <button className="dropdown-item">My Profile</button>
                    </Link>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button className="btn" onClick={openLogin}>Login</button>
                <button className="btn btn-outline" onClick={openSignup}>Sign Up</button>
              </>
            )}
          </div>
        </nav>
      </header>

      <Modal show={modalOpen} onClose={closeModal}>
        {showLogin
          ? <Login onSwitch={toggleForm} onSuccess={handleAuthSuccess} />
          : <Signup onSwitch={toggleForm} onSuccess={handleAuthSuccess} />}
      </Modal>
    </>
  );
}

export default Navbar;