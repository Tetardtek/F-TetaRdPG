import React from "react";
import NavBar from "../../components/NavBar";
import { GameContext } from "../../context/GameContext";

import ManageTypes from "../../components/admin/TypesPlayers/ManageTypes";
import EditPlayers from "../../components/admin/TypesPlayers/EditPlayers";

function TypesPlayers() {
  const { types, players } = React.useContext(GameContext);

  return (
    <>
      <NavBar />
      <div className="btn-in font-montserrat font-semibold flex flex-col text-center text-3xl">
        <a className="text-white hover:text-d-purple" href="/admin">
          Admin Home
        </a>
        <h1 className="text-white">Types & Joueurs</h1>
        <ManageTypes />
        <div className="types-players">
          <ul className="btn-in grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {players.map((player) => {
              const type = types.find(
                (typeItem) => typeItem.id === player.types_id
              );
              return (
                <div className="btn rounded-lg w-auto">
                  <li className="btn-in text-xl rounded-lg" key={player.id}>
                    <p>ID Joueur: {player.id}</p>
                    <p>Nom: {player.nickname}</p>
                    <p>Type: {type ? type.name : "Unknown"}</p>
                    <p>Level: {player.level}</p>
                    <p>Vie: {player.life}</p>
                    <p>Attaque: {player.attack}</p>
                    <p>Defence: {player.defense}</p>
                    <p>Endurance: {player.stamina}</p>
                    <p>Xp Total: {player.xp_amount}</p>
                    <p>Or: {player.golds_amount}</p>
                    <EditPlayers player={player} />
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default TypesPlayers;
