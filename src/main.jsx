import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import PropTypes from "prop-types";

import App from "./App";

// Context
import { AuthProvider, useAuth } from "./context/AuthContext";
import { GameProvider } from "./context/GameContext";

// Login Imports
import LogIn from "./pages/log/LogIn";
import Register from "./pages/log/Register";
import Settings from "./pages/log/Settings";
import ForgotPassword from "./pages/log/ForgotPassword";
import ResetPassword from "./pages/log/ResetPassword";

// Admin Imports
import HomeAdmin from "./pages/admin/HomeAdmin";
import UsersRoles from "./pages/admin/UsersRoles";
import TypesPlayers from "./pages/admin/TypesPlayers";
import MonstersFamily from "./pages/admin/MonstersFamily";
import Leveling from "./pages/admin/Leveling";

// Game Imports
import CreatePlayer from "./pages/game/CreatePlayer";
import Game from "./pages/game/Game";

// Components
import Popup from "./components/Popup";
import BackTop from "./components/BackTop";

function PrivateRoute({ element, requiresAuth, allowedRoles }) {
  const { user } = useAuth();
  if (requiresAuth && (!user || !allowedRoles.includes(user.rolename))) {
    return <Navigate to="/login" />;
  }
  return element;
}

PrivateRoute.propTypes = {
  element: PropTypes.node,
  requiresAuth: PropTypes.bool,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

PrivateRoute.defaultProps = {
  element: null,
  requiresAuth: false,
  allowedRoles: [],
};

function Main() {
  const { user, setUser, loading: authLoading } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const loginSucess = localStorage.getItem("loginSucess");

    if (user && loginSucess) {
      setShowPopup(true);
      localStorage.removeItem("loginSucess");
      setUser((prevUser) => ({
        ...prevUser,
      }));
    }
  }, [user, setUser]);

  const closePopup = () => {
    setShowPopup(false);
  };
  if (authLoading) {
    return (
      <div className="min-h-screen btn-in text-white p-0 m-0">Loading...</div>
    );
  }

  return (
    <>
      <div className="min-h-screen btn-in text-white p-0 m-0">
        <Routes>
          <Route
            path="/settings"
            element={
              <PrivateRoute
                element={<Settings />}
                requiresAuth
                allowedRoles={["1", "2", "3"]}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute
                element={<HomeAdmin />}
                requiresAuth
                allowedRoles={["2", "3"]}
              />
            }
          />
          <Route
            path="/admin/users-roles"
            element={
              <PrivateRoute
                element={<UsersRoles />}
                requiresAuth
                allowedRoles={["3"]}
              />
            }
          />
          <Route
            path="/admin/types-players"
            element={
              <PrivateRoute
                element={<TypesPlayers />}
                requiresAuth
                allowedRoles={["2", "3"]}
              />
            }
          />
          <Route
            path="/admin/monsters-family"
            element={
              <PrivateRoute
                element={<MonstersFamily />}
                requiresAuth
                allowedRoles={["2", "3"]}
              />
            }
          />
          <Route
            path="/admin/leveling"
            element={
              <PrivateRoute
                element={<Leveling />}
                requiresAuth
                allowedRoles={["2", "3"]}
              />
            }
          />
          <Route
            path="/game/create-player"
            element={
              <PrivateRoute
                element={<CreatePlayer />}
                requiresAuth
                allowedRoles={["1", "2", "3"]}
              />
            }
          />
          <Route
            path="/game/begin"
            element={
              <PrivateRoute
                element={<Game />}
                requiresAuth
                allowedRoles={["1", "2", "3"]}
              />
            }
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LogIn />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/forgot-password"
            element={user ? <Navigate to="/" /> : <ForgotPassword />}
          />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/" element={<App />} />
        </Routes>
        {showPopup && (
          <Popup onClose={closePopup} confirmButtonText="Fermer">
            <p>Successful login! Welcome to our website!</p>
          </Popup>
        )}
        <BackTop />
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GameProvider>
          <Main />
        </GameProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
