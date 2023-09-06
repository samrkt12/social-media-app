import React from "react";
import NewTweet from "../components/NewTweet/NewTweet";
import PostsList from "../components/Post/PostsList";
import { useAuth } from "../hooks/auth";
import { useGetHomePosts } from "../hooks/posts";

const Home = () => {
  const { user, loading: userLoading } = useAuth();
  const { posts, loading: postLoading } = useGetHomePosts(user?.id);
  return (
    <div className="homepage">
      <NewTweet />
      {postLoading ? (
        <p>Loading posts....</p>
      ) : (
        <PostsList
          posts={posts}
          emptyText="Time to break the silence and sprinkle some magic onto your feed! 😄📝✨"
        />
      )}
    </div>
  );
};

export default Home;
