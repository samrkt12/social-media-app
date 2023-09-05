import React from "react";
import { useForm } from "react-hook-form";
// import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Button from "../UI/Button";
import { useAuth } from "../../hooks/auth";
import { useAddComment } from "../../hooks/comments";
import Avatar from "../Avatar/Avatar";
import LoadingSpinner from "../UI/LoadingSpinner";

const NewComment = ({ post }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
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
        {/* comment media */}
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

{
  /* <label htmlFor="post-media">
        <ImageOutlinedIcon
          style={{
            cursor: "pointer",
            width: "20px",
            height: "100%",
            color: "#BDBDBD",
          }}
        />
        <input
          type="file"
          id="post-media"
          style={{ display: "none" }}
          name="image"
          accept="image/*"
        />
      </label> */
}
