import React from "react";
import NewTweet from "../components/NewTweet/NewTweet";
import PostsList from "../components/Post/PostsList";
import { useAuth } from "../hooks/auth";
import { useGetHomePosts } from "../hooks/posts";
import Card from "../components/UI/Card";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const Home = () => {
  const { user } = useAuth();
  const { posts, loading: postLoading } = useGetHomePosts(user?.id);
  return (
    <div className="homepage">
      <NewTweet />
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
          emptyText="Time to break the silence and sprinkle some magic onto your feed! 😄📝✨"
        />
      )}
    </div>
  );
};

export default Home;
