import React from "react";
import Card from "../UI/Card";
import "./ProfileInfo.scss";
import { useAuth } from "../../hooks/auth";
import { useToggleFollowUser } from "../../hooks/users";
import FollowBtn from "../UI/FollowBtn";
const ProfileInfo = ({ user }) => {
  const { user: authUser, loading: authLoading } = useAuth();
  const { displayImg, name, following, followers, bio, id } = user;
  const isFollowing = followers.includes(authUser?.id);
  const { toggleFollow, loading: followLoading } = useToggleFollowUser(
    id,
    isFollowing,
    authUser?.id
  );
  return (
    <Card className="profile-container">
      <div className="left">
        <Card className="profile-img">
          <img src={displayImg} alt="profilePic" loading="lazy" />
        </Card>
        <div className="profile-details">
          <div className="data">
            <div className="name">
              <p>{name}</p>
            </div>
            <div className="fol">
              <p>
                <span>{following.length}</span>
                Following
              </p>
              <p>
                <span>{followers.length}</span>
                Followers
              </p>
            </div>
          </div>
          <div className="bio">
            <p>{bio}</p>
          </div>
        </div>
      </div>
      <div>
        {!authLoading &&
          (authUser.id === id ? (
            ""
          ) : (
            <FollowBtn onClick={toggleFollow} isFollowing={isFollowing} />
          ))}
      </div>
    </Card>
  );
};

export default ProfileInfo;
