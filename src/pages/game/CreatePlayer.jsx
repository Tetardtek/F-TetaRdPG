import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { GameContext } from "../../context/GameContext";
import { AuthContext } from "../../context/AuthContext";

function CreatePlayer() {
  const { addPlayer, types } = React.useContext(GameContext);
  const { editUser } = React.useContext(AuthContext);
  const [playerName, setPlayerName] = useState("");
  const [playerType, setPlayerType] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      const players = await addPlayer({
        nickname: playerName,
        types_id: playerType,
      });

      await editUser({
        players_id: players.id,
      });
    } finally {
      navigate("/");
    }
  };
  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center text-center">
        <div className="page-container btn mt-8 rounded-lg justify-center items-center inline-block">
          <div className="auth-form btn-in rounded-lg">
            <h1 className="text-2xl"> Créer un nouveau personnage</h1>
            <form
              onSubmit={handleCreate}
              className="form-container flex flex-col gap-4"
            >
              <label>
                Nom:
                <input
                  className="text-center text-white btn-in rounded-lg"
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                />
              </label>
              <label>
                Type:
                <select
                  value={playerType}
                  onChange={(e) => setPlayerType(e.target.value)}
                  className="text-center text-white btn-in rounded-lg"
                >
                  <option value="">Choisissez un type</option>
                  {types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </label>
              <input
                className="btn rounded-lg inline-block"
                type="submit"
                value="Crée"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePlayer;
