import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, BellRing, HelpCircle, GraduationCap } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="brand">
          <GraduationCap size={24} className="brand-icon" />
          <span className="brand-text">CampusPing</span>
        </Link>
        
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            <HelpCircle size={18} />
            <span>Help Board</span>
          </Link>
          <Link to="/chat" className={`nav-link ${isActive('/chat') ? 'active' : ''}`}>
            <MessageSquare size={18} />
            <span>Mentor Chat</span>
          </Link>
          <Link to="/alerts" className={`nav-link ${isActive('/alerts') ? 'active' : ''}`}>
            <BellRing size={18} />
            <span>Alerts</span>
            <span className="notification-dot"></span>
          </Link>
        </div>

        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">Freshman User</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
