import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

//   console.log("In navbar:- ",user)

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#22218b' }}>
      <div className="container-fluid">
       
        <h5 className="fw-bold" style={{ color: 'white', letterSpacing: '1px',marginBottom:'0px' }}>
          <Link className="navbar-brand text-white fw-bold" to="/">Smart Inventory</Link>
        </h5>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

         <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/product">Products</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link text-white" to="/inventory-alert">Inventory Alerts</Link>
            </li>
          </ul>

        </div> 
      </div>
    </nav>
  );
}
