import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { GameContext } from "../../../context/GameContext";

function EditMonsters({ monster }) {
  const { editMonster, deleteMonster } = useContext(GameContext);

  const [monsterFamily, setMonsterFamily] = useState(monster.family_id);
  const [monsterName, setMonsterName] = useState(monster.name);
  const [monsterLife, setMonsterLife] = useState(monster.life);
  const [monsterAttack, setMonsterAttack] = useState(monster.attack);
  const [monsterDefense, setMonsterDefense] = useState(monster.defense);
  const [monsterXp, setMonsterXp] = useState(monster.xp_give);
  const [monsterGold, setMonsterGold] = useState(monster.golds_give);

  const [formVisible, setFormVisible] = useState(false);

  const handleEdit = async () => {
    await editMonster(monster.id, {
      family_id: monsterFamily,
      name: monsterName,
      life: monsterLife,
      attack: monsterAttack,
      defense: monsterDefense,
      xp_give: monsterXp,
      golds_give: monsterGold,
    });
    window.location.reload();
  };

  const handleDelete = (id) => {
    deleteMonster(id);
    window.location.reload();
  };

  return (
    <>
      <button
        className="btn rounded-lg"
        type="button"
        onClick={() => handleDelete(monster.id)}
      >
        {" "}
        <span className="btn-in rounded-lg">Delete</span>{" "}
      </button>
      <button
        className="btn rounded-lg"
        type="button"
        onClick={() => setFormVisible(!formVisible)}
      >
        <span className="btn-in rounded-lg">Edition</span>
      </button>
      {formVisible && (
        <form onSubmit={handleEdit}>
          <input
            className="text-black text-center"
            type="number"
            value={monsterFamily}
            onChange={(e) => setMonsterFamily(e.target.value)}
          />
          <input
            className="text-black text-center"
            type="text"
            value={monsterName}
            onChange={(e) => setMonsterName(e.target.value)}
          />
          <input
            className="text-black text-center"
            type="number"
            value={monsterLife}
            onChange={(e) => setMonsterLife(e.target.value)}
          />
          <input
            className="text-black text-center"
            type="number"
            value={monsterAttack}
            onChange={(e) => setMonsterAttack(e.target.value)}
          />
          <input
            className="text-black text-center"
            type="number"
            value={monsterDefense}
            onChange={(e) => setMonsterDefense(e.target.value)}
          />
          <input
            className="text-black text-center"
            type="number"
            value={monsterXp}
            onChange={(e) => setMonsterXp(e.target.value)}
          />
          <input
            className="text-black text-center"
            type="number"
            value={monsterGold}
            onChange={(e) => setMonsterGold(e.target.value)}
          />
          <button className="btn rounded-lg" type="submit">
            <span className="btn-in rounded-lg">Valider</span>
          </button>
        </form>
      )}
    </>
  );
}

EditMonsters.propTypes = {
  monster: PropTypes.shape({
    id: PropTypes.number.isRequired,
    family_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    life: PropTypes.number.isRequired,
    attack: PropTypes.number.isRequired,
    defense: PropTypes.number.isRequired,
    xp_give: PropTypes.number.isRequired,
    golds_give: PropTypes.number.isRequired,
  }).isRequired,
};

export default EditMonsters;
