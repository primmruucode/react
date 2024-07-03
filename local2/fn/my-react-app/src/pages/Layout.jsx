import { Outlet, Link } from "react-router-dom";
import './styles.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBlog, faCode, faBars, faCube, faFire } from '@fortawesome/free-solid-svg-icons'; // Example icons

const Layout = () => {
  return (
    <>
      <div className="content">
        <Outlet />
      </div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/"><FontAwesomeIcon icon={faHome} className="icon-large" /></Link>
          </li>
          <li>
            <Link to="/Login"><FontAwesomeIcon icon={faUser} className="icon-large" /></Link>
          </li>
          <li>
            <Link to="/App"><FontAwesomeIcon icon={faFire} className="icon-superlarge" /></Link>
          </li>
          <li>
            <Link to="/Upload"><FontAwesomeIcon icon={faCode} className="icon-large" /></Link>
          </li>
          <li>
            <Link to="/Wardrobe"><FontAwesomeIcon icon={faHome} className="icon-large" /></Link>
          </li>
        </ul>
      </nav>
      <nav className="navtop">
        <ul>
          
          <li>
            <Link to="/App"><FontAwesomeIcon icon={faCube} className="icon-large" /></Link>
          </li>
          <li>
            <Link to="/blogs"><FontAwesomeIcon icon={faHome} className="icon-large" /></Link>
          </li>
          <li>
            <Link to="/blogs"><FontAwesomeIcon icon={faBars} className="icon-large" /></Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Layout;
