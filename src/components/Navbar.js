import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="navContainer">
      <ul className="inline-block flex-grow">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/boards">Boards</Link>
        </li>
        <li className="navbar-item">
          <Link to="/boards/new">New Board</Link>
        </li>
      </ul>
      <ul className="inline-block">
        <li className="navbar-item">
          <Link to="/about">?</Link>
        </li>
        <li className="navbar-item">
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
