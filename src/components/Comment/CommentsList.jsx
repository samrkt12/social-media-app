import React from "react";
import { useGetComments } from "../../hooks/comments";
import Comment from "./Comment";

const CommentsList = ({ post }) => {
  const { postID } = post;
  const { comments, loading } = useGetComments(postID);
  if (loading) return "Loading comments...";
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
