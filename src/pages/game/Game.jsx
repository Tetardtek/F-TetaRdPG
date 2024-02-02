import React from "react";
import NavBar from "../../components/NavBar";
import Player from "../../components/game/Player";

function Game() {
  const [isVisible, setIsVisible] = React.useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <NavBar />
      <button type="button" onClick={handleToggle}>
        HUD
      </button>
      {isVisible && <Player />}
      <h1>Game</h1>
      <p>C'est ici que se déroulera le jeu !</p>
    </>
  );
}

export default Game;
