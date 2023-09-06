import React from "react";
import { Link } from "react-router-dom";

const Avatar = ({ uid, image, className }) => {
  return (
    <Link to={`/profile/${uid}`}>
      <img
        src={image}
        alt="user-image"
        width={40}
        height={40}
        className={className}
        loading="lazy"
      />
    </Link>
  );
};

export default Avatar;
