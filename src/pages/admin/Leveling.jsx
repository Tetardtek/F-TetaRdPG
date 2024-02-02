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
      <a href="/admin" className="font-montserrat font-semibold flex flex-col text-center text-3xl">Admin Home</a>
      <h1 className="text-center text-3xl">Level</h1>
      <div>
        <AddLevel /> <br />
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        {experiences.map((experience) => (
          <div className="border rounded-lg border-d-purple" key={experience.id}>
            <p className="w-60 text-center text-3xl p-2">
              Level {experience.id}: <br />
              {experience.xp_quantity} xp requis
            </p>
            <EditLevel experience={experience} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Leveling;
