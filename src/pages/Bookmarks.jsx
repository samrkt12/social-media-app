import React, { useEffect, useState } from "react";
import Options from "../components/Options/Options";
import Post from "../components/Post/Post";
import { DUMMY_POSTS } from "../Data";
import "./Bookmarks.scss";
const options = ["tweets", "tweets & replies", "media", "likes"];

const Bookmarks = () => {
  const [option, setOption] = useState("tweets");

  return (
    <div className="bookmarks">
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
  );
};

export default Bookmarks;
