import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="navContainer">
      <ul className="inline-block flex-grow">
        <li className="inline-block">
          <Link to="/" className="navbar-item">Home</Link>
        </li>
        <li className="inline-block">
          <Link to="/boards" className="navbar-item">Boards</Link>
        </li>
        <li className="inline-block">
          <Link to="/boards/new" className="px-4 py-1.5 ml-2 text-xs rounded bg-blue-800 text-white hover:bg-blue-600 hover:py-2 ease-in duration-200">New Board</Link>
        </li>
      </ul>
      {/* <ul className="inline-block">
        <li className="inline-block">
          <Link to="/about" className="navbar-item">?</Link>
        </li>
        <li className="inline-block">
          <Link to="/profile" className="navbar-item">Profile</Link>
        </li>
      </ul> */}
    </nav>

  );
};

export default Navbar;
