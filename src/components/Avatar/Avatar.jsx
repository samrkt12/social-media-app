import React from "react";
import { Link } from "react-router-dom";

const Avatar = ({ uid, image, className }) => {
  return (
    <Link to={`/profile/${uid}`}>
      <img src={image} alt="user-image" className={className} />
    </Link>
  );
};

export default Avatar;
