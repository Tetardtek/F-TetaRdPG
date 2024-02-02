import React from "react";
import NavBar from "../../components/NavBar";
import { GameContext } from "../../context/GameContext";

import EditMonsters from "../../components/admin/MonstersFamily/EditMonsters";
import ManageFamily from "../../components/admin/MonstersFamily/ManageFamily";

function MonstersFamily() {
  const { family, monsters } = React.useContext(GameContext);

  return (
    <>
      <NavBar />
      <div className="btn-in font-montserrat font-semibold flex flex-col text-center text-3xl">
        <a className="text-white hover:text-d-purple" href="/admin">
          Admin Home
        </a>
        <h1 className="text-white">Monstres & Familles</h1>
      </div>
      <ManageFamily />
      <div className="monsters-family">
        <ul className="btn-in grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4">
          {monsters.map((monster) => {
            const familyName = family.find(
              (familyItem) => familyItem.id === monster.family_id
            );
            return (
              <div className="btn rounded-lg">
                <li className="btn-in text-xl rounded-lg" key={monster.id}>
                  <p>ID Monstre: {monster.id}</p>
                  <p>Famille: {familyName ? familyName.name : "Unknown"}</p>
                  <p>Nom: {monster.name}</p>
                  <p>Vie: {monster.life}</p>
                  <p>Attaque: {monster.attack}</p>
                  <p>Defence: {monster.defense}</p>
                  <p>Xp: {monster.xp_give}</p>
                  <p>Or: {monster.golds_give}</p>
                  <EditMonsters monster={monster} />
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default MonstersFamily;
