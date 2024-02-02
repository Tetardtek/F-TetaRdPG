import React, { useState, useContext } from "react";
import EditFamily from "./EditFamily";
import { GameContext } from "../../../context/GameContext";

function ManageFamily() {
  const { family, addFamily, deleteFamily } = useContext(GameContext);
  const [familyName, setFamilyName] = useState("");
  const [formVisible, setFormVisible] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addFamily({
        name: familyName,
      });
      setFamilyName("");
    } catch (error) {
      console.error("Error adding family:", error);
    }
    window.location.reload();
  };

  return (
    <div className="grid grid-cols-4">
      {family.map((familyItem) => (
        <div
          className="flex items-center justify-center flex-col border rounded-lg border-d-purple"
          key={familyItem.id}
        >
          ID Family {familyItem.id} <br />
          Nom: {familyItem.name}
          <EditFamily family={familyItem} />
        </div>
      ))}
      <div className="flex items-center justify-center flex-col border rounded-lg border-d-purple">
        <button
          className="btn"
          type="button"
          onClick={() => setFormVisible(!formVisible)}
        >
          <span className="btn-in">Ajouter</span>
        </button>
        {formVisible && (
          <form onSubmit={handleAdd}>
            Family name:{" "}
            <input
              type="text"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
            />
            <button className="btn" type="submit"><span className="btn-in">✓</span></button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ManageFamily;
