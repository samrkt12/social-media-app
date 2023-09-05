import React, { useState } from "react";
import Options from "../components/Options/Options";
import SearchBar from "../components/SearchBar/SearchBar";

import PostsList from "../components/Post/PostsList";
import { useGetHomePosts } from "../hooks/posts";
import UserCardsList from "../components/UserCard/UserCardsList";

const options = ["top", "latest", "people"];

const Explore = () => {
  const [filter, setFilter] = useState("latest");
  const { posts, loading: postLoading } = useGetHomePosts();
  return (
    <div className="explore">
      <div>
        <Options options={options} option={filter} setOption={setFilter} />
      </div>
      <div>
        <SearchBar />
        {filter === "people" ? (
          <UserCardsList />
        ) : postLoading ? (
          <p>Loading posts....</p>
        ) : (
          <PostsList posts={posts} />
        )}
      </div>
    </div>
  );
};

export default Explore;
