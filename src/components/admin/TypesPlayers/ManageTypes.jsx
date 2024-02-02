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

  return (
    <div className="grid grid-cols-4 btn-in text-white">
      {types.map((type) => (
        <div key={type.id}>
          ID Type {type.id} <br />
          Nom: {type.name}
          <br />
          <EditTypes type={type} />
        </div>
      ))}
      <button
        className="btn rounded-lg"
        type="button"
        onClick={() => setFormVisible(!formVisible)}
      >
        <div className="btn-in rounded-lg">Ajouter</div>
      </button>
      {formVisible && (
        <form className="text-white" onSubmit={handleAdd}>
          Type name:{" "}
          <input
            className="border text-center rounded-lg border-d-purple text-black"
            type="text"
            value={typesName}
            onChange={(e) => setTypesName(e.target.value)}
          />
          <button className="btn rounded-lg" type="submit">
            <div className="btn-in">✓</div>
          </button>
        </form>
      )}
    </div>
  );
}

export default ManageTypes;
