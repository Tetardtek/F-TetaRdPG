import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavBarData from "../datas/NavBarData.json";
import NavBarConnected from "../datas/NavBarConnected.json";
import NavBarModerator from "../datas/NavBarModerator.json";
import NavBarAdmin from "../datas/NavBarAdmin.json";

import logo from "../assets/png/logo.png";

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = React.useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  // NAVBAR DATA
  let navbardata;
  if (user?.rolename === "3") {
    navbardata = NavBarAdmin;
  } else if (user?.rolename === "2") {
    navbardata = NavBarModerator;
  } else if (user) {
    navbardata = NavBarConnected;
  } else {
    navbardata = NavBarData;
  }

  // LOGGED IN MESSAGE
  let warningMessage;
  if (!user) {
    warningMessage = "Warning! You are not logged.";
  } else {
    switch (user.roles_id) {
      case 1:
        warningMessage = `Hello ${user.nickname}! You are logged in as a user.`;
        break;
      case 2:
        warningMessage = `Hello ${user.nickname}! You are logged in as a moderator.`;
        break;
      case 3:
        warningMessage = `Hello ${user.nickname}! You are logged in as an admin.`;
        break;
      default:
        warningMessage = "Warning! Unknown user role.";
    }
  }

  return (
    <nav className="bg-d-purple text-2xl text-white font-montserrat font-semibold h-auto flex justify-between items-center flex-row">
      <Link to="/">
        <img src={logo} alt="Your Logo" className="cursor-default h-40 w-40" />
      </Link>
      <div className="logIn">{warningMessage}</div>
      <Link to="/" className="hover:text-w-purple">
        TetaRdPG
      </Link>
      <button
        className={`text-white p-2 text-8xl rounded hover:text-white ${showMenu ? "hidden" : ""}`}
        type="button"
        onClick={toggleMenu}
      >
        &#9776;
      </button>
      <ul className={`text-white p-2 rounded  ${showMenu ? "show-menu" : "hidden"}`}>
        {navbardata.map((item) => (
          <li className="hover:text-w-purple" key={item.id}>
            {item.linkname === "Logout" ? (
              <button
                type="button"
                className="logout-button"
                onClick={() => {
                  logout();
                  closeMenu();
                  navigate("/");
                }}
              >
                {item.linkname}
              </button>
            ) : (
              <Link to={item.linkurl} onClick={closeMenu}>
                {item.linkname}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
