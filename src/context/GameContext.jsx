import { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

const GameContext = createContext();

function GameProvider({ children }) {
  const [experiences, setExperiences] = useState([]);
  const [monsters, setMonsters] = useState([]);
  const [family, setFamily] = useState([]);
  const [types, setTypes] = useState([]);
  const [players, setPlayers] = useState([]);

  // Importation des données des API :
  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else if (response.status === 401) {
          setData([]);
        } else {
          console.error(
            `Error fetching data from ${url}: ${response.statusText}`
          );
        }
      } catch (error) {
        console.error(`Error fetching data from ${url}: ${error}`);
      }
    };

    fetchData(
      `${import.meta.env.VITE_BACKEND_URL}/api/experiences`,
      setExperiences
    );
    fetchData(`${import.meta.env.VITE_BACKEND_URL}/api/monsters`, setMonsters);
    fetchData(`${import.meta.env.VITE_BACKEND_URL}/api/family`, setFamily);
    fetchData(`${import.meta.env.VITE_BACKEND_URL}/api/types`, setTypes);
    fetchData(`${import.meta.env.VITE_BACKEND_URL}/api/players`, setPlayers);
  }, []);

  // Ajout des données des API :
  const addData = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });

      if (response.ok) {
        return response.json();
      }
      return response;
    } catch (error) {
      console.error(`Error adding data in ${url}: ${error}`);
      throw error;
    }
  };

  const addExperience = (data) => {
    return addData(`${import.meta.env.VITE_BACKEND_URL}/api/experiences`, data);
  };

  const addMonster = (data) => {
    return addData(`${import.meta.env.VITE_BACKEND_URL}/api/monsters`, data);
  };

  const addFamily = (data) => {
    return addData(`${import.meta.env.VITE_BACKEND_URL}/api/family`, data);
  };

  const addType = (data) => {
    return addData(`${import.meta.env.VITE_BACKEND_URL}/api/types`, data);
  };

  const addPlayer = (data) => {
    return addData(`${import.meta.env.VITE_BACKEND_URL}/api/players`, data);
  };

  // Update des données des API :
  const updateData = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.error(`Updating data in ${url}: ${response.statusText}`);
      } else {
        console.error(`Error updating data in ${url}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error updating data in ${url}: ${error}`);
    }
  };

  const updateExperience = (id, data) => {
    return updateData(
      `${import.meta.env.VITE_BACKEND_URL}/api/experiences/${id}`,
      data
    );
  };

  const updateMonster = (id, data) => {
    return updateData(
      `${import.meta.env.VITE_BACKEND_URL}/api/monsters/${id}`,
      data
    );
  };

  const updateFamily = (id, data) => {
    return updateData(
      `${import.meta.env.VITE_BACKEND_URL}/api/family/${id}`,
      data
    );
  };

  const updateType = (id, data) => {
    return updateData(
      `${import.meta.env.VITE_BACKEND_URL}/api/types/${id}`,
      data
    );
  };

  const updatePlayer = (id, data) => {
    return updateData(
      `${import.meta.env.VITE_BACKEND_URL}/api/players/${id}`,
      data
    );
  };

  // Edition des données des API :
  const editData = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.error(`Update data in ${url}: ${response.statusText}`);
      } else {
        console.error(`Error updating data in ${url}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error updating data in ${url}: ${error}`);
    }
  };

  const editExperience = (id, data) => {
    return editData(
      `${import.meta.env.VITE_BACKEND_URL}/api/experiences/${id}`,
      data
    );
  };

  const editMonster = (id, data) => {
    return editData(
      `${import.meta.env.VITE_BACKEND_URL}/api/monsters/${id}`,
      data
    );
  };

  const editFamily = (id, data) => {
    return editData(
      `${import.meta.env.VITE_BACKEND_URL}/api/family/${id}`,
      data
    );
  };

  const editType = (id, data) => {
    return editData(
      `${import.meta.env.VITE_BACKEND_URL}/api/types/${id}`,
      data
    );
  };

  const editPlayer = (id, data) => {
    return editData(
      `${import.meta.env.VITE_BACKEND_URL}/api/players/${id}`,
      data
    );
  };

  // Suppression des données des API :
  const deleteData = async (url) => {
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        console.error(`Update data in ${url}: ${response.statusText}`);
      } else {
        console.error(`Error deleting data in ${url}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error deleting data in ${url}: ${error}`);
    }
  };

  const deleteExperience = (id) => {
    return deleteData(
      `${import.meta.env.VITE_BACKEND_URL}/api/experiences/${id}`
    );
  };

  const deleteMonster = (id) => {
    return deleteData(`${import.meta.env.VITE_BACKEND_URL}/api/monsters/${id}`);
  };

  const deleteFamily = (id) => {
    return deleteData(`${import.meta.env.VITE_BACKEND_URL}/api/family/${id}`);
  };

  const deleteType = (id) => {
    return deleteData(`${import.meta.env.VITE_BACKEND_URL}/api/types/${id}`);
  };

  const deletePlayer = (id) => {
    return deleteData(`${import.meta.env.VITE_BACKEND_URL}/api/players/${id}`);
  };

  // Création du contexte :
  const value = useMemo(
    () => ({
      experiences,
      monsters,
      family,
      types,
      players,
      addExperience,
      addMonster,
      addFamily,
      addType,
      addPlayer,
      updateExperience,
      updateMonster,
      updateFamily,
      updateType,
      updatePlayer,
      editExperience,
      editMonster,
      editFamily,
      editType,
      editPlayer,
      deleteExperience,
      deleteMonster,
      deleteFamily,
      deleteType,
      deletePlayer,
    }),
    [
      experiences,
      monsters,
      family,
      types,
      players,
      addExperience,
      addMonster,
      addFamily,
      addType,
      addPlayer,
      updateExperience,
      updateMonster,
      updateFamily,
      updateType,
      updatePlayer,
      editExperience,
      editMonster,
      editFamily,
      editType,
      editPlayer,
      deleteExperience,
      deleteMonster,
      deleteFamily,
      deleteType,
      deletePlayer,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GameProvider, GameContext };
