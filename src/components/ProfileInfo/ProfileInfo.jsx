import React from "react";
import Card from "../UI/Card";
import "./ProfileInfo.scss";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Button from "../UI/Button";
const ProfileInfo = ({ user }) => {
  return (
    <Card className="profile-container">
      <div className="left">
        <Card className="profile-img">
          <img src={user.dp} alt="profilePic" />
        </Card>
        <div className="profile-details">
          <div className="data">
            <div className="name">
              <p>{user.name}</p>
            </div>
            <div className="fol">
              <p>
                <span>{user.following}</span>
                Following
              </p>
              <p>
                <span>{user.followers}</span>
                Followers
              </p>
            </div>
          </div>
          <div className="bio">
            <p>{user.bio}</p>
          </div>
        </div>
      </div>
      <div className="right">
        <Button className="follow-btn">
          <PersonAddIcon className="icon" />
          <span>Follow</span>
        </Button>
      </div>
    </Card>
  );
};

export default ProfileInfo;
