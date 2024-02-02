import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Player from "./components/game/Player";

import "./tailwind.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <>
      <NavBar />
      {!isLoggedIn && (
        <div className="text-2xl font-montserrat font-semibold flex justify-around">
          <Link className="cursor-default hover:text-d-purple" to="/login">
            Login
          </Link>
          <Link className="cursor-default hover:text-d-purple" to="/register">
            Register
          </Link>
        </div>
      )}
      {isLoggedIn && (
        <div>
          <div className="text-2xl font-montserrat font-semibold flex justify-around hover:text-d-purple">
            <Link className="cursor-default" to="/game/begin">
              Continue vers le jeu
            </Link>
          </div>
          <div className="btn">
            <Player />
          </div>
        </div>
      )}
    </>
  );
}
