import React from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";
const BackDrop = ({ onClick }) => {
  return <div className="backdrop" onClick={onClick}></div>;
};

const Overlay = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

const Modal = ({ onClick, children, className }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClick={onClick} />,
        document.getElementById("overlay")
      )}
      {ReactDOM.createPortal(
        <Overlay className={className}>{children}</Overlay>,
        document.getElementById("overlay")
      )}
    </>
  );
};

export default Modal;
