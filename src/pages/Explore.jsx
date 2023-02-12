import React, { useState } from "react";
import Options from "../components/Options/Options";
import SearchBar from "../components/SearchBar/SearchBar";
import Post from "../components/Post/Post";
import { DUMMY_POSTS } from "../Data";
import "./Explore.scss";

const options = ["top", "latest", "people", "media"];

const Explore = () => {
  const [option, setOption] = useState("top");
  return (
    <div className="explore">
      <div className="left">
        <Options options={options} option={option} setOption={setOption} />
      </div>
      <div className="right">
        <SearchBar />
        <div className="post-container">
          {DUMMY_POSTS.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
