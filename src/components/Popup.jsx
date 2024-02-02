import React from "react";
import PropTypes from "prop-types";

function Popup({ children, onClose, onConfirm }) {
  const handleClose = () => {
    onClose();
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <div className="popup-container">
      <div className="popup">
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
}

Popup.defaultProps = {
  children: null,
  onConfirm: () => {},
};

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  children: PropTypes.node,
};

export default Popup;
