// ImageModal.jsx
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restaurantActions } from "../../../store/slices/restaurants-slice";
import close from "../../../assets/images/close.svg";
import "./modal.scss";
import { createPortal } from "react-dom";

function LogoutModal({ onClose, onLogout }) {
  return createPortal(
    <div className="logout-modal">
      <div className="logout-modal-container centered">
        <h2>Logout</h2>
        <p>Are you sure you want to logout?</p>
        <div className="logout-buttons">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="logout-backdrop"></div>
    </div>,
    document.getElementById("modal")
  );
}

export default LogoutModal;
