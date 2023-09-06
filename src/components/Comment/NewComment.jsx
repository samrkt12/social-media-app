import React from "react";
import { useForm } from "react-hook-form";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Button from "../UI/Button";
import { useAuth } from "../../hooks/auth";
import { useAddComment } from "../../hooks/comments";
import Avatar from "../Avatar/Avatar";
import LoadingSpinner from "../UI/LoadingSpinner";

const NewComment = ({ post }) => {
  const { register, handleSubmit, reset } = useForm();
  const { user, loading: userLoading } = useAuth();
  const { addComment, loading: commentLoading } = useAddComment();
  const { postID } = post;

  const newCommentHandler = async (data) => {
    const res = await addComment(postID, user?.id, data);
    if (res) reset();
  };
  return (
    <div className="reply">
      {!userLoading && (
        <Avatar uid={user.id} image={user.displayImg} className="bg-img" />
      )}
      <form className="field" onSubmit={handleSubmit(newCommentHandler)}>
        <input
          type="text"
          className="reply-input"
          placeholder="Tweet your reply"
          autoComplete="off"
          {...register("text", { required: true })}
        />
        {!userLoading && (
          <Button className="reply-btn" type="submit">
            {commentLoading ? (
              <LoadingSpinner w="15px" h="14px" />
            ) : (
              <SendRoundedIcon />
            )}
          </Button>
        )}
      </form>
    </div>
  );
};

export default NewComment;
