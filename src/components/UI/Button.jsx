import React from "react";
import "./Button.scss";
const Button = ({ children, className, type }) => {
  return (
    <button
      className={`button ${className ? className : ""}`}
      type={type ? type : "button"}
    >
      {children}
    </button>
  );
};

export default Button;
