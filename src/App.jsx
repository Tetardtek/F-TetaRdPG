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
        <div className="">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
      {isLoggedIn && (
        <div className="game-container">
          <Link to="/game">Continue vers le Jeu</Link>
          <Player />
        </div>
      )}
    </>
  );
}
