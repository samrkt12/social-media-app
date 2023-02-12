import Button from "../UI/Button";
import React from "react";
import Card from "../UI/Card";
import "./WhoToFollow.scss";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { DUMMY_PROFILES } from "../../Data";

const WhoToFollow = ({ className }) => {
  return (
    <Card className={`follow ${className ? className : ""}`}>
      <div className="title">
        <span>Who to follow</span>
      </div>

      {DUMMY_PROFILES.map((item) => (
        <React.Fragment key={item.id}>
          <div className="line" />
          <div className="profile">
            <div className="first">
              <div className="profile-info">
                <img src={item.dp} alt="profile-pic" className="bg-img" />
                <div className="info">
                  <p>{item.name}</p>
                  <span>{`${item.followers} followers`}</span>
                </div>
              </div>
              <Button className="follow-btn">
                <PersonAddIcon className="icon" />
                <span>Follow</span>
              </Button>
            </div>
            <div className="second">
              <span>{item.bio}</span>
            </div>
            <div className="third">
              <img src={item.cover} alt="cover-pic" />
            </div>
          </div>
        </React.Fragment>
      ))}
    </Card>
  );
};

export default WhoToFollow;
