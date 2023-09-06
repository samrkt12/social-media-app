import React from "react";
import { useGetComments } from "../../hooks/comments";
import Comment from "./Comment";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";

const CommentsList = ({ post }) => {
  const { postID } = post;
  const { comments, loading } = useGetComments(postID);
  if (loading)
    return (
      <Card
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <LoadingSpinner
          w="35px"
          h="35px"
          text="Loading comments..."
          color="blue"
        />
      </Card>
    );
  return comments.length ? (
    <div className="comments">
      {comments.map((comment) => (
        <Comment key={comment.commentID} comment={comment} />
      ))}
    </div>
  ) : (
    ""
  );
};

export default CommentsList;
