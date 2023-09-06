import React from "react";
import Post from "./Post";
import Card from "../UI/Card";

const PostsList = ({ posts, emptyText }) => {
  return (
    <div className="post-container component3">
      {posts?.length === 0 ? (
        <Card className="post">
          <p
            style={{
              textAlign: "center",
              margin: "2.25rem auto",
              padding: "0 10px",
              color: "#333",
              maxWidth: "50ch",
              textShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            {emptyText ? emptyText : `No Posts to show.`}
          </p>
        </Card>
      ) : (
        posts?.map((post) => <Post key={post.postID} post={post} />)
      )}
    </div>
  );
};

export default PostsList;
