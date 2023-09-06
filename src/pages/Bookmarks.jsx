import React from "react";
import PostsList from "../components/Post/PostsList";
import { useAuth } from "../hooks/auth";
import { useGetSavedPosts } from "../hooks/posts";

const Bookmarks = () => {
  const { user, loading: userLoading } = useAuth();
  const { posts, loading: postLoading } = useGetSavedPosts(user?.id);
  if (userLoading) return <p>Loading user...</p>;
  return (
    <div className="bookmarks">
      {postLoading ? (
        <p>Loading posts....</p>
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
