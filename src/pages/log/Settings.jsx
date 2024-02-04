import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Popup from "../../components/Popup";
import NavBar from "../../components/NavBar";

function Settings() {
  const { user, editUser, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    nickname: user?.nickname || "",
    email: user?.mail || "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      nickname: user?.nickname || "",
      email: user?.mail || "",
    });
    setErrors({});
  }, [user]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: undefined });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});

    try {
      const updatedFields = {};
      const requiredFields = ["firstname", "lastname", "nickname"];
      let hasErrors = false;

      if (formData.currentPassword.trim()) {
        requiredFields.push("currentPassword");
      }

      requiredFields.forEach((field) => {
        if (!formData[field].trim()) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: "This field is required",
          }));
          hasErrors = true;
        } else {
          updatedFields[field] = formData[field].trim();
        }
      });

      if (formData.newPassword.trim() !== formData.confirmNewPassword.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          newPassword: "The passwords do not match",
          confirmNewPassword: "The passwords do not match",
        }));
        hasErrors = true;
      } else if (formData.newPassword.trim() !== "") {
        if (formData.newPassword.trim().length < 6) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            newPassword: "The password must contain at least 6 characters",
          }));
          hasErrors = true;
        }

        updatedFields.newPassword = formData.newPassword.trim();
      }
      if (hasErrors) {
        setSuccess(null);
        return;
      }

      const updatedUser = await editUser({
        id: user.id,
        ...updatedFields,
      });

      setFormData((prevData) => ({
        ...prevData,
        ...updatedUser,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }));

      setSuccess("Change validated ✔");
      setErrors({});
      setShowPopup(true);
    } catch (errorCaught) {
      setSuccess(null);
      if (errorCaught.message === "Invalid current password") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          currentPassword: "Incorrect current password",
        }));
      } else {
        setErrors({ general: "The current password is invalid" });
      }
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${user.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.removeItem("token");

      logout();

      setShowDeletePopup(true);
    } catch (error) {
      console.error("Error when deleting account :", error);
      setErrors({
        general: "An error occurred when deleting the account",
      });
    }
  };
  const handleCloseDeletePopup = () => {
    setShowDeletePopup(false);
    navigate("/");
  };
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center text-center">
        <div className="page-container btn mt-8 rounded-lg justify-center items-center inline-block">
          <div className="auth-form btn-in rounded-lg">
            <h2 className="text-xl">Settings</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <label
                className={`settings-label ${
                  errors.firstname ? "error-input" : ""
                }`}
              >
                First Name:
                <input
                  className="text-center text-white btn-in rounded-lg"
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </label>
              {errors.firstname && (
                <p className="error-message">{errors.firstname}</p>
              )}

              <label
                className={`settings-label ${
                  errors.lastname ? "error-input" : ""
                }`}
              >
                Last Name:
                <input
                  className="text-center text-white btn-in rounded-lg"
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </label>
              {errors.lastname && (
                <p className="error-message">{errors.lastname}</p>
              )}

              <label
                className={`settings-label ${
                  errors.nickname ? "error-input" : ""
                }`}
              >
                Nickname:
                <input
                  className="text-center text-white btn-in rounded-lg"
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                />
              </label>
              {errors.nickname && (
                <p className="error-message">{errors.nickname}</p>
              )}

              <label
                className={`settings-label ${
                  errors.currentPassword ? "error-input" : ""
                }`}
              >
                Current Password:
                <input
                  className="text-center text-white btn-in rounded-lg"
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                />
              </label>
              {errors.currentPassword && (
                <p className="error-message">{errors.currentPassword}</p>
              )}

              <label
                className={`settings-label ${
                  errors.newPassword ? "error-input" : ""
                }`}
              >
                New Password:
                <input
                  className="text-center text-white btn-in rounded-lg"
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </label>

              <label
                className={`settings-label ${
                  errors.confirmNewPassword ? "error-input" : ""
                }`}
              >
                Confirm New Password:
                <input
                  className="text-center text-white btn-in rounded-lg"
                  type="password"
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                />
              </label>
              {errors.newPassword && (
                <p className="error-message">{errors.newPassword}</p>
              )}
              {errors.confirmNewPassword && (
                <p className="error-message">{errors.confirmNewPassword}</p>
              )}

              <button className="btn rounded-lg inline-block" type="submit">
                <div className="btn-in rounded-lg">Save Changes</div>
              </button>
              <button
                type="button"
                className="btn rounded-lg inline-block"
                onClick={handleDeleteAccount}
              >
                <div className="btn-in rounded-lg">Delete Account</div>
              </button>

              {errors.general && (
                <p className="error-message">{errors.general}</p>
              )}
              {success && <p>{success}</p>}

              {showDeletePopup && (
                <Popup
                  onClose={handleCloseDeletePopup}
                  confirmButtonText="Close"
                >
                  <p>Your account has been deleted successfully</p>
                </Popup>
              )}
            </form>

            {errors.general && (
              <p className="error-message">{errors.general}</p>
            )}
            {success && <p>{success}</p>}
            {showPopup && (
              <Popup onClose={closePopup}>
                <p>Password changed successfully!</p>
              </Popup>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
