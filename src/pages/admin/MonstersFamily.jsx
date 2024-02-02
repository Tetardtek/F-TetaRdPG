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
      <a className="gap-8 text-3xl list-none flex flex-wrap" href="/admin">Admin Home</a>
      <h1 className="text-center text-3xl">Monstres & Familles</h1>
      <ManageFamily />
      <div className="monsters-family">
        <ul className="gap-8 text-2xl list-none flex flex-wrap">
          {monsters.map((monster) => {
            const familyName = family.find(
              (familyItem) => familyItem.id === monster.family_id
            );
            return (
              <li className="flex flex-col items-center w-80 border border-d-purple rounded-lg hover:text-d-purple hover:cursor-pointer" key={monster.id}>
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
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default MonstersFamily;
