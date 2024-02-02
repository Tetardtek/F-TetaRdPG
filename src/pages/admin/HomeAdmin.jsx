import React from "react";
import NavBar from "../../components/NavBar";


function HomeAdmin() {
  const user = { role: 3 };

  return (
    <>
      <NavBar />
      <div className="font-montserrat font-semibold flex flex-col">
        <h1 className="text-center text-3xl">Welcome to your admin Panel</h1>
        <ul className="list-none flex justify-around">
          <li className="hover:border hover:border-d-purple rounded-md">
            <a href="/admin/types-players">Types & Players</a>
          </li>
          <li className="hover:border hover:border-d-purple rounded-md" >
            <a href="/admin/monsters-family">Monsters & Family</a>
          </li>
          <li className="hover:border hover:border-d-purple rounded-md" >
            <a href="/admin/leveling">Leveling</a>
          </li>
          {user.role === 3 && (
            <li className="hover:border hover:border-d-purple rounded-md" >
              <a href="/admin/users-roles">Users & Roles</a>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default HomeAdmin;
