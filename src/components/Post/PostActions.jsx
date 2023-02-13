import React, { useState } from "react";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
// import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../../hooks/auth";
import { useTogglePostLike, useTogglePostSave } from "../../hooks/posts";

export const LikeAction = ({ post }) => {
  const { user, loading: userLoading } = useAuth();
  const { likes, postID } = post;

  const isLiked = likes.includes(user?.id);
  const { togglePostLike, loading } = useTogglePostLike(
    postID,
    isLiked,
    user?.id
  );

  if (userLoading) return <p>loading</p>;

  return (
    <button
      type="button"
      onClick={togglePostLike}
      disabled={userLoading || loading}
      className={`item ${isLiked ? "like" : ""}`}
    >
      {isLiked ? (
        <FavoriteIcon className="action-icon" />
      ) : (
        <FavoriteBorderOutlinedIcon className="action-icon" />
      )}
      <p>{isLiked ? "Liked" : "Like"}</p>
    </button>
  );
};

export const SaveAction = ({ post }) => {
  const { user, loading: userLoading } = useAuth();
  const { saves, postID } = post;

  const isSaved = saves.includes(user?.id);
  const { togglePostSave, loading } = useTogglePostSave(
    postID,
    isSaved,
    user?.id
  );

  if (userLoading) return <p>loading</p>;

  return (
    <button
      type="button"
      onClick={togglePostSave}
      disabled={userLoading || loading}
      className={`item ${isSaved ? "save" : ""}`}
    >
      {isSaved ? (
        <FavoriteIcon className="action-icon" />
      ) : (
        <BookmarkBorderOutlinedIcon className="action-icon" />
      )}
      <p>{isSaved ? "Saved" : "Save"}</p>
    </button>
  );
};

const PostActions = ({ post }) => {
  return (
    <div className="actions">
      <button type="button" className="item">
        <ModeCommentOutlinedIcon className="action-icon" />
        <p>Comment</p>
      </button>
      <LikeAction post={post} />
      <SaveAction post={post} />
      {/* <button type="button" className={`item ${isActive ? "retweet" : ""}`}>
        <LoopOutlinedIcon className="action-icon" />
        <p>{isActive ? "Retweeted" : "Retweet"}</p>
      </button> */}
    </div>
  );
};

export default PostActions;
