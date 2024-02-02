import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { GameContext } from "../../../context/GameContext";

function EditFamily({ family }) {
  const { editFamily, deleteFamily } = useContext(GameContext);

  const [familyName, setFamilyName] = useState(family.name);
  const [formVisible, setFormVisible] = useState(false);

  const handleEdit = async () => {
    await editFamily(family.id, {
      name: familyName,
    });
    window.location.reload();
  };

  const handleDelete = (id) => {
    deleteFamily(id);
    window.location.reload();
  };
  return (
    <>
      <button
        className="btn rounded-lg"
        type="button"
        onClick={() => handleDelete(family.id)}
      >
        <span className="btn-in rounded-lg">x</span>
      </button>{" "}
      <button
        className="btn rounded-lg"
        type="button"
        onClick={() => setFormVisible(!formVisible)}
      >
        <span className="btn-in rounded-lg">Edition</span>
      </button>
      {formVisible && (
        <form onSubmit={handleEdit}>
          Nouveau nom:{" "}
          <input
            className="border rounded-lg text-center border-d-purple text-black"
            type="text"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
          />
          <button className="btn rounded-lg" type="submit">
            <span className="btn-in rounded-lg">✓</span>
          </button>
        </form>
      )}
    </>
  );
}

EditFamily.propTypes = {
  family: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditFamily;
