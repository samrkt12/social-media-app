import React, { useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { formatDistanceToNow } from "date-fns";
import { useGetUser } from "../../hooks/users";
import DeleteBtn from "../UI/DeleteBtn";
import { useAuth } from "../../hooks/auth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDeleteComment, useToggleCommentLike } from "../../hooks/comments";
import Avatar from "../Avatar/Avatar";
import AlertOverlay from "../UI/AlertOverlay";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";

const question = "Are you sure want to delete this comment?";

const Comment = ({ comment }) => {
  const [isAlertShown, setIsAlertShown] = useState(false);
  const { user: authUser, loading: authLoading } = useAuth();
  const { userID, commentText, createdAt, commentID, likes } = comment;
  const { user, loading: userLoading } = useGetUser(userID);
  const { deleteComment, loading: deleteLoading } = useDeleteComment();

  const isLiked = likes.includes(authUser?.id);
  const { toggleCommentLike, loading } = useToggleCommentLike(
    commentID,
    isLiked,
    authUser?.id
  );

  const showAlert = () => {
    setIsAlertShown(true);
  };
  const hideAlert = () => {
    setIsAlertShown(false);
  };

  const deleteCommentHandler = async () => {
    hideAlert();
    await deleteComment(commentID);
  };

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
    <div className="comment">
      {isAlertShown && (
        <AlertOverlay
          onHide={hideAlert}
          onConfirm={deleteCommentHandler}
          ques={question}
        />
      )}
      <Avatar uid={user.id} image={user.displayImg} className="sm-img" />
      <div className="details">
        <div className="wrapper">
          <div className="comment-profile">
            <p>{user.name}</p>
            <span>
              {formatDistanceToNow(createdAt) === "less than a minute"
                ? "just now"
                : `${formatDistanceToNow(createdAt)} ago`}
            </span>
            {!authLoading && authUser.id === userID && (
              <DeleteBtn onClick={showAlert} />
            )}
          </div>
          <div className="comment-para">
            <p>{commentText}</p>
          </div>
        </div>
        <div className="data">
          <button
            type="button"
            className={`data-item ${isLiked ? "like" : ""}`}
            onClick={toggleCommentLike}
          >
            {isLiked ? (
              <FavoriteIcon style={{ fontSize: "13px" }} />
            ) : (
              <FavoriteBorderOutlinedIcon style={{ fontSize: "13px" }} />
            )}
            <p>{isLiked ? "Liked" : "Like"}</p>
          </button>
          <p>{`${likes.length} Likes`}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
