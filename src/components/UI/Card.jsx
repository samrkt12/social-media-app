import React, { forwardRef } from "react";
import "./Card.scss";
const Card = forwardRef(({ children, className, style }, ref) => {
  return (
    <div
      ref={ref}
      className={`card ${className ? className : ""}`}
      style={style}
    >
      {children}
    </div>
  );
});

export default Card;
