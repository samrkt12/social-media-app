import React, { useEffect } from "react";
import { toast } from "react-toastify";
import NewTweet from "../components/NewTweet/NewTweet";
import PostsList from "../components/Post/PostsList";
import Trends from "../components/Trends/Trends";
import WhoToFollow from "../components/WhoToFollow/WhoToFollow";
import { useAuth } from "../hooks/auth";
import { useGetHomePosts } from "../hooks/posts";
import "./Home.scss";
const Home = () => {
  const { user, loading: userLoading } = useAuth();
  const { posts, loading: postLoading } = useGetHomePosts(user?.id);
  if (postLoading) return <p>Loading posts....</p>;
  return (
    <div className="homepage">
      <div className="left">
        <NewTweet className="newtweet-container" />
        <PostsList posts={posts} />
      </div>
      <div className="right">
        <Trends className="trend-container" />
        <WhoToFollow className="follow-container" />
      </div>
    </div>
  );
};

export default Home;
