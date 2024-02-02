import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../context/GameContext";
import { AuthContext } from "../../context/AuthContext";

function Create() {
  const { addPlayer } = React.useContext(GameContext);
  const { editUser } = React.useContext(AuthContext);
  const [playerName, setPlayerName] = useState("");
  const [playerType, setPlayerType] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    await addPlayer({
      nickname: playerName,
      types_id: playerType,
    })
      .then((players) => {
        editUser({
          players_id: players.id,
        });
      })
      .then(() => {
        navigate("/game");
      });
  };

  return (
    <form onSubmit={handleCreate}>
      <label>
        Nom:
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </label>
      <label>
        Type:
        <input
          type="number"
          value={playerType}
          onChange={(e) => setPlayerType(e.target.value)}
        />
      </label>
      <input type="submit" value="Créer" />
    </form>
  );
}

export default Create;
