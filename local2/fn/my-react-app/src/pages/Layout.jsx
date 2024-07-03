// Layout.js
import { Outlet, Link } from "react-router-dom";
import './styles.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBlog } from '@fortawesome/free-solid-svg-icons'; // Example icons

const Layout = () => {
  return (
    <>
      <div className="content">
        <Outlet />
      </div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/"><FontAwesomeIcon icon={faHome} />Home</Link>
          </li>
          <li>
            <Link to="/App"><FontAwesomeIcon icon={faUser} />App</Link>
          </li>
          <li>
            <Link to="/blogs"><FontAwesomeIcon icon={faHome} />Blogs</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Layout;
