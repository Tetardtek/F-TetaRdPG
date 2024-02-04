import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { GameContext } from "../../context/GameContext";

function Player() {
  const { types, players } = React.useContext(GameContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  const player = players.find(
    (playerItem) => playerItem.id === user.players_id
  );
  const type = types.find((typeItem) => typeItem.id === player?.types_id);

  useEffect(() => {
    if (!player) {
      navigate("/game/create-player");
    }
  }, [player, navigate]);

  if (!player) {
    return null;
  }

  return (
    <div className="btn-in rounded-lg text-xl">
      <p>ID Joueur: {player.id}</p>
      <p>Nom: {player.nickname}</p>
      <p>Type: {type ? type.name : "Unknow"}</p>
      <p>Level: {player.level}</p>
      <p>Vie: {player.life}</p>
      <p>Attaque: {player.attack}</p>
      <p>Defence: {player.defense}</p>
      <p>Endurance: {player.stamina}</p>
      <p>Xp Total: {player.xp_amount}</p>
      <p>Or: {player.golds_amount}</p>
    </div>
  );
}

export default Player;
