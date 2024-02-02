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
      <a className="font-montserrat font-semibold flex flex-col text-center text-3xl" href="/admin">Admin Home</a>
      <h1 className="text-center text-3xl">Types & Joueurs</h1>
      <ManageTypes />
      <div className="types-players">
        <ul className="gap-8 text-2xl list-none flex flex-wrap">
          {players.map((player) => {
            const type = types.find(
              (typeItem) => typeItem.id === player.types_id
            );
            return (
              <li className="player-card" key={player.id}>
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
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default TypesPlayers;
