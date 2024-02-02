import React, { useState, useContext } from "react";
import EditTypes from "./EditTypes";
import { GameContext } from "../../../context/GameContext";

function ManageTypes() {
  const { types, addType, deleteType } = useContext(GameContext);
  const [typesName, setTypesName] = useState("");
  const [formVisible, setFormVisible] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addType({
        name: typesName,
      });
      setTypesName("");
    } catch (error) {
      console.error("Error adding types:", error);
    }
    window.location.reload();
  };

  const handleDelete = (id) => {
    deleteType(id);
    window.location.reload();
  };

  return (
    <div className="types">
      {types.map((type) => (
        <div key={type.id}>
          <button type="button" onClick={() => handleDelete(type.id)}>
            x
          </button>{" "}
          <EditTypes type={type} />
          ID Type {type.id} <br />
          Nom: {type.name}
        </div>
      ))}
      <button type="button" onClick={() => setFormVisible(!formVisible)}>
        Ajouter
      </button>
      {formVisible && (
        <form onSubmit={handleAdd}>
          Type name:{" "}
          <input
            type="text"
            value={typesName}
            onChange={(e) => setTypesName(e.target.value)}
          />
          <button type="submit">✓</button>
        </form>
      )}
    </div>
  );
}

export default ManageTypes;
