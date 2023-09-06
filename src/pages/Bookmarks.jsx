import React from "react";
import PostsList from "../components/Post/PostsList";
import { useAuth } from "../hooks/auth";
import { useGetSavedPosts } from "../hooks/posts";
import Card from "../components/UI/Card";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const Bookmarks = () => {
  const { user, loading: userLoading } = useAuth();
  const { posts, loading: postLoading } = useGetSavedPosts(user?.id);
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
          text="Getting your details..."
          color="green"
        />
      </Card>
    );
  return (
    <div className="bookmarks">
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
            text="Getting posts..."
            color="green"
          />
        </Card>
      ) : (
        <PostsList
          posts={posts}
          emptyText="Your bookmarks are not playing hide and seek. Start saving posts to see them here📚"
        />
      )}
    </div>
  );
};

export default Bookmarks;
