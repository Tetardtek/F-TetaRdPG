import React, { useState, useContext } from "react";
import { GameContext } from "../../../context/GameContext";

function AddLevel() {
  const { addExperience } = useContext(GameContext);
  const [level, setLevel] = useState("");
  const [xpQuantity, setXpQuantity] = useState("");
  const [formVisible, setFormVisible] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addExperience({
        level,
        xp_quantity: xpQuantity,
      });
      setLevel("");
      setXpQuantity("");
    } catch (error) {
      console.error("Error adding experience:", error);
    }
    window.location.reload();
  };

  return (
    <div className="btn-in rounded-lg">
      <button
        className="btn rounded-lg"
        type="button"
        onClick={() => setFormVisible(!formVisible)}
      >
        <div className="btn-in rounded-lg">Ajouter</div>
      </button>
      {formVisible && (
        <form className="btn-in rounded-lg" onSubmit={handleAdd}>
          <div className="relative flex items-center max-w-[16rem]">
            <label
              htmlFor="level-input"
              className="absolute left-3 -top-3 -z-1 text-xs text-gray-400 dark:text-gray-500"
            >
              Niveau
            </label>
            <input
              type="number"
              id="level-input"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1"
              required
            />
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
          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            Veuillez sélectionner la quantité d'expérience souhaité
          </p>
          <button type="submit" className="btn rounded-lg mt-4">
            <div className="btn-in rounded-lg">✓</div>
          </button>
        </form>
      )}
    </div>
  );
}

export default AddLevel;
