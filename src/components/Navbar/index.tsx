import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [username, setUsername] = useState<string>('');

  // Use useEffect to handle localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('userName');
    if (storedUsername) {
      try {
        const parsedUsername = JSON.parse(storedUsername);
        setUsername(parsedUsername);
      } catch (error) {
        console.error('Error parsing username from localStorage:', error);
        setUsername('');
      }
    }
  }, []); // Empty dependency array means this runs once on mount

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      setUsername('');
      navigate('/login');
      setIsOpen(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className={`menu-overlay ${isOpen ? 'open' : ''}`} onClick={toggleMenu} />
      
      {/* Toggle Button */}
      <div className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="menu-toggle-line"></div>
        <div className="menu-toggle-line"></div>
        <div className="menu-toggle-line"></div>
      </div>
      
      {/* Semi-Circular Menu */}
      <nav className={`nav-menu ${isOpen ? 'open' : ''}`}>
        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-icon">
            <i className="fas fa-user"></i>
          </div>
          <div className="username">{username || 'Guest'}</div>
        </div>
        
        {/* Menu Items */}
        <div className="menu-items">
          <a href="/profile" className="menu-item">My Profile</a>
          <a href="/interests" className="menu-item">Home</a>
          <a href="/settings" className="menu-item">Settings</a>
          {/* <a href="/help" className="menu-item">Help</a> */}
          <button className="menu-item logout-btn" onClick={handleLogout}>Logout</button>
        </div>
        
        {/* Social Media */}
        <div className="social-media">
          {/* <a href="#" className="social-icon-nav"><i className="fab fa-facebook-f"></i></a> */}
          <a href="#" className="social-icon-nav"><i className="fab fa-twitter"></i></a>
          <a href="#" className="social-icon-nav"><i className="fab fa-instagram"></i></a>
          <a href="#" className="social-icon-nav"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;