import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { GameContext } from "../../../context/GameContext";

function EditLevel({ experience }) {
  const { editExperience, deleteExperience } = useContext(GameContext);

  const [xpQuantity, setXpQuantity] = useState(experience.xp_quantity);
  const [formVisible, setFormVisible] = useState(false);

  const handleEdit = async () => {
    await editExperience(experience.id, {
      xp_quantity: xpQuantity,
    });
    window.location.reload();
  };

  const handleDelete = (id) => {
    deleteExperience(id);
    window.location.reload();
  };

  return (
    <div className="sex flex justify-center">
      <button className="btn" type="button" onClick={() => handleDelete(experience.id)}>
              <span className="btn-in">Delete</span>
            </button>
      <button className="btn" type="button" onClick={() => setFormVisible(!formVisible)}>
        <span className="btn-in">Edition</span>
      </button>
      {formVisible && (
        <form className="" onSubmit={handleEdit}>
        <div className="relative flex items-center max-w-[8rem]">
          <button
            type="button"
            id="decrement-button"
            onClick={() => setXpQuantity(Math.max(0, xpQuantity - 100))}
            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-l-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <input
            type="number"
            id="quantity-input"
            value={xpQuantity}
            onChange={(e) => setXpQuantity(Math.max(0, e.target.value))}
            className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="999"
            required
          />
          <button
            type="button"
            id="increment-button"
            onClick={() => setXpQuantity(xpQuantity + 100)}
            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-r-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
        <button type="submit" className="btn mt-4">
          <div className="btn-in">✓</div>
        </button>
        </form>
      )}
    </div>
  );
}

EditLevel.propTypes = {
  experience: PropTypes.shape({
    id: PropTypes.number,
    xp_quantity: PropTypes.number,
  }).isRequired,
};

export default EditLevel;
