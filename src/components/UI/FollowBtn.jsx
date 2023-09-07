import React from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import "./FollowBtn.scss";
import Button from "./Button";
const FollowBtn = ({ onClick, isFollowing }) => {
  return (
    <Button
      className={isFollowing ? "unfollow-btn" : "follow-btn"}
      onClick={onClick}
    >
      {!isFollowing && <PersonAddIcon className="icon" />}
      <span>{isFollowing ? "Unfollow" : "Follow"}</span>
    </Button>
  );
};

export default FollowBtn;
