import { Link } from "react-router-dom";
import "./navbar.css";
import { useState } from "react";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentUser, setCurrentUser] = useState(user);

  const logout = () => {
    localStorage.setItem("user", null);
    setCurrentUser(null);
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/">
          <span className="logo">Booking Website</span>
        </Link>
        <div className="navItems">
          {!currentUser ? (
            <Link to="/signup">
              <button className="navButton">Register</button>
            </Link>
          ) : (
            <span>{currentUser.email}</span>
          )}
          {currentUser && (
            <Link to="/transactions">
              <button className="navButton">Transactions</button>
            </Link>
          )}
          {!currentUser ? (
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          ) : (
            <Link to="/">
              <button onClick={logout} className="navButton">
                Logout
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
