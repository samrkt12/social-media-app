import React from "react";
import { useAuth } from "../../hooks/auth";
import "./SettingsDisplay.scss";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
const SettingsDisplay = ({ setIsFormPage }) => {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <Card
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <LoadingSpinner
          w="50px"
          h="50px"
          text="Loading information..."
          color="green"
        />
      </Card>
    );
  return (
    <>
      <div className="heading">
        <h1>Personal info</h1>
      </div>
      <div className="profile">
        <div className="profile-header item">
          <div>
            <h2>Profile</h2>
            <p>Some info may be visible to other people</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsFormPage(true);
            }}
          >
            Edit
          </button>
        </div>
        <div className="item">
          <p className="ques">NAME</p>
          {!loading && <p className="ans">{user.name}</p>}
        </div>
        <div className="item">
          <p className="ques">PHOTO</p>
          <div className="dp-container">
            {!loading && <img src={user.displayImg} alt="your-display-image" />}
          </div>
        </div>
        <div className="item">
          <p className="ques">COVER</p>
          <div className="cover-container">
            {!loading && <img src={user.coverImg} alt="your-display-image" />}
          </div>
        </div>
        <div className="item">
          <p className="ques">BIO</p>
          <div className="bio-container">
            {!loading && <p className="ans bio-ans">{user.bio}</p>}
          </div>
        </div>
        <div className="item">
          <p className="ques">EMAIL</p>
          {!loading && <p className="ans">{user.email}</p>}
        </div>
      </div>
    </>
  );
};

export default SettingsDisplay;
