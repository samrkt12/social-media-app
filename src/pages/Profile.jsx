import React from "react";
import ProfileInfo from "../components/ProfileInfo/ProfileInfo";
import { useParams } from "react-router-dom";
import { useGetUser } from "../hooks/users";
import PostsList from "../components/Post/PostsList";
import { useGetHomePosts } from "../hooks/posts";
import Card from "../components/UI/Card";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const Profile = () => {
  const { userID } = useParams();
  const { user, loading: userLoading } = useGetUser(userID);
  const { posts, loading: postLoading } = useGetHomePosts(userID);

  if (userLoading)
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
          text="Loading profile..."
          color="green"
        />
      </Card>
    );
  return (
    <div className="profile-page">
      {!userLoading && (
        <img
          src={user?.coverImg}
          className="bg-cover"
          alt="user-cover-pic"
          loading="lazy"
        />
      )}
      <div className="top">{!userLoading && <ProfileInfo user={user} />}</div>
      <div className="bottom">
        {postLoading ? (
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
              text="Loading your posts..."
              color="green"
            />
          </Card>
        ) : (
          <PostsList posts={posts} />
        )}
      </div>
    </div>
  );
};

export default Profile;
