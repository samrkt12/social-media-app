import React from "react";
import NewTweet from "../components/NewTweet/NewTweet";
import Post from "../components/Post/Post";
import Trends from "../components/Trends/Trends";
import WhoToFollow from "../components/WhoToFollow/WhoToFollow";
import { DUMMY_POSTS } from "../Data";
import "./Home.scss";
const Home = () => {
  return (
    <div className="homepage">
      <div className="left">
        <NewTweet className="newtweet-container" />
        <div className="post-container">
          {DUMMY_POSTS.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
      <div className="right">
        <Trends className="trend-container" />
        <WhoToFollow className="follow-container" />
      </div>
    </div>
  );
};

export default Home;
