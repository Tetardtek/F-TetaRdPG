import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { GameContext } from "../../../context/GameContext";

function EditPlayers({ player }) {
  const { editPlayer, deletePlayer } = useContext(GameContext);

  const [playerName, setPlayerName] = useState(player.nickname);
  const [playerType, setPlayerType] = useState(player.types_id);
  const [playerExperience, setPlayerExperience] = useState(player.xp_amount);
  const [playerLevel, setPlayerLevel] = useState(player.level);
  const [playerStamina, setPlayerStamina] = useState(player.stamina);
  const [playerGold, setPlayerGold] = useState(player.golds_amount);
  const [playerHp, setPlayerHp] = useState(player.life);
  const [playerAttack, setPlayerAttack] = useState(player.attack);
  const [playerDefense, setPlayerDefense] = useState(player.defense);

  const [formVisible, setFormVisible] = useState(false);

  const handleEdit = async () => {
    await editPlayer(player.id, {
      nickname: playerName,
      types_id: playerType,
      xp_amount: playerExperience,
      level: playerLevel,
      stamina: playerStamina,
      golds_amount: playerGold,
      life: playerHp,
      attack: playerAttack,
      defense: playerDefense,
    });
    window.location.reload();
  };

  const handleDelete = (id) => {
    deletePlayer(id);
    window.location.reload();
  };

  return (
    <>
      <button type="button" onClick={() => handleDelete(player.id)}>
        {" "}
        Delete{" "}
      </button>
      <button type="button" onClick={() => setFormVisible(!formVisible)}>
        Edition
      </button>
      {formVisible && (
        <form onSubmit={handleEdit}>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <input
            type="number"
            value={playerType}
            onChange={(e) => setPlayerType(e.target.value)}
          />
          <input
            type="number"
            value={playerExperience}
            onChange={(e) => setPlayerExperience(e.target.value)}
          />
          <input
            type="number"
            value={playerLevel}
            onChange={(e) => setPlayerLevel(e.target.value)}
          />
          <input
            type="number"
            value={playerStamina}
            onChange={(e) => setPlayerStamina(e.target.value)}
          />
          <input
            type="number"
            value={playerGold}
            onChange={(e) => setPlayerGold(e.target.value)}
          />
          <input
            type="number"
            value={playerHp}
            onChange={(e) => setPlayerHp(e.target.value)}
          />
          <input
            type="number"
            value={playerAttack}
            onChange={(e) => setPlayerAttack(e.target.value)}
          />
          <input
            type="number"
            value={playerDefense}
            onChange={(e) => setPlayerDefense(e.target.value)}
          />
          <button type="submit">✓</button>
        </form>
      )}
    </>
  );
}

EditPlayers.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string,
    types_id: PropTypes.number,
    xp_amount: PropTypes.number,
    level: PropTypes.number,
    stamina: PropTypes.number,
    golds_amount: PropTypes.number,
    life: PropTypes.number,
    attack: PropTypes.number,
    defense: PropTypes.number,
  }).isRequired,
};

export default EditPlayers;
