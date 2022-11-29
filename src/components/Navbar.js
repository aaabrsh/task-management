import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/boards">Boards</Link>
        </li>
        <li>
          <Link to="/boards/new">New Board</Link>
        </li>
        <li>
          <Link to="/about">?</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
