import React from "react";
import NavBar from "../../components/NavBar";
import { AuthContext } from "../../context/AuthContext";

function UsersRoles() {
  const { users, roles } = React.useContext(AuthContext);

  return (
    <>
      <NavBar />
      <a href="/admin">Admin Home</a>
      <h1>Users & Roles edit page</h1>
      <div className="users">
        <ul>
          {users.map((user) => {
            const role = roles.find(
              (roleItem) => roleItem.id === user.roles_id
            );
            return (
              <li className="user-card" key={user.id}>
                <p>ID User: {user.id}</p>
                <p>Pseudo: {user.nickname}</p>
                <p>Nom: {user.firstname}</p>
                <p>Prénom: {user.lastname}</p>
                <p>Email: {user.mail}</p>
                <p>Date de naissance: {user.birthdate}</p>
                <p>Role: {role ? role.rolename : "Unknow"}</p>
                <p>ID player: {user.players_id}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default UsersRoles;
