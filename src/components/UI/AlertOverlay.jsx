import Modal from "./Modal";
import React from "react";
import "./AlertOverlay.scss";
const AlertOverlay = ({ onConfirm, onHide, ques }) => {
  return (
    <Modal onClick={onHide} className="alert-overlay">
      <div className="alert-ques">
        <h1>{ques}</h1>
      </div>
      <div className="alert-options">
        <button className="yes-option " onClick={onConfirm}>
          Yes
        </button>
        <button className="no-option" onClick={onHide}>
          No
        </button>
      </div>
    </Modal>
  );
};

export default AlertOverlay;
