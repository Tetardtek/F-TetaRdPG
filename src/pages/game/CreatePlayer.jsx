import React from "react";
import NavBar from "../../components/NavBar";
import Create from "../../components/game/Create";

function CreatePlayer() {
  return (
    <>
      <NavBar />
      <h1>Créer un nouveau personnage</h1>
      <Create />
    </>
  );
}

export default CreatePlayer;
