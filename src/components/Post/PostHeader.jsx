import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useGetUser } from "../../hooks/users";
import { useDeletePost } from "../../hooks/posts";
import { useAuth } from "../../hooks/auth";
import DeleteBtn from "../UI/DeleteBtn";
import Avatar from "../Avatar/Avatar";
import AlertOverlay from "../UI/AlertOverlay";

const question = "Are you sure want to delete this post?";

const PostHeader = ({ uid, date, postID }) => {
  const [isAlertShown, setIsAlertShown] = useState(false);
  const { user: authUser, loading: authLoading } = useAuth();
  const { user, loading } = useGetUser(uid);
  const { deletePost, loading: deleteLoading } = useDeletePost();

  const showAlert = () => {
    setIsAlertShown(true);
  };
  const hideAlert = () => {
    setIsAlertShown(false);
  };

  const deletePostHandler = async () => {
    hideAlert();
    await deletePost(postID);
  };

  if (loading) return <p>Loading user...</p>;

  return (
    <div className="owner">
      {isAlertShown && (
        <AlertOverlay
          onHide={hideAlert}
          onConfirm={deletePostHandler}
          ques={question}
        />
      )}
      <Avatar uid={user.id} image={user.displayImg} className="bg-img" />
      <div className="title">
        <p>{user.name}</p>
        <span>
          {formatDistanceToNow(date) === "less than a minute"
            ? "just now"
            : `${formatDistanceToNow(date)} ago`}
        </span>
      </div>
      {!authLoading && authUser.id === uid && (
        <DeleteBtn onClick={showAlert} isLong />
      )}
    </div>
  );
};

export default PostHeader;
