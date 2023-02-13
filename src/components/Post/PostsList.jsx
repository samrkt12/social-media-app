import React from "react";
import Post from "./Post";

const PostsList = ({ posts }) => {
  return (
    <div className="post-container">
      {posts?.length === 0 ? (
        <p>No Posts yet... Try adding some!</p>
      ) : (
        posts?.map((post) => <Post key={post.postID} post={post} />)
      )}
    </div>
  );
};

export default PostsList;
