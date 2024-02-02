import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { GameContext } from "../../../context/GameContext";

function EditTypes({ type }) {
  const { editType } = useContext(GameContext);

  const [typeName, setTypeName] = useState(type.name);
  const [formVisible, setFormVisible] = useState(false);

  const handleEdit = async () => {
    await editType(type.id, {
      name: typeName,
    });
    window.location.reload();
  };

  return (
    <>
      <button type="button" onClick={() => setFormVisible(!formVisible)}>
        Edition
      </button>
      {formVisible && (
        <form onSubmit={handleEdit}>
          <input
            type="text"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
          />
          <button type="submit">✓</button>
        </form>
      )}
    </>
  );
}

EditTypes.propTypes = {
  type: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
};

export default EditTypes;
