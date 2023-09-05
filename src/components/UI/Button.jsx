import React from "react";
import "./Button.scss";
const Button = ({ children, className, type, onClick }) => {
  return (
    <button
      className={`button ${className ? className : ""}`}
      type={type ? type : "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
