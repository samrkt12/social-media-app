import React from "react";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useAuth } from "../../hooks/auth";
import { useTogglePostLike, useTogglePostSave } from "../../hooks/posts";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";

export const LikeAction = ({ post }) => {
  const { user, loading: userLoading } = useAuth();
  const { likes, postID } = post;
  const isLiked = likes.includes(user?.id);
  const { togglePostLike, loading } = useTogglePostLike(
    postID,
    isLiked,
    user?.id
  );

  if (userLoading)
    return (
      <Card
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <LoadingSpinner w="20px" h="20px" text="Loading..." color="green" />
      </Card>
    );

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

  if (userLoading)
    return (
      <Card
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <LoadingSpinner w="20px" h="20px" text="Loading..." color="green" />
      </Card>
    );

  return (
    <button
      type="button"
      onClick={togglePostSave}
      disabled={userLoading || loading}
      className={`item ${isSaved ? "save" : ""}`}
    >
      {isSaved ? (
        <BookmarkIcon className="action-icon" />
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
    </div>
  );
};

export default PostActions;
