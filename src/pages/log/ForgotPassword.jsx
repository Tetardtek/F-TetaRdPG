import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavBar from "../../components/NavBar";
import Popup from "../../components/Popup";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { sendPasswordResetEmail } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await sendPasswordResetEmail(email);

      setShowPopup(true);
    } catch (catchError) {
      console.error("Error sending password reset email:", error);
      setError("Error sending password reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/");
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center text-center">
        <div className="btn mt-8 rounded-lg justify-center items-center inline-block">
          <div className="auth-form btn-in rounded-lg">
            <h2 className="text-xl">Forgot Password</h2>
            <form
              onSubmit={handleSubmit}
              className="form-container flex flex-col gap-4"
            >
              <label>
                Email:
                <input
                  className="text-center text-white btn-in rounded-lg"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <button
                type="submit"
                className="btn rounded-lg inline-block"
                disabled={loading}
              >
                <div className="btn-in rounded-lg">
                  {" "}
                  {loading ? "Sending..." : "Reset Password"}{" "}
                </div>
              </button>
            </form>
            <p className="m-4">Remember your password?</p>
            <Link to="/login" className="btn rounded-lg inline-block">
              <div className="btn-in rounded-lg">Login here</div>
            </Link>
            {error && <p className="error-message">{error}</p>}
            {showPopup && (
              <Popup onClose={handleClosePopup} confirmButtonText="Close">
                <p>Password reset instructions sent to your email</p>
              </Popup>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
