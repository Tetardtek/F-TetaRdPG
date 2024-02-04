import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Popup from "../../components/Popup";
import NavBar from "../../components/NavBar";

export default function LogIn() {
  const [credentials, setCredentials] = useState({
    mail: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
    setLoginError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const status = await login(credentials);

      if (status === "Login successful") {
        localStorage.setItem("loginSuccess", "true");
        setShowLoginPopup(true);
      }
    } catch (error) {
      console.error("Error during login:", error);

      if (error.message === "Email not found") {
        setLoginError("Email not found. Please check your email.");
      } else if (error.message === "Incorrect password") {
        setLoginError("Incorrect password. Please try again.");
      } else {
        setLoginError("Email not found. Please check your email.");
      }
    }
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
    navigate("/");
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center text-center">
        <div className="btn mt-8 rounded-lg justify-center items-center inline-block">
          <div className="auth-form btn-in rounded-lg">
            <h2 className="text-xl">Login</h2>
            <form
              onSubmit={handleLogin}
              className="form-container flex flex-col gap-4"
            >
              <label>
                Mail:
                <input
                  className="text-center text-white btn-in rounded-lg"
                  type="email"
                  name="mail"
                  value={credentials.mail}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Password:
                <input
                  className="text-center text-white btn-in rounded-lg"
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                />
              </label>
              <button className="btn rounded-lg inline-block" type="submit">
                <div className="btn-in rounded-lg">Login</div>
              </button>
            </form>
            <p className="m-4">Don't have an account? &nbsp;</p>
            <Link to="/register" className="btn rounded-lg inline-block">
              <div className="btn-in rounded-lg">Signup here</div>
            </Link>
            <p>
              <Link
                to="/forgot-password"
                className="btn rounded-lg inline-block"
              >
                <div className="btn-in rounded-lg">Forgot your password?</div>
              </Link>
            </p>
            {loginError && <p className="error-message">{loginError}</p>}
            {showLoginPopup && (
              <Popup onClose={handleCloseLoginPopup} confirmButtonText="Close">
                <p>Login successful! Welcome back ✔</p>
              </Popup>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
