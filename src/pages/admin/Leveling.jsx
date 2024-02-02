import React from "react";
import NavBar from "../../components/NavBar";
import { GameContext } from "../../context/GameContext";

import EditLevel from "../../components/admin/Leveling/EditLevel";
import AddLevel from "../../components/admin/Leveling/AddLevel";

function Leveling() {
  const { experiences } = React.useContext(GameContext);

  return (
    <>
      <NavBar />
      <div className="btn-in font-montserrat font-semibold flex flex-col text-center text-3xl">
        <a href="/admin" className="text-white hover:text-d-purple">
          Admin Home
        </a>
        <h1 className="text-white">Level</h1>
        <AddLevel /> <br />
        <div className="btn-in text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {experiences.map((experience) => (
            <div
              className="btn-in rounded-lg auto p-4 border border-gray-300"
              key={experience.id}
            >
              <p className="btn-in rounded-lg">
                Level {experience.id}: <br />
                {experience.xp_quantity} xp requis
              </p>
              <EditLevel experience={experience} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Leveling;
