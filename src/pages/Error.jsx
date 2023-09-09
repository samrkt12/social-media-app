import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error.scss";
const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-container">
      <h1>404 Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default NotFound;
