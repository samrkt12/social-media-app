import React, { useState } from "react";
import ProfileInfo from "../components/ProfileInfo/ProfileInfo";
import { activeUser, anotherActiveUser } from "../Data";
import Options from "../components/Options/Options";
import Post from "../components/Post/Post";
import { DUMMY_POSTS } from "../Data";
import "./Profile.scss";

const options = ["tweets", "tweets & replies", "media", "likes"];
const Profile = () => {
  const [option, setOption] = useState("tweets");
  return (
    <div className="profile-page">
      <img
        src="https://picsum.photos/1100/200"
        className="bg-cover"
        alt="cover-pic"
      />
      <div className="top">
        <ProfileInfo user={anotherActiveUser} />
      </div>
      <div className="bottom">
        <div className="left">
          <Options options={options} option={option} setOption={setOption} />
        </div>
        <div className="right">
          <div className="post-container">
            {DUMMY_POSTS.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
