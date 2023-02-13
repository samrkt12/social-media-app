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
      {/* {comments.map((com) => (
        <div key={com.commentID} className="comment">
          <img src={com.commentorDp} alt="dp" className="sm-img" />
          <div className="details">
            <div className="wrapper">
              <div className="comment-profile">
                <p>{com.commentorName}</p>
                <span>{com.commentTime}</span>
              </div>
              <div className="comment-para">
                <p>{com.commentText}</p>
              </div>
            </div>
            <div className="data">
              <div className="data-item like">
                <FavoriteBorderOutlinedIcon style={{ fontSize: "13px" }} />
                <p>Like</p>
              </div>
              <span>{`${com.commentLikes} Likes`}</span>
            </div>
          </div>
        </div>
      ))} */}
    </div>
  ) : (
    ""
  );
};

export default CommentsList;
