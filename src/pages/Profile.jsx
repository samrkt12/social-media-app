import React from "react";
import ProfileInfo from "../components/ProfileInfo/ProfileInfo";
import { useParams } from "react-router-dom";
import { useGetUser } from "../hooks/users";
import PostsList from "../components/Post/PostsList";
import { useGetHomePosts } from "../hooks/posts";

const Profile = () => {
  const { userID } = useParams();
  const { user, loading: userLoading } = useGetUser(userID);
  const { posts, loading: postLoading } = useGetHomePosts(userID);

  return (
    <div className="profile-page">
      {!userLoading && (
        <img src={user?.coverImg} className="bg-cover" alt="user-cover-pic" />
      )}
      <div className="top">{!userLoading && <ProfileInfo user={user} />}</div>
      <div className="bottom">
        {!postLoading && <PostsList posts={posts} />}
      </div>
    </div>
  );
};

export default Profile;
