import React from "react";
import "./Button.scss";
const Button = ({ children, className, type, onClick, ariaLabel }) => {
  return (
    <button
      className={`button ${className ? className : ""}`}
      type={type ? type : "button"}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
